package com.scandela.server.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.scandela.server.entity.Town;
import com.scandela.server.entity.dto.TownDto;
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
	public ResponseEntity<List<TownDto>> getTowns() {
		return ResponseEntity.ok(townService.getTowns());
	}

	/**
	 * Get town by id
	 * 
	 * @param id
	 * @return town
	 */
	@GetMapping("/{id}")
	public ResponseEntity<TownDto> getTown(@PathVariable int id) {
		return ResponseEntity.ok(townService.getTown(id));
	}

	/**
	 * Create new town
	 * 
	 * @param newTown
	 * @return newTown
	 */
	@PostMapping("/create")
	public ResponseEntity<TownDto> createTown(@RequestBody Town newTown) {
		return ResponseEntity.ok(townService.createTown(newTown));
	}

	/**
	 * Delete town
	 * 
	 * @param town
	 */
	@DeleteMapping("/delete")
	public void deleteTown(@RequestBody Town town) {
		townService.deleteTown(town);
	}

}
