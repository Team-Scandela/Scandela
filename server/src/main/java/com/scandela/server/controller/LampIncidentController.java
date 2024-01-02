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

import com.scandela.server.entity.LampIncident;
import com.scandela.server.exception.LampIncidentException;
import com.scandela.server.service.ILampIncidentService;

@CrossOrigin//TODO a changer dans le future en mettant un access token
@RestController
@RequestMapping(value = "/lampIncidents")
public class LampIncidentController extends AbstractController<LampIncident> {
	
	// Constructors \\
	protected LampIncidentController(ILampIncidentService lampIncidentService) {
		super(lampIncidentService);
	}

	// Methods \\
		// Public \\
	/**
	 * Get all lampIncidents
	 * 
	 * @return allLampIncidents
	 */
	@GetMapping
	public List<LampIncident> getLampIncidents() {
		return super.getAll();
	}

	/**
	 * Get lampIncident by id
	 * 
	 * @param id
	 * @return lampIncident
	 */
	@GetMapping("/{id}")
	public LampIncident getLampIncident(@PathVariable UUID id) {
		return super.get(id);
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
		return super.create(newLampIncident);
	}

	/**
	 * Update lampIncident by id
	 * 
	 * @param id
	 * @param update
	 * @return
	 * @throws Exception
	 */
    @PutMapping("/{id}")
    public LampIncident updateLampIncident(@PathVariable UUID id, @RequestBody LampIncident update) throws Exception {
        return super.update(id, update);
    }

	/**
	 * Delete lampIncident
	 * 
	 * @param id
	 */
	@DeleteMapping("/delete/{id}")
	public void deleteLampIncident(@PathVariable UUID id) {
		super.delete(id);
	}

}
