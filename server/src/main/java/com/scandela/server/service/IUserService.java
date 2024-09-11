package com.scandela.server.service;

import java.util.List;
import java.util.UUID;

import com.scandela.server.entity.User;
import com.scandela.server.entity.dto.UserDTO;
import com.scandela.server.exception.UserException;

public interface IUserService extends IService<User> {
	public User signIn(String email, String password) throws UserException;
	public List<User> getAllForNewsletter();
	public User setUserRole(UUID userId, String role);
	public UserDTO updateUserTown(UUID userId, UUID newTownId) throws Exception;
	public User changePassword(UUID id, String password) throws UserException;
	public User getByMail(String mail);
}
