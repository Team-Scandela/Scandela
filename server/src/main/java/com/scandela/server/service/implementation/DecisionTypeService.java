package com.scandela.server.service.implementation;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.scandela.server.dao.DecisionTypeDao;
import com.scandela.server.entity.DecisionType;
import com.scandela.server.exception.DecisionTypeException;
import com.scandela.server.service.AbstractService;
import com.scandela.server.service.IDecisionTypeService;

@Service
public class DecisionTypeService extends AbstractService<DecisionType> implements IDecisionTypeService {

	// Constructors \\
	protected DecisionTypeService(DecisionTypeDao decisionTypeDao) {
		super(decisionTypeDao);
	}

	// Methods \\
		// Public \\
	@Override
	@Transactional(rollbackFor = { Exception.class })
	public DecisionType create(DecisionType newDecisionType) throws DecisionTypeException{
		try {
			return dao.save(newDecisionType);
		} catch (Exception e) {
			if (newDecisionType.getTitle() == null) {
				throw new DecisionTypeException(DecisionTypeException.INCOMPLETE_INFORMATIONS);
			}
			throw e;
		}
	}

}
