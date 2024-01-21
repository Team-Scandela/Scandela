package com.scandela.server.service.implementation;

import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.scandela.server.dao.DecisionTypeDao;
import com.scandela.server.entity.DecisionType;
import com.scandela.server.exception.DecisionTypeException;
import com.scandela.server.service.AbstractService;
import com.scandela.server.service.IDecisionTypeService;

@Service
public class DecisionTypeService extends AbstractService<DecisionType> implements IDecisionTypeService {

	// Attributes \\
		// Private \\
	private final String[] IGNORED_PROPERTIES = { "id", "decisions" };

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

	@Override
	@Transactional(rollbackFor = { Exception.class })
    public DecisionType update(UUID id, DecisionType update, String... ignoredProperties) throws Exception {
		try {
			DecisionType decisionType = super.update(id, update, IGNORED_PROPERTIES);
	        
	        return decisionType;
		} catch (Exception e) {
			throw e;
		}
    }

}
