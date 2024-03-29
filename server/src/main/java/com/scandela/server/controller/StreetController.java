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

import com.scandela.server.entity.Street;
import com.scandela.server.exception.StreetException;
import com.scandela.server.service.IStreetService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping(value = "/streets")
public class StreetController extends AbstractController<Street> {
	
	// Constructors \\
	protected StreetController(IStreetService streetService) {
		super(streetService);
	}

	// Methods \\
		// Public \\
	/**
	 * Get all streets
	 * 
	 * @return allStreets
	 */
	@GetMapping
	public List<Street> getStreets() {
		return super.getAll();
	}

	/**
	 * Get street by id
	 * 
	 * @param id
	 * @return street
	 */
	@GetMapping("/{id}")
	public Street getStreet(@PathVariable UUID id) {
		return super.get(id);
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
		return super.create(newStreet);
	}

	/**
	 * Update street by id
	 * 
	 * @param id
	 * @param update
	 * @return
	 * @throws Exception
	 */
    @PutMapping("/{id}")
    public Street updateStreet(@PathVariable UUID id, @RequestBody Street update) throws Exception {
        return super.update(id, update);
    }

	/**
	 * Delete street
	 * 
	 * @param id
	 */
	@DeleteMapping("/delete")
	public void deleteStreet(@PathVariable UUID id) {
		super.delete(id);
	}

}
