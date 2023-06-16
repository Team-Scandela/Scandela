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

import com.scandela.server.dao.implementation.UserDao;
import com.scandela.server.entity.dto.UserDto;
import com.scandela.server.service.IUserService;

@RestController
@RequestMapping(value = "/users")
public class UserController extends AbstractController {

	// Attributes \\
		// Private \\
	@Autowired
	private IUserService userService;

	// Methods \\
		// Public \\
	@GetMapping
	public ResponseEntity<List<UserDto>> getUsers() {
		return ResponseEntity.ok(userService.getUsers());
	}

	@GetMapping("/{id}")
	public ResponseEntity<UserDto> getUser(@PathVariable int id) {
		return ResponseEntity.ok(userService.getUser(id));
	}

	@PostMapping("/create")
	public ResponseEntity<UserDto> createUser() {
		return ResponseEntity.ok(userService.createUser("", "", ""));
	}

	@DeleteMapping("/delete")//@DeleteMapping("/{id}/delete")
	public void deleteUser(@RequestBody int id) {
		userService.deleteUser(id);
	}

}
