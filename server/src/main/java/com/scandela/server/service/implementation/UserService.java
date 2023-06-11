package com.scandela.server.service.implementation;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.scandela.server.dao.IUserDao;
import com.scandela.server.dao.criteria.UserCriteria;
import com.scandela.server.entity.User;
import com.scandela.server.entity.dto.UserDto;
import com.scandela.server.service.AbstractService;
import com.scandela.server.service.IUserService;

@Service
public class UserService extends AbstractService implements IUserService {

	@Autowired
	private IUserDao userDao;

	@Override
	@Transactional(readOnly = true)
	public List<UserDto> getUsers() {
		List<User> users = userDao.getAll();
		List<UserDto> userDtos = new ArrayList<>();

		for (User user : users) {
			userDtos.add(UserDto.from(user));
		}

		return userDtos;
	}

	@Override
	@Transactional(readOnly = true)
	public UserDto getUser(int id) {
		Optional<User> user = userDao.get(id);

		if (user.isEmpty()) {
			return null;
		}

		return UserDto.from(user.get());
	}

	@Override
	@Transactional(rollbackFor = { Exception.class })
	public UserDto createUser(UserDto newUser) {
		if (userDao.getByCriteria(UserCriteria.builder().email(newUser.getEmail()).build()).isEmpty()
				|| userDao.getByCriteria(UserCriteria.builder().username(newUser.getUsername()).build()).isEmpty()) {
			return null;
		}

		// create user

		return null;
	}

	@Override
	@Transactional(rollbackFor = { Exception.class })
	public void deleteUser(int id) {
	}

}
