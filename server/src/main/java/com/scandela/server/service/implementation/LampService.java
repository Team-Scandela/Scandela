package com.scandela.server.service.implementation;

import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.PriorityQueue;
import java.util.UUID;
import java.util.Collections;

import org.springframework.data.util.Pair;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import com.opencsv.CSVReaderBuilder;
import com.opencsv.CSVParserBuilder;
import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvValidationException;
import com.scandela.server.dao.BulbDao;
import com.scandela.server.dao.CabinetDao;
import com.scandela.server.dao.LampDao;
import com.scandela.server.dao.LampShadeDao;
import com.scandela.server.dao.StreetDao;
import com.scandela.server.dao.TownDao;
import com.scandela.server.dao.WhileAwayDao;
import com.scandela.server.entity.Bulb;
import com.scandela.server.entity.Cabinet;
import com.scandela.server.entity.Lamp;
import com.scandela.server.entity.LampShade;
import com.scandela.server.entity.Street;
import com.scandela.server.entity.Town;
import com.scandela.server.entity.WhileAway;
import com.scandela.server.exception.LampException;
import com.scandela.server.service.AbstractService;
import com.scandela.server.service.ILampService;

@Service
public class LampService extends AbstractService<Lamp> implements ILampService {

	// Attributes \\
		// Private \\
	private final String[] IGNORED_PROPERTIES = { "id", "cabinet", "lampShade", "bulb", "town", "street", "lampDecisions", "lampIncidents" };
	private TownDao townDao;
	private StreetDao streetDao;
	private BulbDao bulbDao;
	private CabinetDao cabinetDao;
	private LampShadeDao lampShadeDao;
    private WhileAwayDao whileAwayDao;

	// Constructors \\
	protected LampService(LampDao lampDao, TownDao townDao, StreetDao streetDao, BulbDao bulbDao, CabinetDao cabinetDao, LampShadeDao lampShadeDao, WhileAwayDao whileAwayDao) {
		super(lampDao);
		this.townDao = townDao;
		this.streetDao = streetDao;
		this.bulbDao = bulbDao;
		this.cabinetDao = cabinetDao;
		this.lampShadeDao = lampShadeDao;
		this.whileAwayDao = whileAwayDao;
	}

	// Methods \\
		// Public \\
	@Override
	@Transactional(rollbackFor = { Exception.class })
	public Lamp create(Lamp newLamp) throws LampException {
		try {
			// loadTown(newLamp);
			// loadStreet(newLamp);
			// loadBulb(newLamp);
			// loadCabinet(newLamp);
			// loadLampShade(newLamp);
			
			return dao.save(newLamp);
		} catch (Exception e) {
			// if (newLamp.getLatitude() == null || newLamp.getLongitude() == null ||
			// 	newLamp.getHeight() == null) {
			// 	throw new LampException(LampException.INCOMPLETE_INFORMATIONS);
			// }
			throw e;
		}
	}
	
	@Override
	@Transactional(readOnly = true, rollbackFor = { Exception.class })
	public List<Lamp> getAll(String name) {
		if (name == null || name.isBlank()) {
			return super.getAll();
		}
		
		return ((LampDao) dao).findByName(name);
	}

	@Override
	@Transactional(rollbackFor = { Exception.class })
	public Lamp computeOptimisations(UUID id) throws LampException {
    	Optional<Lamp> lamp = dao.findById(id);
    	
    	if (lamp.isEmpty()) {
    		throw new LampException(LampException.LAMP_NOT_FOUND);
    	}
		
        double tensionMoyenne = 8000; // Volts
        double courantMoyen = 0.05; // Ampères

        // Puissance(Watts) = Tension(Volts) * Courant(Ampères)
        double puissanceMoyenne = tensionMoyenne * courantMoyen; // Watts

        int fourchetteHoraireMoyenne = 7; // heures

        // COUTS -> Puissance * durée d’allumage sur 1 journée(Minutes) = Conso totale
        // journalière
        double consommationJournalière = puissanceMoyenne * fourchetteHoraireMoyenne / 1000; // kWh

        double indiceEmpreinteCarbonne = 0.5 /* moyenne CO2 / kWh */ * consommationJournalière;

        lamp.get().setMoreInformations("Infos:   Puissance -> " + puissanceMoyenne + "     Consommation journalière -> "
                + consommationJournalière + "     Empreinte carbonne -> " + indiceEmpreinteCarbonne);

        if (consommationJournalière > 2) {
            lamp.get().setMoreInformations(lamp.get().getMoreInformations()
                    + "\n WARNING: La Consommation Journalière dépasse le seuil recommandé (2kWh) pour un point lumineux moyen!");
        }

        if (indiceEmpreinteCarbonne > 1) {
            lamp.get().setMoreInformations(lamp.get().getMoreInformations()
                    + "\n WARNING: L'Empreinte d'émission de carbone dépasse le seuil recommandé (1kg CO2 / jour) pour un point lumineux moyen!");;
        }

        return lamp.get();
    }

