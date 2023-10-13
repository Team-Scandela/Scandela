package com.scandela.server.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.scandela.server.entity.Street;
import com.scandela.server.exception.StreetException;
import com.scandela.server.service.IStreetService;

@CrossOrigin//TODO a changer dans le future en mettant un access token
@RestController
@RequestMapping(value = "/streets")
public class StreetController extends AbstractController {

	// Attributes \\
		// Private \\
	@Autowired
	private IStreetService streetService;

	// Methods \\
		// Public \\
	/**
	 * Get all streets
	 * 
	 * @return allStreets
	 */
	@GetMapping
	public List<Street> getStreets() {
		return streetService.getAll();
	}

	/**
	 * Get street by id
	 * 
	 * @param id
	 * @return street
	 */
	@GetMapping("/{id}")
	public Street getStreet(@PathVariable long id) {
		return streetService.get(id);
	}

	/**
	 * Create new street
	 * 
	 * @param newStreet
	 * @return newStreet
	 * @throws StreetException
	 */
	@PostMapping("/create")
	public Street createStreet(@RequestBody Street newStreet) throws Exception {
		return streetService.create(newStreet);
	}

	/**
	 * Delete street
	 * 
	 * @param id
	 */
	@DeleteMapping("/delete")
	public void deleteStreet(@PathVariable long id) {
		streetService.delete(id);
	}

}
