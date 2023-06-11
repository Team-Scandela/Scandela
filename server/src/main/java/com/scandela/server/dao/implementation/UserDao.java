package com.scandela.server.dao.implementation;

import java.util.Optional;

import org.springframework.stereotype.Repository;

import com.scandela.server.dao.AbstractDao;
import com.scandela.server.dao.IUserDao;
import com.scandela.server.dao.criteria.UserCriteria;
import com.scandela.server.entity.User;

@Repository
public class UserDao extends AbstractDao<User> implements IUserDao {

	@Override
	public Optional<User> getByCriteria(UserCriteria criteria) {
		return Optional.empty();
	}

}
