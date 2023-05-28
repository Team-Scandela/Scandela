package com.scandela.server.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/")
public class ServerController extends AbstractController {

	@GetMapping
	public List<String> getServerInfo() {
		List<String> a = new ArrayList<>();
		
		a.add("Test1");
		a.add("Test2");
		return a;
	}

}
