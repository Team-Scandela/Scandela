package com.scandela.server.controller;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.scandela.server.entity.Lamp;
import com.scandela.server.entity.dto.LampDto;
import com.scandela.server.exception.LampException;
import com.scandela.server.service.ILampService;

@CrossOrigin
@RestController
@RequestMapping(value = "/lamps")
public class LampController extends AbstractController<Lamp> {
	
	// Constructors \\
	protected LampController(ILampService lampService) {
		super(lampService);
	}

	// Methods \\
		// Public \\
	/**
	 * Get all lamps only with id and coordinates
	 * 
	 * @return allLamps
	 */
	@GetMapping
	public List<LampDto> getLamps() {
		List<Lamp> lamps = super.getAll();
		
		return lamps.stream().map(lamp -> LampDto.from(lamp)).collect(Collectors.toList());
	}

	/**
	 * Get lamp by id
	 * 
	 * @param id
	 * @return lamp
	 */
	@GetMapping("/{id}")
	public Lamp getLamp(@PathVariable UUID id) throws Exception {
//		return super.get(id);
        return ((ILampService) service).computeOptimisations(id);//Il me semble que c'est pour les tests
	}

	/**
	 * Update lamp by id
	 * 
	 * @param id
	 * @param update
	 * @return
	 * @throws Exception
	 */
    @PutMapping("/{id}")
    public Lamp updateLamp(@PathVariable UUID id, @RequestBody Lamp update) throws Exception {
        return super.update(id, update);
    }

	/**
	 * Create new lamp
	 * 
	 * @param newLamp
	 * @return newLamp
	 * @throws LampException
	 */
	@PostMapping("/create")
	public Lamp createLamp(@RequestBody Lamp newLamp) throws Exception {
		return super.create(newLamp);
	}

	/**
	 * Delete lamp
	 * 
	 * @param id
	 */
	@DeleteMapping("/delete/{id}")
	public void deleteLamp(@PathVariable UUID id) {
		super.delete(id);
	}

}
