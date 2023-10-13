package com.scandela.server.service.implementation;

import java.time.LocalDate;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.scandela.server.dao.DecisionDao;
import com.scandela.server.dao.DecisionTypeDao;
import com.scandela.server.dao.UserDao;
import com.scandela.server.entity.Decision;
import com.scandela.server.entity.DecisionType;
import com.scandela.server.entity.User;
import com.scandela.server.exception.DecisionException;
import com.scandela.server.service.AbstractService;
import com.scandela.server.service.IDecisionService;

@Service
public class DecisionService extends AbstractService<Decision> implements IDecisionService {

	// Attributes \\
		// Private \\
	private DecisionTypeDao decisionTypeDao;
	private UserDao userDao;

	// Constructors \\
	protected DecisionService(DecisionDao decisionDao, DecisionTypeDao decisionTypeDao, UserDao userDao) {
		super(decisionDao);
		this.decisionTypeDao = decisionTypeDao;
		this.userDao = userDao;
	}

	// Methods \\
		// Public \\
	@Override
	@Transactional(rollbackFor = { Exception.class })
	public Decision create(Decision newDecision) throws DecisionException{
		try {
			loadDecisionType(newDecision);
			loadUser(newDecision);
			
			newDecision.setDate(LocalDate.now());
			
			return dao.save(newDecision);
		} catch (Exception e) {
			if (newDecision.getType() == null || newDecision.getUser() == null ||
				newDecision.getDescription() == null || newDecision.getCost() == null) {
				throw new DecisionException(DecisionException.INCOMPLETE_INFORMATIONS);
			}
			throw e;
		}
	}

		// Private \\
	private void loadDecisionType(Decision newDecision) throws DecisionException {
		if (newDecision.getType() == null) {
			throw new DecisionException(DecisionException.INCOMPLETE_INFORMATIONS);
		}
	
		long typeId = newDecision.getType().getId();
		
		Optional<DecisionType> type = decisionTypeDao.findById(typeId);
		if (type.isEmpty()) {
			throw new DecisionException(DecisionException.DECISIONTYPE_LOADING);
		}
	
		newDecision.setType(type.orElseGet(() -> { return null; }));
	}
	
	private void loadUser(Decision newDecision) throws DecisionException {
		if (newDecision.getUser() == null) {
			throw new DecisionException(DecisionException.INCOMPLETE_INFORMATIONS);
		}
	
		long userId = newDecision.getUser().getId();
		
		Optional<User> user = userDao.findById(userId);
		if (user.isEmpty()) {
			throw new DecisionException(DecisionException.USER_LOADING);
		}
	
		newDecision.setUser(user.orElseGet(() -> { return null; }));
	}

}
