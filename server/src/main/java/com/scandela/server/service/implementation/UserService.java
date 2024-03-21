package com.scandela.server.service.implementation;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

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
	private final String[] IGNORED_PROPERTIES = { "id", "town", "decisions" };
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
				newUser.getUsername() == null || newUser.getRights() == null) {
				throw new UserException(UserException.INCOMPLETE_INFORMATIONS);
			}
			throw e;
		}
	}

	@Override
	@Transactional(rollbackFor = { Exception.class })
    public User update(UUID id, User update, String... ignoredProperties) throws Exception {
		try {
			User user = super.update(id, update, IGNORED_PROPERTIES);
	        
	        return user;
		} catch (Exception e) {
			throw e;
		}
    }
	
	@Override
	@Transactional(readOnly = true, rollbackFor = { Exception.class })
	public UUID signIn(String email, String password) throws UserException {
		Optional<User> user = ((UserDao) dao).findByEmail(email);
		
		if (user.isEmpty()) {
			throw new UserException(UserException.NO_CORRESPONDING_EMAIL);
		}
		
		if (!passwordEncoder.matches("scan" + password + "dela", user.get().getPassword())) {
			throw new UserException(UserException.WRONG_PASSWORD);
		}
		
		return user.get().getId();
	}
	
	public List<User> getAllForNewsletter() {
		List<User> users = ((UserDao) dao).findByNewsletter(true);
		
		if (users == null || users.isEmpty()) {
			return new ArrayList<>();
		}
		
		return users;
	}

	// Private \\
	private void loadTown(User newUser) throws UserException {
		if (newUser.getTown() == null) {
			throw new UserException(UserException.INCOMPLETE_INFORMATIONS);
		}

		UUID townId = newUser.getTown().getId();

		Optional<Town> town = townDao.findById(townId);
		if (town.isEmpty()) {
			throw new UserException(UserException.TOWN_LOADING);
		}

		newUser.setTown(town.orElseGet(() -> {
			return null;
		}));
	}

}
