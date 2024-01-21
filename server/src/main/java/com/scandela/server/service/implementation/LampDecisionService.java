package com.scandela.server.service.implementation;

import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.scandela.server.dao.DecisionDao;
import com.scandela.server.dao.LampDao;
import com.scandela.server.dao.LampDecisionDao;
import com.scandela.server.entity.Decision;
import com.scandela.server.entity.Lamp;
import com.scandela.server.entity.LampDecision;
import com.scandela.server.exception.LampDecisionException;
import com.scandela.server.service.AbstractService;
import com.scandela.server.service.ILampDecisionService;

@Service
public class LampDecisionService extends AbstractService<LampDecision> implements ILampDecisionService {

	// Attributes \\
		// Private \\
	private final String[] IGNORED_PROPERTIES = { "id", "lamp", "decision" };
	
	private LampDao lampDao;
	private DecisionDao decisionDao;

	// Constructors \\
	protected LampDecisionService(LampDecisionDao lampDecisionDao, DecisionDao decisionDao, LampDao lampDao) {
		super(lampDecisionDao);
		this.decisionDao = decisionDao;
		this.lampDao = lampDao;
	}

	// Methods \\
		// Public \\
	@Override
	@Transactional(rollbackFor = { Exception.class })
	public LampDecision create(LampDecision newLampDecision) throws LampDecisionException {
		try {
			loadLamp(newLampDecision);
			loadDecision(newLampDecision);

			return dao.save(newLampDecision);
		} catch (Exception e) {
			if (newLampDecision.getDecision() == null || newLampDecision.getLamp() == null) {
				throw new LampDecisionException(LampDecisionException.INCOMPLETE_INFORMATIONS);
			}
			throw e;
		}
	}

	@Override
	@Transactional(rollbackFor = { Exception.class })
    public LampDecision update(UUID id, LampDecision update, String... ignoredProperties) throws Exception {
		try {
			LampDecision lampDecision = super.update(id, update, IGNORED_PROPERTIES);
	        
	        return lampDecision;
		} catch (Exception e) {
			throw e;
		}
    }

		// Private \\
	private void loadLamp(LampDecision newLampDecision) throws LampDecisionException {
		if (newLampDecision.getLamp() == null) {
			throw new LampDecisionException(LampDecisionException.INCOMPLETE_INFORMATIONS);
		}
	
		UUID decisionId = newLampDecision.getLamp().getId();
		
		Optional<Lamp> lamp = lampDao.findById(decisionId);
		if (lamp.isEmpty()) {
			throw new LampDecisionException(LampDecisionException.LAMP_LOADING);
		}
	
		newLampDecision.setLamp(lamp.orElseGet(() -> { return null; }));
	}
	
	private void loadDecision(LampDecision newLampDecision) throws LampDecisionException {
		if (newLampDecision.getDecision() == null) {
			throw new LampDecisionException(LampDecisionException.INCOMPLETE_INFORMATIONS);
		}
	
		UUID decisionId = newLampDecision.getDecision().getId();
		
		Optional<Decision> decision = decisionDao.findById(decisionId);
		if (decision.isEmpty()) {
			throw new LampDecisionException(LampDecisionException.DECISION_LOADING);
		}
	
		newLampDecision.setDecision(decision.orElseGet(() -> { return null; }));
	}

}
