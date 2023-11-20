package com.scandela.server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.scandela.server.entity.Server;
import com.scandela.server.service.IServerService;

@CrossOrigin//TODO a changer dans le future en mettant un access token
@RestController
@RequestMapping(value = "/")
public class ServerController {

	// Attributes \\
		// Private \\
	@Autowired
	private IServerService serverService;

	// Methods \\
		// Public \\
	@GetMapping
	public Server getServerInfo() {
		Server server = serverService.getServerInformations();

		return server;
	}

}
