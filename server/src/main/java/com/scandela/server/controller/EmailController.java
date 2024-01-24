package com.scandela.server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.scandela.server.service.IEmailService;

@CrossOrigin(origins = "http://localhost:3000, https://app.scandela.fr")
@RestController
@RequestMapping(value = "/emailConfirmation")
public class EmailController {

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
    public void confirmEmailActivation(@RequestBody String email) {
		;
	}
}
