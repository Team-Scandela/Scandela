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

import com.scandela.server.entity.DecisionType;
import com.scandela.server.exception.DecisionTypeException;
import com.scandela.server.service.IDecisionTypeService;

@CrossOrigin
@RestController
@RequestMapping(value = "/decisionTypes")
public class DecisionTypeController extends AbstractController<DecisionType> {
	
	// Constructors \\
	protected DecisionTypeController(IDecisionTypeService decisionTypeService) {
		super(decisionTypeService);
	}

	// Methods \\
		// Public \\
	/**
	 * Get all decisionTypes
	 * 
	 * @return allDecisionTypes
	 */
	@GetMapping
	public List<DecisionType> getDecisionTypes() {
		return super.getAll();
	}

	/**
	 * Get decisionType by id
	 * 
	 * @param id
	 * @return decisionType
	 */
	@GetMapping("/{id}")
	public DecisionType getDecisionType(@PathVariable UUID id) {
		return super.get(id);
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
		return super.create(newDecisionType);
	}

	/**
	 * Update decisionType by id
	 * 
	 * @param id
	 * @param update
	 * @return
	 * @throws Exception
	 */
    @PutMapping("/{id}")
    public DecisionType updateDecisionType(@PathVariable UUID id, @RequestBody DecisionType update) throws Exception {
        return super.update(id, update);
    }

	/**
	 * Delete decisionType
	 * 
	 * @param id
	 */
	@DeleteMapping("/delete/{id}")
	public void deleteDecisionType(@PathVariable UUID id) {
		super.delete(id);
	}

}
