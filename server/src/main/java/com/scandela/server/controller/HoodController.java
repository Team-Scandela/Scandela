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

import com.scandela.server.entity.Hood;
import com.scandela.server.exception.HoodException;
import com.scandela.server.service.IHoodService;

@CrossOrigin(origins = "http://localhost:3000, https://app.scandela.fr")
@RestController
@RequestMapping(value = "/hoods")
public class HoodController extends AbstractController<Hood> {
	
	// Constructors \\
	protected HoodController(IHoodService hoodService) {
		super(hoodService);
	}

	// Methods \\
		// Public \\
	/**
	 * Get all hoods
	 * 
	 * @return allHoods
	 */
	@GetMapping
	public List<Hood> getHoods() {
		return super.getAll();
	}

	/**
	 * Get hood by id
	 * 
	 * @param id
	 * @return hood
	 */
	@GetMapping("/{id}")
	public Hood getHood(@PathVariable UUID id) {
		return super.get(id);
	}

	/**
	 * Create new hood
	 * 
	 * @param newHood
	 * @return newHood
	 * @throws HoodException
	 */
	@PostMapping("/create")
	public Hood createHood(@RequestBody Hood newHood) throws Exception {
		return super.create(newHood);
	}

	/**
	 * Update hood by id
	 * 
	 * @param id
	 * @param update
	 * @return
	 * @throws Exception
	 */
    @PutMapping("/{id}")
    public Hood updateHood(@PathVariable UUID id, @RequestBody Hood update) throws Exception {
        return super.update(id, update);
    }

	/**
	 * Delete hood
	 * 
	 * @param id
	 */
	@DeleteMapping("/delete/{id}")
	public void deleteHood(@PathVariable UUID id) {
		super.delete(id);
	}

}
