package com.scandela.server.service.implementation;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.scandela.server.dao.IUserDao;
import com.scandela.server.dao.criteria.UserCriteria;
import com.scandela.server.entity.User;
import com.scandela.server.entity.dto.UserDto;
import com.scandela.server.service.AbstractService;
import com.scandela.server.service.IUserService;

@Service
public class UserService extends AbstractService implements IUserService {

	// Attributes \\
		// Private \\
	private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

	@Autowired
	private IUserDao userDao;

	// Methods \\
		// Public \\
	@Override
	@Transactional(readOnly = true)
	public List<UserDto> getUsers() {
		List<User> users = userDao.getAll();
		List<UserDto> userDtos = new ArrayList<>();

		for (User user : users) {
			userDtos.add(UserDto.from(user));
		}

		return userDtos;
	}

	@Override
	@Transactional(readOnly = true)
	public UserDto getUser(int id) {
		Optional<User> user = userDao.get(id);

		if (user.isEmpty()) {
			return null;
		}

		return UserDto.from(user.get());
	}

	@Override
	@Transactional(rollbackFor = { Exception.class })
	public UserDto createUser(String email, String username, String password) {
		if (userDao.getByCriteria(UserCriteria.builder().email(email).build()).isPresent()) {
			return null;// throw pour différencier
		}
		if (userDao.getByCriteria(UserCriteria.builder().username(username).build()).isPresent()) {
			return null;// throw pour différencier
		}
		User newUser = User.builder()
				.email(email)
				.username(username)
				.password(passwordEncoder.encode("scan" + password + "dela"))
				.build();

		return UserDto.from(userDao.save(newUser));
	}

	@Override
	@Transactional(rollbackFor = { Exception.class })
	public void deleteUser(int id) {
		Optional<User> user = userDao.get(id);
		
		if (user.isEmpty()) {
			return;
		}
		
		userDao.delete(user.get());
	}

}
