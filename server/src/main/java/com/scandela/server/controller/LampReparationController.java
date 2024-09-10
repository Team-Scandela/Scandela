package com.scandela.server.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.scandela.server.entity.LampReparation;
import com.scandela.server.service.ILampReparationService;

@RestController
@RequestMapping(value = "/lampReparations")
@CrossOrigin(origins = "*")
public class LampReparationController extends AbstractController<LampReparation> {
	
	// Constructors \\
	protected LampReparationController(ILampReparationService lampReparationService) {
		super(lampReparationService);
	}

	// Methods \\
		// Public \\
	/**
	 * Get all lampReparations
	 * 
	 * @return allLampReparations
	 */
	@GetMapping
	public List<LampReparation> getLampReparations() {
		return super.getAll();
	}

	/**
	 * Get lampReparation by id
	 * 
	 * @param id
	 * @return lampReparation
	 */
	@GetMapping("/{id}")
	public LampReparation getLampReparation(@PathVariable UUID id) {
		return super.get(id);
	}

	/**
	 * Create new lampReparation
	 * 
	 * @param newLampReparation
	 * @return newLampReparation
	 * @throws Exception
	 */
	@PostMapping("/create")
	public LampReparation createLampReparation(@RequestBody LampReparation newLampReparation) throws Exception {
		return super.create(newLampReparation);
	}

	/**
	 * Delete lampReparation
	 * 
	 * @param id
	 */
	@DeleteMapping("/delete/{id}")
	public void deleteLampReparation(@PathVariable UUID id) {
		super.delete(id);
	}
	
	/**
	 * Add a comment to a lamp reparation
	 * 
	 * @param id
	 * @param comment
	 * @return
	 * @throws Exception
	 */
	@PatchMapping("/{id}/addComment")
	public LampReparation addComment(@PathVariable UUID id, @RequestBody String comment) throws Exception {
		return ((ILampReparationService) service).addComment(id, comment);
	}
	
	@PatchMapping("/{id}/finish")
	public LampReparation finish(@PathVariable UUID id, @RequestBody Integer duration) throws Exception {
		return ((ILampReparationService) service).finish(id, duration);
	}

}
