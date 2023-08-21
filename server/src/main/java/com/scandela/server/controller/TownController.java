package com.scandela.server.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.scandela.server.entity.Town;
import com.scandela.server.exception.TownException;
import com.scandela.server.service.ITownService;

@RestController
@RequestMapping(value = "/towns")
public class TownController extends AbstractController {

	// Attributes \\
		// Private \\
	@Autowired
	private ITownService townService;

	// Methods \\
		// Public \\
	/**
	 * Get all towns
	 * 
	 * @return allTowns
	 */
	@GetMapping
	public List<Town> getTowns() {
		return townService.getAll();
	}

	/**
	 * Get town by id
	 * 
	 * @param id
	 * @return town
	 */
	@GetMapping("/{id}")
	public Town getTown(@PathVariable long id) {
		return townService.get(id);
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
		return townService.create(newTown);
	}

	/**
	 * Delete town
	 * 
	 * @param town
	 */
	@DeleteMapping("/delete")
	public void deleteTown(@RequestBody Town town) {
		townService.delete(town);
	}

}
