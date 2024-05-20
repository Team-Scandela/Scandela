package com.scandela.server.controller;

import java.time.LocalDateTime;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.scandela.server.entity.Decision;
import com.scandela.server.exception.DecisionException;
import com.scandela.server.service.IDecisionService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping(value = "/decisions")
public class DecisionController extends AbstractController<Decision> {
	
	// Constructors \\
	protected DecisionController(IDecisionService decisionService) {
		super(decisionService);
	}

	// Methods \\
		// Public \\
	/**
	 * Get all decisions
	 * 
	 * @return allDecisions
	 */
	@GetMapping
	public List<Decision> getDecisions(@RequestParam(name = "pageNumber", defaultValue = "0") Integer pageNumber) {
		return ((IDecisionService) service).getAll(pageNumber);
	}

	/**
	 * Get decision by id
	 * 
	 * @param id
	 * @return decision
	 */
	@GetMapping("/{id}")
	public Decision getDecision(@PathVariable UUID id) {
		return super.get(id);
	}

	@GetMapping("/{id}/validate")
    public LocalDateTime getValidateField(@PathVariable UUID id) {
        return super.get(id).getValidate();
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
		return super.create(newDecision);
	}

	/**
	 * Update decision by id
	 * 
	 * @param id
	 * @param update
	 * @return
	 * @throws Exception
	 */
    @PutMapping("/{id}")
    public Decision updateDecision(@PathVariable UUID id, @RequestBody Decision update) throws Exception {
        return super.update(id, update);
    }

	/**
	 * Delete decision
	 * 
	 * @param id
	 */
	@DeleteMapping("/delete/{id}")
	public void deleteDecision(@PathVariable UUID id) {
		super.delete(id);
	}
	
	@PostMapping("/algoChangementBulb")
	public List<Decision> algoChangementBulb() throws Exception {
		return ((IDecisionService) service).algoChangementBulb();
	}
	
	@PostMapping("/algoReductionConsoHoraire")
	public List<Decision> algoReductionConsoHoraire() throws Exception {
		return ((IDecisionService) service).algoReductionConsoHoraire();
	}

	@PostMapping("/algoAjouterLampadaire")
	public List<Decision> algoAjouterLampadaire() throws Exception {
		return ((IDecisionService) service).algoAjouterLampadaire();
	}
	
	@PostMapping("/algoRetirerLampadaire")
	public List<Decision> algoRetirerLampadaire() throws Exception {
		return ((IDecisionService) service).algoRetirerLampadaire();
	}
	
	@PostMapping("/algoReduireIntensiteLampadaire")
	public List<Decision> algoReduireIntensiteLampadaire() throws Exception {
		return ((IDecisionService) service).algoReduireIntensiteLampadaire();
	}
	
	@PostMapping("/algoAugmenterIntensiteLampadaire")
	public List<Decision> algoAugmenterIntensiteLampadaire() throws Exception {
		return ((IDecisionService) service).algoAugmenterIntensiteLampadaire();
	}
}
