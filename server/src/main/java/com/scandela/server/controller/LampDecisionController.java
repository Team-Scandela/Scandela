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

import com.scandela.server.entity.LampDecision;
import com.scandela.server.exception.LampDecisionException;
import com.scandela.server.service.ILampDecisionService;

@CrossOrigin//TODO a changer dans le future en mettant un access token
@RestController
@RequestMapping(value = "/lampDecisions")
public class LampDecisionController extends AbstractController {

	// Attributes \\
		// Private \\
	@Autowired
	private ILampDecisionService lampDecisionService;

	// Methods \\
		// Public \\
	/**
	 * Get all lampDecisions
	 * 
	 * @return allLampDecisions
	 */
	@GetMapping
	public List<LampDecision> getLampDecisions() {
		return lampDecisionService.getAll();
	}

	/**
	 * Get lampDecision by id
	 * 
	 * @param id
	 * @return lampDecision
	 */
	@GetMapping("/{id}")
	public LampDecision getLampDecision(@PathVariable long id) {
		return lampDecisionService.get(id);
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
		return lampDecisionService.create(newLampDecision);
	}

	/**
	 * Delete lampDecision
	 * 
	 * @param id
	 */
	@DeleteMapping("/delete/{id}")
	public void deleteLampDecision(@PathVariable long id) {
		lampDecisionService.delete(id);
	}

}
