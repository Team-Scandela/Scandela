package com.scandela.server.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.scandela.server.entity.Lamp;
import com.scandela.server.service.ILampService;

@CrossOrigin//TODO a changer dans le future en mettant un access token
@RestController
@RequestMapping(value = "/lamps")
public class LampController extends AbstractController<Lamp> {
	
	// Constructors \\
	protected LampController(ILampService lampService) {
		super(lampService);
	}

	// Methods \\
		// Public \\
	/**
	 * Get all lamps
	 * 
	 * @return allLamps
	 */
	@GetMapping
	public List<Lamp> getLamps() {
		return super.getAll();
	}

	/**
	 * Get lamp by id
	 * 
	 * @param id
	 * @return lamp
	 */
	@GetMapping("/{id}")
	public Lamp getLamp(@PathVariable UUID id) {
		return super.get(id);
	}

	/**
	 * Create new lamp
	 * 
	 * @param newLamp
	 * @return newLamp
	 * @throws LampException
	 */
	@PostMapping("/create")
	public Lamp createLamp(@RequestBody Lamp newLamp) throws Exception {
		return super.create(newLamp);
	}

	/**
	 * Delete lamp
	 * 
	 * @param id
	 */
	@DeleteMapping("/delete/{id}")
	public void deleteLamp(@PathVariable UUID id) {
		super.delete(id);
	}

}
