package com.scandela.server.controller;

import com.scandela.server.entity.PriceLimit;
import com.scandela.server.entity.Town;

import java.util.List;
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

    @GetMapping("/{id}")
	public PriceLimit getPriceLimit(@PathVariable UUID id) {
		return super.get(id);
	}

    @PostMapping("/create")
	public PriceLimit createPriceLimit(@RequestBody PriceLimit newPriceLimit) throws Exception {
		return super.create(newPriceLimit);
	}

    @PutMapping("/{id}")
	public PriceLimit updatePriceLimit(@PathVariable UUID id, @RequestBody PriceLimit update) throws Exception {
		return super.update(id, update);
	}

    @DeleteMapping("/delete/{id}")
	public void deletePriceLimit(@PathVariable UUID id) {
		super.delete(id);
	}
}
