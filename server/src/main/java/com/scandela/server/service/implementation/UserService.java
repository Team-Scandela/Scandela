package com.scandela.server.service.implementation;

import java.util.List;

import org.springframework.stereotype.Service;

import com.scandela.server.dao.IUserDao;
import com.scandela.server.entity.dto.UserDto;
import com.scandela.server.service.AbstractService;
import com.scandela.server.service.IUserService;

@Service
public class UserService extends AbstractService implements IUserService {

	private IUserDao userDao;

	@Override
	public List<UserDto> getUsers() {
		return null;
	}

	@Override
	public UserDto getUser(String email) {
		return null;
	}

	@Override
	public UserDto createUser(UserDto user) {
		return null;
	}

	@Override
	public void deleteUser(int id) {

	}

}