	@Override
	@Transactional(rollbackFor = { Exception.class })
    public Lamp update(UUID id, Lamp update, String... ignoredProperties) throws Exception {
		try {
			Lamp lamp = super.update(id, update, IGNORED_PROPERTIES);

	        WhileAway whileAway = new WhileAway();

	        whileAway.setId(lamp.getId());
	        whileAway.setUpdatedData(update.toString());
	        whileAwayDao.save(whileAway);
	        
	        return lamp;
		} catch (Exception e) {
			throw e;
		}
    }
	
	@Override
	@Transactional(readOnly = true, rollbackFor = { Exception.class })
	public List<Lamp> getAllByCoordinates(List<Pair<Double, Double>> coordinates) {
		if (coordinates.isEmpty()) {
			return null;
		}

		double latitudeMax = -180;
		double latitudeMin = 180;
		double longitudeMax = -180;
		double longitudeMin = 180;
		
		for (Pair<Double, Double> coord : coordinates) {
			if (coord.getFirst() > latitudeMax) {
				latitudeMax = coord.getFirst();
			}
			if (coord.getFirst() < latitudeMin) {
				latitudeMin = coord.getFirst();
			}
			if (coord.getSecond() > longitudeMax) {
				longitudeMax = coord.getSecond();
			}
			if (coord.getSecond() < longitudeMin) {
				longitudeMin = coord.getSecond();
			}
		}
		
		List<Lamp> lamps = ((LampDao) dao).findByLatitudeBetweenAndLongitudeBetween(latitudeMin, latitudeMax, longitudeMin, longitudeMax);
		List<Lamp> resultLamps = new ArrayList<>();
		
		if (coordinates.size() > 2) {
			lamps.forEach(lamp -> {
				int counter = 0;
				int i;
				int N = coordinates.size();
				double xinters;
				Pair<Double, Double> p1,p2;

				p1 = coordinates.get(0);
				for (i=1;i<=N;i++) {
					p2 = coordinates.get(i % N);
					if (lamp.getLatitude() > Math.min(p1.getFirst(),p2.getFirst())) {
						if (lamp.getLatitude() <= Math.max(p1.getFirst(),p2.getFirst())) {
							if (lamp.getLongitude() <= Math.max(p1.getSecond(),p2.getSecond())) {
								if (p1.getFirst() != p2.getFirst()) {
									xinters = (lamp.getLatitude()-p1.getFirst())*(p2.getSecond()-p1.getSecond())/(p2.getFirst()-p1.getFirst())+p1.getSecond();
									if (p1.getSecond() == p2.getSecond() || lamp.getLongitude() <= xinters)
										counter++;
								}
							}
						}
					}
					p1 = p2;
				}

				if (counter % 2 != 0) {
					resultLamps.add(lamp);
				}
			});
		}
		
		return resultLamps;
	}

		// Private \\
	private void loadTown(Lamp newLamp) throws LampException {
		if (newLamp.getTown() == null) {
			// throw new LampException(LampException.INCOMPLETE_INFORMATIONS);
			return;
		}
	
		UUID townId = newLamp.getTown().getId();
		
		Optional<Town> town = townDao.findById(townId);
		if (town.isEmpty()) {
			throw new LampException(LampException.TOWN_LOADING);
		}
	
		newLamp.setTown(town.orElseGet(() -> { return null; }));
	}
	
