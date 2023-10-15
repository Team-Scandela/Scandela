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

import com.scandela.server.entity.Decision;
import com.scandela.server.service.IDecisionService;

@CrossOrigin//TODO a changer dans le future en mettant un access token
@RestController
@RequestMapping(value = "/decisions")
public class DecisionController extends AbstractController {

	// Attributes \\
		// Private \\
	@Autowired
	private IDecisionService decisionService;

	// Methods \\
		// Public \\
	/**
	 * Get all decisions
	 * 
	 * @return allDecisions
	 */
	@GetMapping
	public List<Decision> getDecisions() {
		return decisionService.getAll();
	}

	/**
	 * Get decision by id
	 * 
	 * @param id
	 * @return decision
	 */
	@GetMapping("/{id}")
	public Decision getDecision(@PathVariable long id) {
		return decisionService.get(id);
	}

	/**
	 * Create new decision
	 * 
	 * @param newDecision
	 * @return newDecision
	 * @throws DecisionException
	 */
	@PostMapping("/create")
	public Decision createDecision(@RequestBody Decision newDecision) throws Exception {
		return decisionService.create(newDecision);
	}

	/**
	 * Delete decision
	 * 
	 * @param id
	 */
	@DeleteMapping("/delete/{id}")
	public void deleteDecision(@PathVariable long id) {
		decisionService.delete(id);
	}

}
