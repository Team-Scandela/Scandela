package com.scandela.server.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;

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

import com.opencsv.exceptions.CsvValidationException;
import com.scandela.server.entity.Lamp;
import com.scandela.server.entity.dto.LampDto;
import com.scandela.server.exception.LampException;
import com.scandela.server.service.ILampService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping(value = "/lamps")
public class LampController extends AbstractController<Lamp> {
	
	private List<Lamp> allLamps = service.getAll();
    private List<Lamp> allOtherLamps;
	private static final UUID MAIN_CITY_UUID = UUID.fromString("2dac2740-1d45-42d7-af5e-13b98cdf3af4");
	
	// Constructors \\
	protected LampController(ILampService lampService) {
		super(lampService);

		List<Lamp> allLampsList = service.getAll(null);

		this.allLamps = allLampsList.stream()
            .filter(lamp -> MAIN_CITY_UUID.equals(lamp.getTown().getId()))
            .collect(Collectors.toList());
        this.allOtherLamps = allLampsList.stream()
            .filter(lamp -> !MAIN_CITY_UUID.equals(lamp.getTown().getId()))
            .collect(Collectors.toList());
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
		return allLamps.stream().map(lamp -> LampDto.from(lamp)).collect(Collectors.toList());
	}

	@GetMapping("/{townId}")
	public List<LampDto> getLampsFromTown(@PathVariable UUID townId) {
		return allLamps.stream().filter(lamp -> lamp.getTown().getId().equals(townId)).map(lamp -> LampDto.from(lamp)).collect(Collectors.toList());
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

	@GetMapping("/coordinatesWithScores")
	public Map<String, Double> getAllByCoordinatesWithScores(@RequestParam(value = "coordinate") List<String> coordinates) {
		// Récupérer les lampes en fonction des coordonnées
		List<Pair<Double, Double>> coordinatePairs = new ArrayList<>();
		
		coordinates.forEach(coord -> {
			String[] latlng = coord.split(",");
			coordinatePairs.add(Pair.of(Double.valueOf(latlng[0]), Double.valueOf(latlng[1])));
		});
		
		List<Lamp> lampsByCoordinates = ((ILampService) service).getAllByCoordinates(coordinatePairs);
		
		// Calculer les scores en utilisant les lampes récupérées
		CompletableFuture<Double> consumptionScoreFuture = CompletableFuture.supplyAsync(() -> ((ILampService) service).computeGlobalEnergyConsumption(lampsByCoordinates));
		CompletableFuture<Double> vegetalScoreFuture = CompletableFuture.supplyAsync(() -> {
			try {
				return ((ILampService) service).computeGlobalDistanceVegetalZone(lampsByCoordinates);
			} catch (IOException | CsvValidationException e) {
				throw new RuntimeException("Error calculating vegetal score", e);
			}
		});
		CompletableFuture<Double> lightScoreFuture = CompletableFuture.supplyAsync(() -> ((ILampService) service).computeGlobalLightIndicator(lampsByCoordinates));
		
		// Attendre la fin de tous les appels et stocker les résultats dans une Map
		Map<String, Double> allScores = new HashMap<>();
		CompletableFuture.allOf(consumptionScoreFuture, vegetalScoreFuture, lightScoreFuture)
		.thenRun(() -> {
			try {
				allScores.put("consumptionScore", consumptionScoreFuture.get());
				allScores.put("vegetalScore", vegetalScoreFuture.get());
				allScores.put("lightScore", lightScoreFuture.get());
				
				// Afficher les résultats (DEBUG)
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


	@GetMapping("/consuptionScore")
	public double computeGlobalEnergyConsumption() {
		return ((ILampService) service).computeGlobalEnergyConsumption(allLamps);
	}
	
	@GetMapping("/vegetalScore")
	public double computeGlobalDistanceVegetalZone() throws IOException, CsvValidationException {
		return ((ILampService) service).computeGlobalDistanceVegetalZone(allLamps);
	}

	@GetMapping("/lightScore")
	public double computeGlobalLightIndicator() {
		return ((ILampService) service).computeGlobalLightIndicator(allLamps);
	}

	@GetMapping("/allScores") 
	public Map<String, Double> getAllScores() {
		Map<String, Double> indicatorMap = new HashMap<>();
		indicatorMap.put("vegetalScore", 20.824126441360235);
		indicatorMap.put("consumptionScore", 43.672725842161285);
		indicatorMap.put("lightScore", 40.0);
		return indicatorMap;
	}

	@GetMapping("/allScore")
	public Map<String, Double> computeAllIndicator() {
    
		// Lancer les trois appels de manière asynchrone
		CompletableFuture<Double> consumptionScoreFuture = CompletableFuture.supplyAsync(() -> ((ILampService) service).computeGlobalEnergyConsumption(allLamps));
		CompletableFuture<Double> vegetalScoreFuture = CompletableFuture.supplyAsync(() -> {
			try {
				return ((ILampService) service).computeGlobalDistanceVegetalZone(allLamps);
			} catch (IOException | CsvValidationException e) {
				throw new RuntimeException("Error calculating vegetal score", e);
			}
		});
		CompletableFuture<Double> lightScoreFuture = CompletableFuture.supplyAsync(() -> ((ILampService) service).computeGlobalLightIndicator(allLamps));
    
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

	private final Map<String, String[]> lamps = new HashMap<String, String[]>(){{
        put("SHP", new String[]{"Sodium haute pression", "15"});
        put("IMC", new String[]{"Ampoules à incandescence", "2"});
        put("LED", new String[]{"Diode Électroluminescente", "5"});
        put("TF", new String[]{"Tubes fluorescents", "3"});
        put("IM", new String[]{"Iodures métalliques", "20"});
        put("MBF", new String[]{"Lampe à vapeur de mercure", "10"});
        put("FC", new String[]{"Fluorescent Circulaire", "10"});
        put("SBP", new String[]{"Sodium Basse pression", "20"});
        put("HAL", new String[]{"Halogènes", "3"});
        put("TL", new String[]{"Tube luminescent", "5"});
        put("IC", new String[]{"Ampoules à incandescence", "2"});
        put("DIC", new String[]{"Double Iodures métalliques", "30"});
    }};

    @GetMapping("/lamp/{type}")
    public String getLampPrice(@PathVariable String type) {
        String[] lampInfo = lamps.get(type);
        if (lampInfo != null) {
            return lampInfo[1]; // Retourne le prix correspondant à l'argument donné
        } else {
            return "Lampe non trouvée";
        }
    }

}
