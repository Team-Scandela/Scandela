package com.scandela.server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.scandela.server.entity.Server;
import com.scandela.server.service.IServerService;

@RestController
@RequestMapping(value = "/")
public class ServerController extends AbstractController {

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
