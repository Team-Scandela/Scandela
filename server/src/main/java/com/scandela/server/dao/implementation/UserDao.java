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
		Optional<User> user = Optional.empty();
		String req = "SELECT u FROM User u";

		if (criteria.getEmail().isPresent()) {
			req += " WHERE u.email = :email";
		}
		if (criteria.getUsername().isPresent()) {
			req += req.contains("WHERE") ? " OR " : " WHERE ";
			req += "u.username = :username";
		}
		
		TypedQuery<User> query = entityManager.createQuery(req, User.class);

		if (criteria.getEmail().isPresent()) {
			query.setParameter("email", criteria.getEmail().get());
		}
		if (criteria.getUsername().isPresent()) {
			query.setParameter("username", criteria.getUsername().get());
		}

		try {
			user = Optional.ofNullable(query.getSingleResult());
		} catch (Exception e) {}

		return user;
	}

}
