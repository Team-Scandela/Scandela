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

import com.scandela.server.entity.Hood;
import com.scandela.server.exception.HoodException;
import com.scandela.server.service.IHoodService;

@RestController
@RequestMapping(value = "/hoods")
public class HoodController extends AbstractController {

	// Attributes \\
		// Private \\
	@Autowired
	private IHoodService hoodService;

	// Methods \\
		// Public \\
	/**
	 * Get all hoods
	 * 
	 * @return allHoods
	 */
	@GetMapping
	public List<Hood> getHoods() {
		return hoodService.getAll();
	}

	/**
	 * Get hood by id
	 * 
	 * @param id
	 * @return hood
	 */
	@GetMapping("/{id}")
	public Hood getHood(@PathVariable long id) {
		return hoodService.get(id);
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
		return hoodService.create(newHood);
	}

	/**
	 * Delete hood
	 * 
	 * @param hood
	 */
	@DeleteMapping("/delete")
	public void deleteHood(@RequestBody Hood hood) {
		hoodService.delete(hood);
	}

}
