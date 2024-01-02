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
import org.springframework.web.bind.annotation.RestController;

import com.scandela.server.entity.Town;
import com.scandela.server.exception.TownException;
import com.scandela.server.service.ITownService;

@CrossOrigin//TODO a changer dans le future en mettant un access token
@RestController
@RequestMapping(value = "/towns")
public class TownController extends AbstractController<Town> {
	
	// Constructors \\
	protected TownController(ITownService townService) {
		super(townService);
	}

	// Methods \\
		// Public \\
	/**
	 * Get all towns
	 * 
	 * @return allTowns
	 */
	@GetMapping
	public List<Town> getTowns() {
		return super.getAll();
	}

	/**
	 * Get town by id
	 * 
	 * @param id
	 * @return town
	 */
	@GetMapping("/{id}")
	public Town getTown(@PathVariable UUID id) {
		return super.get(id);
	}

	/**
	 * Create new town
	 * 
	 * @param newTown
	 * @return newTown
	 * @throws TownException
	 */
	@PostMapping("/create")
	public Town createTown(@RequestBody Town newTown) throws Exception {
		return super.create(newTown);
	}

	/**
	 * Update town by id
	 * 
	 * @param id
	 * @param update
	 * @return
	 * @throws Exception
	 */
    @PutMapping("/{id}")
    public Town updateTown(@PathVariable UUID id, @RequestBody Town update) throws Exception {
        return super.update(id, update);
    }

	/**
	 * Delete town
	 * 
	 * @param id
	 */
	@DeleteMapping("/delete/{id}")
	public void deleteTown(@PathVariable UUID id) {
		super.delete(id);
	}

}
