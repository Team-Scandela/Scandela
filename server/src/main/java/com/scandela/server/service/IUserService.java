package com.scandela.server.service;

import java.util.List;

import com.scandela.server.entity.dto.UserDto;

public interface IUserService {
	
	public List<UserDto> getUsers();
	public UserDto getUser(int id);
	public UserDto createUser(UserDto newUser);
	public void deleteUser(int id);

}
