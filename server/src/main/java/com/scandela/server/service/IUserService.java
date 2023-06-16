package com.scandela.server.service;

import java.util.List;

import com.scandela.server.entity.dto.UserDto;

public interface IUserService {

	// Methods \\
		// Public \\
	public List<UserDto> getUsers();
	public UserDto getUser(int id);
	public UserDto createUser(String email, String username, String password);
	public void deleteUser(int id);

}
