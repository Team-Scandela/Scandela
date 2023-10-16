package com.scandela.server.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.scandela.server.entity.User;
import com.scandela.server.entity.dto.UserDto;
import com.scandela.server.service.IEmailService;

@RestController
@RequestMapping(value = "/emailConfirmation")
public class EmailController extends AbstractController {

    // Attributes \\
	// Private \\

	@Autowired
	private IEmailService emailService;


    // Methods \\
	// Public \\

	/**
	 * Create new user
	 * 
	 * @param newUser
	 * @return newUser
	 */
	@PostMapping
    public void confirmEmailActivation() {
		;
	}
}
