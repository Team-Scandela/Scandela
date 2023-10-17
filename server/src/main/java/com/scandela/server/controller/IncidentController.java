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

import com.scandela.server.entity.Incident;
import com.scandela.server.service.IIncidentService;

@CrossOrigin//TODO a changer dans le future en mettant un access token
@RestController
@RequestMapping(value = "/incidents")
public class IncidentController extends AbstractController {

	// Attributes \\
		// Private \\
	@Autowired
	private IIncidentService incidentService;

	// Methods \\
		// Public \\
	/**
	 * Get all incidents
	 * 
	 * @return allIncidents
	 */
	@GetMapping
	public List<Incident> getIncidents() {
		return incidentService.getAll();
	}

	/**
	 * Get incident by id
	 * 
	 * @param id
	 * @return incident
	 */
	@GetMapping("/{id}")
	public Incident getIncident(@PathVariable long id) {
		return incidentService.get(id);
	}

	/**
	 * Create new incident
	 * 
	 * @param newIncident
	 * @return newIncident
	 * @throws IncidentException
	 */
	@PostMapping("/create")
	public Incident createIncident(@RequestBody Incident newIncident) throws Exception {
		return incidentService.create(newIncident);
	}

	/**
	 * Delete incident
	 * 
	 * @param id
	 */
	@DeleteMapping("/delete/{id}")
	public void deleteIncident(@PathVariable long id) {
		incidentService.delete(id);
	}

}
