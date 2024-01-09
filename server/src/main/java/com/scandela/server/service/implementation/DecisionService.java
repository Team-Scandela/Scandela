package com.scandela.server.service.implementation;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.scandela.server.dao.DecisionDao;
import com.scandela.server.dao.DecisionTypeDao;
import com.scandela.server.dao.LampDao;
import com.scandela.server.dao.LampDecisionDao;
import com.scandela.server.entity.Decision;
import com.scandela.server.entity.DecisionType;
import com.scandela.server.entity.Lamp;
import com.scandela.server.entity.LampDecision;
import com.scandela.server.exception.DecisionException;
import com.scandela.server.service.AbstractService;
import com.scandela.server.service.IDecisionService;

@Service
public class DecisionService extends AbstractService<Decision> implements IDecisionService {

	// Attributes \\
		// Private \\
	private final String[] IGNORED_PROPERTIES = { "id", "type" };
	
	private DecisionTypeDao decisionTypeDao;
	private LampDecisionDao lampDecisionDao;
	private LampDao lampDao;

	// Constructors \\
	protected DecisionService(DecisionDao decisionDao, DecisionTypeDao decisionTypeDao, LampDecisionDao lampDecisionDao, LampDao lampDao) {
		super(decisionDao);
		this.decisionTypeDao = decisionTypeDao;
		this.lampDecisionDao = lampDecisionDao;
		this.lampDao = lampDao;
	}

	// Methods \\
		// Public \\
	@Override
	@Transactional(rollbackFor = { Exception.class })
	public Decision create(Decision newDecision) throws DecisionException{
		try {
			loadDecisionType(newDecision);
			
			return dao.save(newDecision);
		} catch (Exception e) {
			if (newDecision.getType() == null || newDecision.getDescription() == null ||
				newDecision.getLocation() == null || newDecision.getSolution() == null) {
				throw new DecisionException(DecisionException.INCOMPLETE_INFORMATIONS);
			}
			throw e;
		}
	}

	@Override
	@Transactional(rollbackFor = { Exception.class })
    public Decision update(UUID id, Decision update, String... ignoredProperties) throws Exception {
		try {
			Decision decision = super.update(id, update, IGNORED_PROPERTIES);
	        
	        return decision;
		} catch (Exception e) {
			throw e;
		}
    }
	
	@Override
	@Transactional(rollbackFor = { Exception.class })
	public List<Decision> algoChangementBulb() throws Exception {
		Optional<DecisionType> decisionType = decisionTypeDao.findByTitleContains("Changement");
		
		if (decisionType.isEmpty()) {
			throw new DecisionException(DecisionException.DECISIONTYPE_LOADING);
		}
		
		Page<Lamp> lampsPage = lampDao.findByTypeIsNotAndLampDecisionsContains("LED", "Changer l'ampoule", PageRequest.of(0, 100));
		List<Lamp> lamps = lampsPage.getContent();
		List<Decision> decisions = new ArrayList<>();
		List<LampDecision> lampDecisions = new ArrayList<>();
		
		lamps.forEach(lamp -> {
			Decision decision = Decision.builder()
					.type(decisionType.get())
					.location(lamp.getAddress())
					.description("Ampoule LED moins consommatrice.")
					.solution("Changer l'ampoule \"" + lamp.getLampType() + "\" en ampoule \"LED\".")
					.build();
			LampDecision lampDecision = LampDecision.builder()
					.decision(decision)
					.lamp(lamp)
					.build();
			decision.setLampDecision(lampDecision);
			
			decisions.add(decision);
			lampDecisions.add(lampDecision);
		});
		
		dao.saveAll(decisions);
		lampDecisionDao.saveAll(lampDecisions);
		
		return decisions;
	}

		// Private \\
	private void loadDecisionType(Decision newDecision) throws DecisionException {
		if (newDecision.getType() == null) {
			throw new DecisionException(DecisionException.INCOMPLETE_INFORMATIONS);
		}
	
		UUID typeId = newDecision.getType().getId();
		
		Optional<DecisionType> type = decisionTypeDao.findById(typeId);
		if (type.isEmpty()) {
			throw new DecisionException(DecisionException.DECISIONTYPE_LOADING);
		}
	
		newDecision.setType(type.orElseGet(() -> { return null; }));
	}

}
