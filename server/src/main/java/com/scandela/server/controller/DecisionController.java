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
import com.scandela.server.entity.DecisionType;
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
		List<Decision> decisions = ((IDecisionService) service).algoChangementBulb();
		
		return getAllByDecisionTypes(decisions);
	}
	
	@PostMapping("/algoReductionConsoHoraire")
	public List<Decision> algoReductionConsoHoraire() throws Exception {
		List<Decision> decisions = ((IDecisionService) service).algoReductionConsoHoraire();
		
		return getAllByDecisionTypes(decisions);
	}
	
	@PostMapping("/algoReductionConsoHoraireWeather")
	public List<Decision> algoReductionConsoHoraireWeather() throws Exception {
		return ((IDecisionService) service).algoReductionConsoHoraireWeather();
	}

	@PostMapping("/algoAjouterLampadaire")
	public List<Decision> algoAjouterLampadaire() throws Exception {
		List<Decision> decisions = ((IDecisionService) service).algoAjouterLampadaire();
		
		return getAllByDecisionTypes(decisions);
	}
	
	@PostMapping("/algoRetirerLampadaire")
	public List<Decision> algoRetirerLampadaire() throws Exception {
		List<Decision> decisions = ((IDecisionService) service).algoRetirerLampadaire();
		
		return getAllByDecisionTypes(decisions);
	}
	
	@PostMapping("/algoReduireIntensiteLampadaire")
	public List<Decision> algoReduireIntensiteLampadaire() throws Exception {
		List<Decision> decisions = ((IDecisionService) service).algoReduireIntensiteLampadaire();
		
		return getAllByDecisionTypes(decisions);
	}
	
	@PostMapping("/algoAugmenterIntensiteLampadaire")
	public List<Decision> algoAugmenterIntensiteLampadaire() throws Exception {
		List<Decision> decisions = ((IDecisionService) service).algoAugmenterIntensiteLampadaire();
		
		return getAllByDecisionTypes(decisions);
	}
	
	private List<Decision> getAllByDecisionTypes(List<Decision> decisions) {
		List<DecisionType> decisionTypes = decisions.stream().map(Decision::getType).distinct().toList();
		
		return ((IDecisionService) service).getAllByDecisionTypes(decisionTypes);
	}
	
	@GetMapping("/{idDecision}/state")
	public String getState(@PathVariable UUID idDecision) throws Exception {
		return ((IDecisionService) service).getState(idDecision);
	}
	
	@PostMapping("/{idDecision}/state")
	public void setState(@PathVariable UUID idDecision, @RequestBody String state) throws Exception {
		((IDecisionService) service).setState(idDecision, state);
	}
}
