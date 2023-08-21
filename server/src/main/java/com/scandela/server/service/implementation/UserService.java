package com.scandela.server.service.implementation;

import java.time.LocalDateTime;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.scandela.server.dao.UserDao;
import com.scandela.server.entity.User;
import com.scandela.server.exception.UserException;
import com.scandela.server.service.AbstractService;
import com.scandela.server.service.IUserService;

@Service
public class UserService extends AbstractService<User> implements IUserService {

	// Attributes \\
		// Private \\
	private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

	// Constructors \\
	protected UserService(UserDao userDao) {
		super(userDao);
	}

	// Methods \\
		// Public \\
	@Override
	@Transactional(rollbackFor = { Exception.class })
	public User create(User newUser) throws UserException {
		try {
			if (newUser.getPassword() == null) {
				throw new UserException(UserException.INCOMPLETE_INFORMATIONS);
			}
			newUser.setPassword(passwordEncoder.encode("scan" + newUser.getPassword() + "dela"));
			newUser.setLastConnexion(LocalDateTime.now());
			
			return dao.save(newUser);
		} catch (Exception e) {
			if (newUser.getTown() == null || newUser.getEmail() == null ||
				newUser.getUsername() == null || newUser.getRole() == null) {
				throw new UserException(UserException.INCOMPLETE_INFORMATIONS);
			}
			throw e;
		}
	}

}