	private void loadStreet(Lamp newLamp) throws LampException {
		if (newLamp.getStreet() == null) {
			// throw new LampException(LampException.INCOMPLETE_INFORMATIONS);
			return;
		}
	
		UUID streetId = newLamp.getStreet().getId();
		
		Optional<Street> street = streetDao.findById(streetId);
		if (street.isEmpty()) {
			throw new LampException(LampException.STREET_LOADING);
		}
	
		newLamp.setStreet(street.orElseGet(() -> { return null; }));
	}
	
	private void loadBulb(Lamp newLamp) throws LampException {
		if (newLamp.getBulb() == null) {
			// throw new LampException(LampException.INCOMPLETE_INFORMATIONS);
			return;
		}
	
		UUID bulbId = newLamp.getBulb().getId();
		
		Optional<Bulb> bulb = bulbDao.findById(bulbId);
		if (bulb.isEmpty()) {
			throw new LampException(LampException.BULB_LOADING);
		}
	
		newLamp.setBulb(bulb.orElseGet(() -> { return null; }));
	}
	
	private void loadCabinet(Lamp newLamp) throws LampException {
		if (newLamp.getCabinet() == null) {
			// throw new LampException(LampException.INCOMPLETE_INFORMATIONS);
			return;
		}
	
		UUID cabinetId = newLamp.getCabinet().getId();
		
		Optional<Cabinet> cabinet = cabinetDao.findById(cabinetId);
		if (cabinet.isEmpty()) {
			throw new LampException(LampException.CABINET_LOADING);
		}
	
		newLamp.setCabinet(cabinet.orElseGet(() -> { return null; }));
	}
	
	private void loadLampShade(Lamp newLamp) throws LampException {
		if (newLamp.getLampShade() == null) {
			// throw new LampException(LampException.INCOMPLETE_INFORMATIONS);
			return;
		}
	
		UUID lampShadeId = newLamp.getLampShade().getId();
		
		Optional<LampShade> lampShade = lampShadeDao.findById(lampShadeId);
		if (lampShade.isEmpty()) {
			throw new LampException(LampException.LAMPSHADE_LOADING);
		}
	
		newLamp.setLampShade(lampShade.orElseGet(() -> { return null; }));
	}

	private double calculateDistance(double lat1, double lon1, double lat2, double lon2) {
		return Math.sqrt(Math.pow(lat1 - lat2, 2) + Math.pow(lon1 - lon2, 2));
	}
	
	class LampDistance {
		Lamp lamp;
		double distance;
	
		LampDistance(Lamp lamp, double distance) {
			this.lamp = lamp;
			this.distance = distance;
		}
	}

	public double computeGlobalEnergyConsumption() {

		List<Lamp> lamps = super.getAll();

		double globalEnergyConsumption = 0;
		int timeOfUse = 7;

		int SHP = 50, IMC = 40, LED = 3, TF = 10, IM = 35, MBF = 50, FC = 22, SBP = 18, HAL = 10, TL = 8, IC = 40, DIC = 70;

		PriorityQueue<Integer> leastConsumption = new PriorityQueue<>(Comparator.reverseOrder());
		PriorityQueue<Integer> worstConsumption = new PriorityQueue<>();

		int countValidLamps = 0;

		for (Lamp lamp : lamps) {
			if (lamp == null || lamp.getLampType() == null) {
				continue;
			}

			int energyConsumption = 0;

			switch (lamp.getLampType().toString()) {
				case "SHP":
					energyConsumption = SHP * timeOfUse;
					break;
				case "IMC":
					energyConsumption = IMC * timeOfUse;
					break;
				case "LED":
					energyConsumption = LED * timeOfUse;
					break;
				case "TF":
					energyConsumption = TF * timeOfUse;
					break;
				case "IM":
					energyConsumption = IM * timeOfUse;
					break;
				case "MBF":
					energyConsumption = MBF * timeOfUse;
					break;
				case "FC":
					energyConsumption = FC * timeOfUse;
					break;
				case "SBP":
					energyConsumption = SBP * timeOfUse;
					break;
				case "HAL":
					energyConsumption = HAL * timeOfUse;
					break;
				case "TL":
					energyConsumption = TL * timeOfUse;
					break;
				case "IC":
					energyConsumption = IC * timeOfUse;
					break;
				case "DIC":
					energyConsumption = DIC * timeOfUse;
					break;
				default:
					continue;
			}

			leastConsumption.offer(energyConsumption);
			if (leastConsumption.size() > 3) {
				leastConsumption.poll();
			}

			worstConsumption.offer(energyConsumption);
			if (worstConsumption.size() > 3) {
				worstConsumption.poll();
			}

			globalEnergyConsumption += energyConsumption;
			countValidLamps++;
		}

		if (countValidLamps == 0) {
			return 0;
		}

		double meanGlobalEnergyConsumption = globalEnergyConsumption / countValidLamps;

		double minConsumption = leastConsumption.stream().mapToInt(Integer::intValue).average().orElse(0);
		double maxConsumption = worstConsumption.stream().mapToInt(Integer::intValue).average().orElse(0);

		double consumptionScore = 100 - ((meanGlobalEnergyConsumption - maxConsumption) / (minConsumption - maxConsumption) * 100);

		System.out.println("Global energy consumption: " + globalEnergyConsumption);
		System.out.println("Mean global energy consumption: " + meanGlobalEnergyConsumption);
		System.out.println("Minimum global energy consumption: " + minConsumption);
		System.out.println("Maximum global energy consumption: " + maxConsumption);
		System.out.println("Consumption score: " + consumptionScore);

		return consumptionScore;
	}


