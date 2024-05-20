package com.scandela.server.controller;

import java.util.ArrayList;	
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.concurrent.CompletableFuture;
import java.util.Map;
import java.util.HashMap;
import java.util.concurrent.ExecutionException;

import java.io.IOException;
import com.opencsv.exceptions.CsvValidationException;

import org.springframework.data.util.Pair;
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

import com.scandela.server.entity.Lamp;
import com.scandela.server.entity.dto.LampDto;
import com.scandela.server.exception.LampException;
import com.scandela.server.service.ILampService;

@CrossOrigin(origins = "*")
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
		List<Lamp> lamps = ((ILampService) service).getAll();
		
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
		return super.get(id);
//        return ((ILampService) service).computeOptimisations(id);//Il me semble que c'est pour les tests
	}

	/**
	 * Get lamp by id
	 * 
	 * @param id
	 * @return lamp
	 */
	@GetMapping("/name/{name}")
	public Lamp getLamp(@PathVariable String name) throws Exception {
		List<Lamp> lamps = ((ILampService) service).getAll(name);
		
		return lamps.isEmpty() ? null : lamps.get(0);
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

	@GetMapping("/coordinates")
	public List<Lamp> getAllByCoordinates(@RequestParam(value = "coordinate") List<String> coordinates) {
		List<Pair<Double, Double>> coordinatePairs = new ArrayList<>();
		
		coordinates.forEach(coord -> {
			String[] latlng = coord.split(",");
			coordinatePairs.add(Pair.of(Double.valueOf(latlng[0]), Double.valueOf(latlng[1])));
		});
		
		return ((ILampService) service).getAllByCoordinates(coordinatePairs);
	}
	
	@GetMapping("/consuptionScore")
	public double computeGlobalEnergyConsumption() {
		List<Lamp> lamps = super.getAll();
		return ((ILampService) service).computeGlobalEnergyConsumption(lamps);
	}
	
	@GetMapping("/vegetalScore")
	public double computeGlobalDistanceVegetalZone() throws IOException, CsvValidationException {
		List<Lamp> lamps = super.getAll();
		return ((ILampService) service).computeGlobalDistanceVegetalZone(lamps);
	}

	@GetMapping("/lightScore")
	public double computeGlobalLightIndicator() {
		List<Lamp> lamps = super.getAll();
		return ((ILampService) service).computeGlobalLightIndicator(lamps);
	}

	@GetMapping("/allScores")
	public Map<String, Double> computeAllIndicator() {
		List<Lamp> lamps = super.getAll();
    
		// Lancer les trois appels de manière asynchrone
		CompletableFuture<Double> consumptionScoreFuture = CompletableFuture.supplyAsync(() -> ((ILampService) service).computeGlobalEnergyConsumption(lamps));
		CompletableFuture<Double> vegetalScoreFuture = CompletableFuture.supplyAsync(() -> {
			try {
				return ((ILampService) service).computeGlobalDistanceVegetalZone(lamps);
			} catch (IOException | CsvValidationException e) {
				throw new RuntimeException("Error calculating vegetal score", e);
			}
		});
		CompletableFuture<Double> lightScoreFuture = CompletableFuture.supplyAsync(() -> ((ILampService) service).computeGlobalLightIndicator(lamps));
    
		// Attendre la fin de tous les appels et stocker les résultats dans une Map
		Map<String, Double> allScores = new HashMap<>();
		CompletableFuture.allOf(consumptionScoreFuture, vegetalScoreFuture, lightScoreFuture)
		.thenRun(() -> {
			try {
                allScores.put("consumptionScore", consumptionScoreFuture.get());
                allScores.put("vegetalScore", vegetalScoreFuture.get());
                allScores.put("lightScore", lightScoreFuture.get());
                
                // Afficher les résultats
                System.out.println("Consumption score: " + allScores.get("consumptionScore"));
                System.out.println("Vegetal score: " + allScores.get("vegetalScore"));
                System.out.println("Light score: " + allScores.get("lightScore"));
            } catch (InterruptedException | ExecutionException e) {
                throw new RuntimeException("Error getting async scores", e);
            }
		})
		.join(); // Attendre la fin de l'exécution avant de retourner la Map

		// Retourner la Map contenant les scores
		return allScores;
	}

}
