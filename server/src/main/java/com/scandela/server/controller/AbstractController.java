package com.scandela.server.controller;

import java.util.List;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;

import com.scandela.server.service.IService;

import org.springframework.web.bind.annotation.CrossOrigin;

@RequestMapping(produces = MediaType.APPLICATION_JSON_VALUE)
@CrossOrigin(origins = "*")
public abstract class AbstractController<T> {

	// Attributes \\
		// Protected \\
	protected final Logger logger = LoggerFactory.getLogger(getClass());
	protected final IService<T> service;

	// Constructors \\
	protected AbstractController(IService<T> service) {
		this.service = service;
	}

	// Methods \\
		// Protected \\
	protected List<T> getAll() {
		return service.getAll();
	}
	
	protected T get(UUID id) {
		return service.get(id);
	}
	
	protected T create(T newEntity) throws Exception {
		return service.create(newEntity);
	}
	
	protected T update(UUID id, T update) throws Exception {
		return service.update(id, update);
	}
	
	protected void delete(UUID id) {
		service.delete(id);
	}

}