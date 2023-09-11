package com.scandela.server.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.scandela.server.entity.User;
import com.scandela.server.exception.UserException;
import com.scandela.server.service.IUserService;

@CrossOrigin//TODO a changer dans le future en mettant un access token
@RestController
@RequestMapping(value = "/users")
public class UserController extends AbstractController {

	// Attributes \\
		// Private \\
	@Autowired
	private IUserService userService;

	// Methods \\
		// Public \\
	/**
	 * Get all users
	 * 
	 * @return allUsers
	 */
	@GetMapping
	public List<User> getUsers() {
		return userService.getAll();
	}

	/**
	 * Get user by id
	 * 
	 * @param id
	 * @return user
	 */
	@GetMapping("/{id}")
	public User getUser(@PathVariable long id) {
		return userService.get(id);
	}

	/**
	 * Create new user
	 * 
	 * @param newUser
	 * @return newUser
	 * @throws UserException 
	 */
	@PostMapping("/create")
	public User createUser(@RequestBody User newUser) throws Exception {
		return userService.create(newUser);
	}

	/**
	 * Delete user
	 * 
	 * @param user
	 */
	@DeleteMapping("/delete")
	public void deleteUser(@RequestBody User user) {
		userService.delete(user);
	}

}
