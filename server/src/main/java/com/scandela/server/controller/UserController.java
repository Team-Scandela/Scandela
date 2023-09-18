package com.scandela.server.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.scandela.server.entity.User;
import com.scandela.server.entity.dto.UserDto;
import com.scandela.server.service.IEmailService;
import com.scandela.server.service.IUserService;

@RestController
@RequestMapping(value = "/users")
public class UserController extends AbstractController {

	// Attributes \\
	// Private \\
	@Autowired
	private IUserService userService;

	@Autowired
	private IEmailService emailService;

	// Methods \\
	// Public \\
	/**
	 * Get all users
	 * 
	 * @return allUsers
	 */
	@GetMapping
	public ResponseEntity<List<UserDto>> getUsers() {
		return ResponseEntity.ok(userService.getUsers());
	}

	/**
	 * Get user by id
	 * 
	 * @param id
	 * @return user
	 */
	@GetMapping("/{id}")
	public ResponseEntity<UserDto> getUser(@PathVariable int id) {
		return ResponseEntity.ok(userService.getUser(id));
	}

	/**
	 * Create new user
	 * 
	 * @param newUser
	 * @return newUser
	 */
	@PostMapping("/create")
	public ResponseEntity<UserDto> createUser(@RequestBody User newUser) {
		emailService.sendSimpleEmail(newUser.getEmail(), "Welcome to Scandela!", "test Message");
		return ResponseEntity.ok(userService.createUser(newUser));
	}

	/**
	 * Delete user
	 * 
	 * @param user
	 */
	@DeleteMapping("/delete")
	public void deleteUser(@RequestBody User user) {
		userService.deleteUser(user);
	}

}
