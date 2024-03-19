package com.scandela.server.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.scandela.server.entity.Bulb;
import com.scandela.server.exception.BulbException;
import com.scandela.server.service.IBulbService;

@RestController
@RequestMapping(value = "/bulbs")
@CrossOrigin(origins = "*")
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
	public List<Bulb> getBulbs(@RequestParam("name") String name) {
		return ((IBulbService) service).getAll(name);
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
	 * Update bulb by id
	 * 
	 * @param id
	 * @param update
	 * @return
	 * @throws Exception
	 */
    @PutMapping("/{id}")
    public Bulb updateBulb(@PathVariable UUID id, @RequestBody Bulb update) throws Exception {
        return super.update(id, update);
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
