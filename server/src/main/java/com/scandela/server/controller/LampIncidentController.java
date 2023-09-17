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

import com.scandela.server.entity.LampIncident;
import com.scandela.server.service.ILampIncidentService;

@CrossOrigin//TODO a changer dans le future en mettant un access token
@RestController
@RequestMapping(value = "/incidents")
public class LampIncidentController extends AbstractController {

	// Attributes \\
		// Private \\
	@Autowired
	private ILampIncidentService lampIncidentService;

	// Methods \\
		// Public \\
	/**
	 * Get all lampIncidents
	 * 
	 * @return allLampIncidents
	 */
	@GetMapping
	public List<LampIncident> getLampIncidents() {
		return lampIncidentService.getAll();
	}

	/**
	 * Get lampIncident by id
	 * 
	 * @param id
	 * @return lampIncident
	 */
	@GetMapping("/{id}")
	public LampIncident getLampIncident(@PathVariable long id) {
		return lampIncidentService.get(id);
	}

	/**
	 * Create new lampIncident
	 * 
	 * @param newLampIncident
	 * @return newLampIncident
	 * @throws LampIncidentException
	 */
	@PostMapping("/create")
	public LampIncident createLampIncident(@RequestBody LampIncident newLampIncident) throws Exception {
		return lampIncidentService.create(newLampIncident);
	}

	/**
	 * Delete lampIncident
	 * 
	 * @param lampIncident
	 */
	@DeleteMapping("/delete")
	public void deleteLampIncident(@RequestBody LampIncident lampIncident) {
		lampIncidentService.delete(lampIncident);
	}

}
