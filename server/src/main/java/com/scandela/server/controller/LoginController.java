package com.scandela.server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.scandela.server.entity.User;
import com.scandela.server.service.ILoginService;

@RestController
@RequestMapping(value = "/login")
public class LoginController extends AbstractController {

    // Attributes \\
		// Private \\
    @Autowired
	private ILoginService loginService;

    // Methods \\
		// Public \\
	@PostMapping
	public ResponseEntity<User> loginAsUser(@RequestBody User loginDetails) {
		return ResponseEntity.ok(this.loginService.checkLoginDetails(loginDetails));
	}
}
