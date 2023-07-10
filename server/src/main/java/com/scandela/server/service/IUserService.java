package com.scandela.server.service;

import java.util.List;

import com.scandela.server.entity.User;
import com.scandela.server.entity.dto.UserDto;

public interface IUserService {

	// Methods \\
		// Public \\
	public List<UserDto> getUsers();
	public UserDto getUser(int id);
	public UserDto createUser(User user);
	public void deleteUser(User user);

}
