package com.scandela.server.dao.implementation;

import java.util.Optional;

import org.springframework.stereotype.Repository;

import com.scandela.server.dao.AbstractDao;
import com.scandela.server.dao.IUserDao;
import com.scandela.server.dao.criteria.UserCriteria;
import com.scandela.server.entity.User;

import jakarta.persistence.TypedQuery;

@Repository
public class UserDao extends AbstractDao<User> implements IUserDao {
	
	// Constructors \\
	protected UserDao() {
		super(User.class);
	}

	// Methods \\
		// Public \\
	@Override
	public Optional<User> getByCriteria(UserCriteria criteria) {
		String req = "SELECT * FROM User as user";
		if (criteria.getEmail().isPresent()) {
			req += req.contains("WHERE") ? " AND " : " WHERE ";
			req += "EMAIL = " + criteria.getEmail().get();
		}
		if (criteria.getUsername().isPresent()) {
			req += req.contains("WHERE") ? " AND " : " WHERE ";
			req += "USERNAME = " + criteria.getUsername().get();
		}
		
		TypedQuery<User> query = entityManager.createQuery(req, User.class);
		
		return Optional.ofNullable(query.getSingleResult());
	}

}
