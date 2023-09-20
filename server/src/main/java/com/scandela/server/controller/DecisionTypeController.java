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

import com.scandela.server.entity.DecisionType;
import com.scandela.server.exception.DecisionTypeException;
import com.scandela.server.service.IDecisionTypeService;

@CrossOrigin//TODO a changer dans le future en mettant un access token
@RestController
@RequestMapping(value = "/decisionTypes")
public class DecisionTypeController extends AbstractController {

	// Attributes \\
		// Private \\
	@Autowired
	private IDecisionTypeService decisionTypeService;

	// Methods \\
		// Public \\
	/**
	 * Get all decisionTypes
	 * 
	 * @return allDecisionTypes
	 */
	@GetMapping
	public List<DecisionType> getDecisionTypes() {
		return decisionTypeService.getAll();
	}

	/**
	 * Get decisionType by id
	 * 
	 * @param id
	 * @return decisionType
	 */
	@GetMapping("/{id}")
	public DecisionType getDecisionType(@PathVariable long id) {
		return decisionTypeService.get(id);
	}

	/**
	 * Create new decisionType
	 * 
	 * @param newDecisionType
	 * @return newDecisionType
	 * @throws DecisionTypeException
	 */
	@PostMapping("/create")
	public DecisionType createDecisionType(@RequestBody DecisionType newDecisionType) throws Exception {
		return decisionTypeService.create(newDecisionType);
	}

	/**
	 * Delete decisionType
	 * 
	 * @param id
	 */
	@DeleteMapping("/delete/{id}")
	public void deleteDecisionType(@PathVariable long id) {
		decisionTypeService.delete(id);
	}

}