	public class VegetalZonesExtractor {
		public static double[][] getVegetalZonesFromCSV(String filePath) throws IOException, CsvValidationException {
			List<double[]> vegetalZones = new ArrayList<>();

			try (CSVReader reader = new CSVReaderBuilder(new FileReader(filePath))
					.withCSVParser(new CSVParserBuilder().withSeparator(';').build())
					.build()) {
				String[] nextLine;
				int lineNumber = 0;

				while ((nextLine = reader.readNext()) != null) {
					lineNumber++;
					if (lineNumber == 1) {
						// Skip the header
						continue;
					}

					// Check if the line has the correct number of columns
					if (nextLine.length < 12) {
						System.err.println("Skipping invalid line " + lineNumber + " (not enough columns): " + String.join(";", nextLine));
						continue;
					}

					String geoColumn = nextLine[11];
					if (geoColumn == null || geoColumn.isEmpty()) {
						System.err.println("Skipping invalid line " + lineNumber + " (geolocation column is empty): " + String.join(";", nextLine));
						continue;
					}

					String[] geolocation = geoColumn.split(",");
					if (geolocation.length == 2) {
						try {
							double latitude = Double.parseDouble(geolocation[0].trim());
							double longitude = Double.parseDouble(geolocation[1].trim());
							vegetalZones.add(new double[]{latitude, longitude});
							System.out.println("Read vegetal zone: " + latitude + ", " + longitude);
						} catch (NumberFormatException e) {
							System.err.println("Invalid number format at line " + lineNumber + ": " + geoColumn);
						}
					} else {
						System.err.println("Invalid geolocation format at line " + lineNumber + ": " + geoColumn);
					}
				}
			}

			return vegetalZones.toArray(new double[0][]);
		}
	}

	public static double haversineDistance(double lat1, double lon1, double lat2, double lon2) {
		// Rayon de la Terre en mètres
		final int R = 6371000; 

		// Conversion des latitudes et longitudes en radians
		double latDistance = Math.toRadians(lat2 - lat1);
		double lonDistance = Math.toRadians(lon2 - lon1);
		double a = Math.sin(latDistance / 2) * Math.sin(latDistance / 2)
				+ Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
				* Math.sin(lonDistance / 2) * Math.sin(lonDistance / 2);
		double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		double distance = R * c; // Distance en mètres
	
		return distance;
	}

