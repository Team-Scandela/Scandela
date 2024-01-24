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

import com.scandela.server.entity.LampShade;
import com.scandela.server.exception.LampShadeException;
import com.scandela.server.service.ILampShadeService;

@CrossOrigin(origins = "http://localhost:3000, https://app.scandela.fr")
@RestController
@RequestMapping(value = "/lampShades")
public class LampShadeController extends AbstractController<LampShade> {
	
	// Constructors \\
	protected LampShadeController(ILampShadeService lampShadeService) {
		super(lampShadeService);
	}

	// Methods \\
		// Public \\
	/**
	 * Get all lampShades
	 * 
	 * @return allLampShades
	 */
	@GetMapping
	public List<LampShade> getLampShades() {
		return super.getAll();
	}

	/**
	 * Get lampShade by id
	 * 
	 * @param id
	 * @return lampShade
	 */
	@GetMapping("/{id}")
	public LampShade getLampShade(@PathVariable UUID id) {
		return super.get(id);
	}

	/**
	 * Create new lampShade
	 * 
	 * @param newLampShade
	 * @return newLampShade
	 * @throws LampShadeException
	 */
	@PostMapping("/create")
	public LampShade createLampShade(@RequestBody LampShade newLampShade) throws Exception {
		return super.create(newLampShade);
	}

	/**
	 * Update lampShade by id
	 * 
	 * @param id
	 * @param update
	 * @return
	 * @throws Exception
	 */
    @PutMapping("/{id}")
    public LampShade updateLampShade(@PathVariable UUID id, @RequestBody LampShade update) throws Exception {
        return super.update(id, update);
    }

	/**
	 * Delete lampShade
	 * 
	 * @param id
	 */
	@DeleteMapping("/delete/{id}")
	public void deleteLampShade(@PathVariable UUID id) {
		super.delete(id);
	}

}
