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

@CrossOrigin(origins = "*")
@RestController
@RequestMapping(value = "/notification")
public class TownController extends AbstractController<Town> {

	// Constructors \\
	protected NotificationController(ITownService townService) {
		super(notificationService);
	}

	// Methods \\
	// Public \\
	/**
	 * Get all towns
	 * 
	 * @return allTowns
	 */
	@GetMapping
	public List<Town> getNotification() {
		return super.getAll();
	}

	/**
	 * Get town by id
	 * 
	 * @param id
	 * @return town
	 */
	@GetMapping("/{id}")
	public Town getNotification(@PathVariable UUID id) {
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
	public Town createNotification(@RequestBody Town newTown) throws Exception {
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
	public Town updateNotification(@PathVariable UUID id, @RequestBody Town update) throws Exception {
		return super.update(id, update);
	}

	/**
	 * Delete town
	 * 
	 * @param id
	 */
	@DeleteMapping("/delete/{id}")
	public void deleteNotification(@PathVariable UUID id) {
		super.delete(id);
	}

}