	public double computeGlobalDistanceVegetalZone() throws IOException, CsvValidationException {
		double[][] vegetalZones = VegetalZonesExtractor.getVegetalZonesFromCSV("collectionVegetale.csv");
		List<Lamp> lamps = super.getAll();

		double totalDistance = 0;
		int validZonesCount = 0;
		int count = 0;

		for (double[] vegetalZone : vegetalZones) {

			PriorityQueue<Double> nearestDistances = new PriorityQueue<>(Collections.reverseOrder());

			System.out.println(count);
			count++;	
			for (Lamp lamp : lamps) {
				if (lamp == null || lamp.getLongitude() == null || lamp.getLatitude() == null) {
					continue;
				}

				double distance = haversineDistance(lamp.getLatitude(), lamp.getLongitude(), vegetalZone[0], vegetalZone[1]);
				
				if (nearestDistances.size() < 50) {
					nearestDistances.add(distance);
				} else if (distance < nearestDistances.peek()) {
					nearestDistances.poll();
					nearestDistances.add(distance);
				}
			}

			if (!nearestDistances.isEmpty()) {
				double sumDistances = 0;
				for (double dist : nearestDistances) {
					sumDistances += dist;
				}
				double averageDistance = sumDistances / nearestDistances.size();
				totalDistance += averageDistance;
				validZonesCount++;
			} else {
			}
		}

		double meanGlobalDistanceVegetalZone = validZonesCount > 0 ? totalDistance / validZonesCount : 0;

		System.out.println("Total valid zones: " + validZonesCount);
		System.out.println("Total distance: " + totalDistance);
		System.out.println("mean GlobalDistanceVegetalZone: " + meanGlobalDistanceVegetalZone);

		double distanceMin = 30;
		double distanceMax = 300;

		double score = 100 - (((meanGlobalDistanceVegetalZone - distanceMin) / (distanceMax - distanceMin)) * 100);

		return score;
	}


	// public int computeGlobalLightIndicator(List<Lamp> lamps) {

	// for (Lamp lamp : lamps) {
	// 	int intensity = 0;
	// 	int timeOfUse = rand.nextInt(4) + 7; // 7 to 10 hours
	// 	int bulbwithLessConsumption = 0;

	// 	switch (lamp.getBulb().getType()) {
	// 		case LED:
	// 			intensity = LED * timeOfUse; // 7 to 10 hours
	// 			break;
	// 		case HALOGENE:
	// 			intensity = halogene * timeOfUse; // 7 to 10 hours
	// 			break;
	// 		case SODIUM:
	// 			intensity = sodium * timeOfUse; // 7 to 10 hours
	// 			break;
	// 		case NEON:
	// 			intensity = neon * timeOfUse; // 7 to 10 hours
	// 			break;
	// 		case INCANDESCENT:
	// 			intensity = incandescent * timeOfUse; // 7 to 10 hours
	// 			break;
	// 		default:
	// 			break;
	// 	}

	// 	if (intensity < bulbwithLessConsumption) {
	// 		bulbwithLessConsumption = intensity;
	// 	}

	// 	globalIntensity += intensity;

	// meanGlobalComsuption = globalIntensity / lamps.size();

	// for (Lamp lamp : lamps) {
	// 	double distance = 0;
	// 	for (Lamp otherLamp : lamps) {
	// 		if (lamp.getId() != otherLamp.getId()) {
	// 			distance = Math.sqrt(Math.pow(lamp.getLatitude() - otherLamp.getLatitude(), 2)
	// 					+ Math.pow(lamp.getLongitude() - otherLamp.getLongitude(), 2));
	// 		}
	// 		globalDistance += distance;
	// }
	// meanGlobalDistance = globalDistance / lamps.size();


	// for (Lamp lamp : lamps) {
	// 	durabilityScore += lamp.getAge();
	// meanDurabilityScore = durabilityScore / lamps.size();

	// // adaptability score : 0 (nous ne pouvons pas encore le calculer)
	// adaptableScore = 0;	

	// lightIndicator = (meanGlobalComsuption + meanGlobalDistance + meanDurabilityScore + adaptableScore) / 4;

	// }
	// }

	// @Override
	// @Transactional(rollbackFor = { Exception.class })
	// public int recalculateIndicator(List<Lamp> lamps, List<Lamp> lampsToUpdate, int indicator) {
	// 	int indicatorScore = 0;

	// 	switch (indicator) {
	// 		case 1:
	// 			indicatorScore = computeGlobalEnergyConsumption(lampsToUpdate);
	// 			break;
	// 		case 2:
	// 			indicatorScore = computeGlobalDistanceVegetalZone(lampsToUpdate);
	// 			break;
	// 		case 3:
	// 			indicatorScore = computeGlobalLightIndicator(lampsToUpdate);
	// 			break;
	// 		default:
	// 			break;
	// 	}

	// 	return indicatorScore;
	// }
	// }

}
