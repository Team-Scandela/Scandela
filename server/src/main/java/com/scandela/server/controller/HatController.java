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

import com.scandela.server.entity.Hat;
import com.scandela.server.exception.HatException;
import com.scandela.server.service.IHatService;

@CrossOrigin
@RestController
@RequestMapping(value = "/hats")
public class HatController extends AbstractController<Hat> {
	
	// Constructors \\
	protected HatController(IHatService hatService) {
		super(hatService);
	}

	// Methods \\
		// Public \\
	/**
	 * Get all hats
	 * 
	 * @return allHats
	 */
	@GetMapping
	public List<Hat> getHats() {
		return super.getAll();
	}

	/**
	 * Get hat by id
	 * 
	 * @param id
	 * @return hat
	 */
	@GetMapping("/{id}")
	public Hat getHat(@PathVariable UUID id) {
		return super.get(id);
	}

	/**
	 * Create new hat
	 * 
	 * @param newHat
	 * @return newHat
	 * @throws HatException
	 */
	@PostMapping("/create")
	public Hat createHat(@RequestBody Hat newHat) throws Exception {
		return super.create(newHat);
	}

	/**
	 * Update hat by id
	 * 
	 * @param id
	 * @param update
	 * @return
	 * @throws Exception
	 */
    @PutMapping("/{id}")
    public Hat updateHat(@PathVariable UUID id, @RequestBody Hat update) throws Exception {
        return super.update(id, update);
    }

	/**
	 * Delete hat
	 * 
	 * @param id
	 */
	@DeleteMapping("/delete/{id}")
	public void deleteHat(@PathVariable UUID id) {
		super.delete(id);
	}

}
