package com.scandela.server.service.implementation;

import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.scandela.server.dao.DecisionDao;
import com.scandela.server.dao.LampDecisionDao;
import com.scandela.server.entity.Decision;
import com.scandela.server.entity.LampDecision;
import com.scandela.server.exception.DecisionException;
import com.scandela.server.exception.LampDecisionException;
import com.scandela.server.service.AbstractService;
import com.scandela.server.service.ILampDecisionService;

@Service
public class LampDecisionService extends AbstractService<LampDecision> implements ILampDecisionService {

	// Attributes \\
		// Private \\
//	private LampDao lampDao;TODO quand ce sera implémenté
	private DecisionDao decisionDao;

	// Constructors \\
	protected LampDecisionService(LampDecisionDao lampDecisionDao, DecisionDao decisionDao) {
		super(lampDecisionDao);
		this.decisionDao = decisionDao;
	}

	// Methods \\
		// Public \\
	@Override
	@Transactional(rollbackFor = { Exception.class })
	public LampDecision create(LampDecision newLampDecision) throws LampDecisionException {
		try {
			loadDecision(newLampDecision);

			return dao.save(newLampDecision);
		} catch (Exception e) {
			if (newLampDecision.getDecision() == null) {
				throw new LampDecisionException(LampDecisionException.INCOMPLETE_INFORMATIONS);
			}
			throw e;
		}
	}

		// Private \\
	private void loadDecision(LampDecision newLampDecision) throws LampDecisionException {
		if (newLampDecision.getDecision() == null) {
			throw new LampDecisionException(DecisionException.INCOMPLETE_INFORMATIONS);
		}
	
		UUID decisionId = newLampDecision.getDecision().getId();
		
		Optional<Decision> decision = decisionDao.findById(decisionId);
		if (decision.isEmpty()) {
			throw new LampDecisionException(LampDecisionException.DECISION_LOADING);
		}
	
		newLampDecision.setDecision(decision.orElseGet(() -> { return null; }));
	}

}
