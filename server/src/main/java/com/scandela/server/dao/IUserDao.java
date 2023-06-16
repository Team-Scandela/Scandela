package com.scandela.server.dao;

import java.util.List;
import java.util.Optional;

import com.scandela.server.dao.criteria.UserCriteria;
import com.scandela.server.entity.User;

public interface IUserDao {

	// Methods \\
		// Public \\
	public List<User> getAll();

	public Optional<User> get(int id);
	
	public Optional<User> getByCriteria(UserCriteria criteria);
	
	public User save(User user);

	public void delete(User user);

}
