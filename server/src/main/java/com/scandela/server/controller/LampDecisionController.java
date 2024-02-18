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

import com.scandela.server.entity.LampDecision;
import com.scandela.server.exception.LampDecisionException;
import com.scandela.server.service.ILampDecisionService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping(value = "/lampDecisions")
public class LampDecisionController extends AbstractController<LampDecision> {
	
	// Constructors \\
	protected LampDecisionController(ILampDecisionService lampDecisionService) {
		super(lampDecisionService);
	}

	// Methods \\
		// Public \\
	/**
	 * Get all lampDecisions
	 * 
	 * @return allLampDecisions
	 */
	@GetMapping
	public List<LampDecision> getLampDecisions() {
		return super.getAll();
	}

	/**
	 * Get lampDecision by id
	 * 
	 * @param id
	 * @return lampDecision
	 */
	@GetMapping("/{id}")
	public LampDecision getLampDecision(@PathVariable UUID id) {
		return super.get(id);
	}

	/**
	 * Create new lampDecision
	 * 
	 * @param newLampDecision
	 * @return newLampDecision
	 * @throws LampDecisionException
	 */
	@PostMapping("/create")
	public LampDecision createLampDecision(@RequestBody LampDecision newLampDecision) throws Exception {
		return super.create(newLampDecision);
	}

	/**
	 * Update lampDecision by id
	 * 
	 * @param id
	 * @param update
	 * @return
	 * @throws Exception
	 */
    @PutMapping("/{id}")
    public LampDecision updateLampDecision(@PathVariable UUID id, @RequestBody LampDecision update) throws Exception {
        return super.update(id, update);
    }

	/**
	 * Delete lampDecision
	 * 
	 * @param id
	 */
	@DeleteMapping("/delete/{id}")
	public void deleteLampDecision(@PathVariable UUID id) {
		super.delete(id);
	}

}
