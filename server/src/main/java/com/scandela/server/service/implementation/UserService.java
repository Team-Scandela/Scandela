package com.scandela.server.service.implementation;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.scandela.server.dao.SubscriptionDao;
import com.scandela.server.dao.TownDao;
import com.scandela.server.dao.UserDao;
import com.scandela.server.dao.WhileAwayDao;
import com.scandela.server.entity.AuditEntry;
import com.scandela.server.entity.JwtGenerator;
import com.scandela.server.entity.Subscription;
import com.scandela.server.entity.Town;
import com.scandela.server.entity.User;
import com.scandela.server.entity.WhileAway;
import com.scandela.server.exception.UserException;
import com.scandela.server.service.AbstractService;
import com.scandela.server.service.IAuditService;
import com.scandela.server.service.IUserService;

@Service
public class UserService extends AbstractService<User> implements IUserService {

	// Attributes \\
		// Private \\
	private final String[] IGNORED_PROPERTIES = { "id", "town", "decisions" };
	private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

	private TownDao townDao;
	private WhileAwayDao whileAwayDao;
	private SubscriptionDao subscriptionDao;

	@Autowired
	private IAuditService auditService;

	// Constructors \\
	protected UserService(UserDao userDao, TownDao townDao, WhileAwayDao whileAwayDao, SubscriptionDao subscriptionDao) {
		super(userDao);
		this.townDao = townDao;
		this.whileAwayDao = whileAwayDao;
		this.subscriptionDao = subscriptionDao;
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
			newUser.setRole("USER");

			return dao.save(newUser);
		} catch (Exception e) {
			if (newUser.getTown() == null || newUser.getEmail() == null ||
				newUser.getUsername() == null) {
				throw new UserException(UserException.INCOMPLETE_INFORMATIONS);
			}
			throw e;
		}
	}

	@Override
	@Transactional(rollbackFor = { Exception.class })
	public User setUserRole(UUID userId, String role) {
		System.out.println("b -> " + userId + " and " + role);
        User user = null;
		try {
			System.out.println("c");
			user = ((UserDao) dao).findById(userId).orElseThrow(() -> new NotFoundException());
			System.out.println("d ---> " + user.getEmail());
			user.setRole(role);
			System.out.println("e");
			return dao.save(user);
		} catch (NotFoundException e) {
			e.printStackTrace();
		}
		System.out.println("f + ");
		return null;
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
	public User signIn(String email, String password) throws UserException {
		Optional<User> user = ((UserDao) dao).findByEmail(email);

		if (user.isEmpty()) {
			throw new UserException(UserException.NO_CORRESPONDING_EMAIL);
		}

		if (!passwordEncoder.matches("scan" + password + "dela", user.get().getPassword())) {
			throw new UserException(UserException.WRONG_PASSWORD);
		}

		List<String> moreInfos = new ArrayList<>();

                try {

                    JwtGenerator generator = new JwtGenerator();

                    Map<String, String> claims = new HashMap<>();

                    claims.put("action", "read");

                    String token = generator.generateJwt(claims);
                    System.out.println(token);
                    moreInfos.add(token);

                    List<WhileAway> whileAways = whileAwayDao.findAll();

                    moreInfos.add(whileAways.toString());
                    user.get().setMoreInformations(moreInfos);

                    whileAwayDao.deleteAll();

                    /* Check for premium */
					Optional<Subscription> subscription = subscriptionDao.findByUserid(user.get().getId().toString());

					user.get().setPremium(subscription.isPresent());

					/* Entrée d'audit - Signin de l'user */
					AuditEntry auditEntry = new AuditEntry();

					auditEntry.setData(new ArrayList<>());

					auditEntry.setUserid(user.get().getId());
					auditEntry.setAction("USER_SIGNIN");
					auditEntry.setTimestamp(new Timestamp(System.currentTimeMillis()));

					if (user.get().getUsername() != null) {
						auditEntry.getData().add(user.get().getUsername());
					} else {
						auditEntry.getData().add(user.get().getEmail());
					}

					auditService.sendPostToCreate(auditEntry);

					// System.out.println("test Audit -> " + test);

                } catch (Exception e) {
					e.printStackTrace();
                }
		return user.get();
	}

	@Override
	@Transactional(readOnly = true, rollbackFor = { Exception.class })
	public List<User> getAllForNewsletter() {
		List<User> users = ((UserDao) dao).findByNewsletter(true);
		
		if (users == null || users.isEmpty()) {
			return new ArrayList<>();
		}
		
		return users;
	}

	@Override
	@Transactional(rollbackFor = { Exception.class })
	public User changePassword(UUID id, String password) throws UserException {
		Optional<User> user = dao.findById(id);
		
		if (user.isEmpty()) {
			throw new UserException(UserException.INCOMPLETE_INFORMATIONS);
		}
		

		user.get().setPassword(passwordEncoder.encode("scan" + password + "dela"));
		
		return user.get();
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
