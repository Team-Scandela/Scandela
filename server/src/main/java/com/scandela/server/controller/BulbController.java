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

import com.scandela.server.entity.Bulb;
import com.scandela.server.exception.BulbException;
import com.scandela.server.service.IBulbService;

@CrossOrigin//TODO a changer dans le future en mettant un access token
@RestController
@RequestMapping(value = "/bulbs")
public class BulbController extends AbstractController<Bulb> {
	
	// Constructors \\
	protected BulbController(IBulbService bulbService) {
		super(bulbService);
	}

	// Methods \\
		// Public \\
	/**
	 * Get all bulbs
	 * 
	 * @return allBulbs
	 */
	@GetMapping
	public List<Bulb> getBulbs() {
		return super.getAll();
	}

	/**
	 * Get bulb by id
	 * 
	 * @param id
	 * @return bulb
	 */
	@GetMapping("/{id}")
	public Bulb getBulb(@PathVariable UUID id) {
		return super.get(id);
	}

	/**
	 * Create new bulb
	 * 
	 * @param newBulb
	 * @return newBulb
	 * @throws BulbException
	 */
	@PostMapping("/create")
	public Bulb createBulb(@RequestBody Bulb newBulb) throws Exception {
		return super.create(newBulb);
	}

	/**
	 * Delete bulb
	 * 
	 * @param id
	 */
	@DeleteMapping("/delete/{id}")
	public void deleteBulb(@PathVariable UUID id) {
		super.delete(id);
	}

}
