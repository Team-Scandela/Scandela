package com.scandela.server.service;

import java.util.List;

import com.scandela.server.entity.dto.UserDto;

public interface IUserService {
	
	public List<UserDto> getUsers();
	public UserDto getUser(String email);
	public UserDto createUser(UserDto user);
	public void deleteUser(int id);

}
