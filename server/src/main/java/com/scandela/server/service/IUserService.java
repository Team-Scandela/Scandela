package com.scandela.server.service;

import java.util.UUID;

import com.scandela.server.entity.User;
import com.scandela.server.exception.UserException;

public interface IUserService extends IService<User> {
	public UUID signIn(String email, String password) throws UserException;
}
