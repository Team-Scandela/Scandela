package com.scandela.server.controller;

import com.scandela.server.entity.PriceLimit;
import com.scandela.server.entity.Town;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import com.scandela.server.service.IPriceLimitService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping(value = "/pricelimits")
public class PriceLimitController extends AbstractController<PriceLimit> {

	@Autowired
	protected PriceLimitController(IPriceLimitService service) {
		super(service);
	}

	@GetMapping
	public List<PriceLimit> getPriceLimits() {
		return super.getAll();
	}

	@GetMapping("/{userId}")
	public PriceLimit getPriceLimit(@PathVariable String userId) {
		Optional<PriceLimit> priceLimitOptional = findPriceLimitByUserId(userId);

		if (priceLimitOptional.isPresent()) {
			return priceLimitOptional.get();
		} else {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "PriceLimit not found for user ID: " + userId);
		}
	}

	// @PostMapping("/create")
	// public PriceLimit createPriceLimit(@RequestBody PriceLimit newPriceLimit) throws Exception {
	// 	// if (getPriceLimit(newPriceLimit.getUserId()))
	// 	return super.create(newPriceLimit);
	// }

	@PostMapping("/create")
	public PriceLimit createPriceLimit(@RequestBody PriceLimit newPriceLimit) throws Exception {
		String userId = newPriceLimit.getUserId();

		Optional<PriceLimit> existingPriceLimitOptional = findPriceLimitByUserId(userId);

		if (existingPriceLimitOptional.isPresent()) {
			// System.out.println("d");
			// // Option 1: Update the existing PriceLimit
			// PriceLimit existingPriceLimit = existingPriceLimitOptional.get();
			// existingPriceLimit.setUserId(userId);
			// existingPriceLimit.setValue((newPriceLimit.getValue()));
			// existingPriceLimit.setLimitside(newPriceLimit.getLimitside());
			// existingPriceLimit.setTriggeredstate(false);

			// System.out.println("e -> updated UserId " + existingPriceLimit.getUserId());

			// return super.update(existingPriceLimit.getId(), existingPriceLimit);

			// Option 2: Return an error response
			throw new ResponseStatusException(HttpStatus.CONFLICT, "A PriceLimit already exists for user ID: " + userId);
		} else {
			// No PriceLimit exists for the user, create a new one
			return super.create(newPriceLimit);
		}
	}

	@PutMapping("/{id}")
	public PriceLimit updatePriceLimit(@PathVariable UUID id, @RequestBody PriceLimit update) throws Exception {
		return super.update(id, update);
	}

	@DeleteMapping("/delete/{id}")
	public void deletePriceLimit(@PathVariable UUID id) {
		super.delete(id);
	}

	private Optional<PriceLimit> findPriceLimitByUserId(String userId) {
		List<PriceLimit> priceLimits = super.getAll();
		return priceLimits.stream()
				.filter(priceLimit -> priceLimit.getUserId().equals(userId))
				.findFirst();
	}
}
