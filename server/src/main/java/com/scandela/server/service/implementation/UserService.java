package com.scandela.server.service.implementation;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.scandela.server.dao.TownDao;
import com.scandela.server.dao.UserDao;
import com.scandela.server.entity.Town;
import com.scandela.server.entity.User;
import com.scandela.server.exception.UserException;
import com.scandela.server.service.AbstractService;
import com.scandela.server.service.IUserService;

@Service
public class UserService extends AbstractService<User> implements IUserService {

	// Attributes \\
	// Private \\
	private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

	private TownDao townDao;

	// Constructors \\
	protected UserService(UserDao userDao, TownDao townDao) {
		super(userDao);
		this.townDao = townDao;
	}

	// Methods \\
	// Public \\
	@Override
	@Transactional(rollbackFor = { Exception.class })
	public User create(User newUser) throws UserException {
		try {
			loadTown(newUser);

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

	// Private \\
	private void loadTown(User newUser) throws UserException {
		if (newUser.getTown() == null) {
			throw new UserException(UserException.INCOMPLETE_INFORMATIONS);
		}

		long townId = newUser.getTown().getId();

		Optional<Town> town = townDao.findById(townId);
		if (town.isEmpty()) {
			throw new UserException(UserException.TOWN_LOADING);
		}

		newUser.setTown(town.orElseGet(() -> {
			return null;
		}));
	}

}
