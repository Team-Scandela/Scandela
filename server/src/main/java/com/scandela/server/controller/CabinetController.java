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

import com.scandela.server.entity.Cabinet;
import com.scandela.server.exception.CabinetException;
import com.scandela.server.service.ICabinetService;

@RestController
@RequestMapping(value = "/cabinets")
@CrossOrigin(origins = "http://localhost:3000, https://app.scandela.fr")
public class CabinetController extends AbstractController<Cabinet> {
	
	// Constructors \\
	protected CabinetController(ICabinetService cabinetService) {
		super(cabinetService);
	}

	// Methods \\
		// Public \\
	/**
	 * Get all cabinets
	 * 
	 * @return allCabinets
	 */
	@GetMapping
	public List<Cabinet> getCabinets() {
		return super.getAll();
	}

	/**
	 * Get cabinet by id
	 * 
	 * @param id
	 * @return cabinet
	 */
	@GetMapping("/{id}")
	public Cabinet getCabinet(@PathVariable UUID id) {
		return super.get(id);
	}

	/**
	 * Create new cabinet
	 * 
	 * @param newCabinet
	 * @return newCabinet
	 * @throws CabinetException
	 */
	@PostMapping("/create")
	public Cabinet createCabinet(@RequestBody Cabinet newCabinet) throws Exception {
		return super.create(newCabinet);
	}

	/**
	 * Update cabinet by id
	 * 
	 * @param id
	 * @param update
	 * @return
	 * @throws Exception
	 */
    @PutMapping("/{id}")
    public Cabinet updateCabinet(@PathVariable UUID id, @RequestBody Cabinet update) throws Exception {
        return super.update(id, update);
    }

	/**
	 * Delete cabinet
	 * 
	 * @param id
	 */
	@DeleteMapping("/delete/{id}")
	public void deleteCabinet(@PathVariable UUID id) {
		super.delete(id);
	}

}
