package com.scandela.server.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.scandela.server.entity.dto.UserDto;
import com.scandela.server.service.IUserService;

@RestController
@RequestMapping(value = "/user")
public class UserController extends AbstractController {

	@Autowired
	private IUserService userService;

	@GetMapping
	public ResponseEntity<List<UserDto>> getUsers() {
		return null;
	}

	@GetMapping("/{email}")
	public ResponseEntity<UserDto> getUser() {
		return null;
	}

	@PostMapping("/create")
	public ResponseEntity<UserDto> createUser(@RequestBody UserDto user) {
		return null;
	}

	@DeleteMapping("/delete")
	public void deleteUser(@RequestBody int id) {
	}

}
