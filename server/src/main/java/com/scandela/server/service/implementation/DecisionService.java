package com.scandela.server.service.implementation;

import java.time.Instant;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.scandela.server.dao.DecisionDao;
import com.scandela.server.dao.DecisionTypeDao;
import com.scandela.server.dao.LampDao;
import com.scandela.server.dao.LampDecisionDao;
import com.scandela.server.dao.WeatherDao;
import com.scandela.server.entity.Decision;
import com.scandela.server.entity.DecisionType;
import com.scandela.server.entity.Lamp;
import com.scandela.server.entity.LampDecision;
import com.scandela.server.entity.Weather;
import com.scandela.server.exception.DecisionException;
import com.scandela.server.service.AbstractService;
import com.scandela.server.service.IDecisionService;
import com.scandela.server.util.TimeHelper;

@Service
public class DecisionService extends AbstractService<Decision> implements IDecisionService {

	// Attributes \\
		// Private \\
	private final String[] IGNORED_PROPERTIES = { "id", "type" };
	
	private DecisionTypeDao decisionTypeDao;
	private LampDecisionDao lampDecisionDao;
	private LampDao lampDao;
	private WeatherDao weatherDao;

	private RestTemplate restTemplate;

	// Constructors \\
	protected DecisionService(DecisionDao decisionDao, DecisionTypeDao decisionTypeDao, LampDecisionDao lampDecisionDao, LampDao lampDao, WeatherDao weatherDao, RestTemplate restTemplate) {
		super(decisionDao);
		this.decisionTypeDao = decisionTypeDao;
		this.lampDecisionDao = lampDecisionDao;
		this.lampDao = lampDao;
		this.weatherDao = weatherDao;
		
		this.restTemplate = restTemplate;
	}

	// Methods \\
		// Public \\
	@Override
	@Transactional(rollbackFor = { Exception.class })
	public Decision create(Decision newDecision) throws DecisionException{
		try {
			loadDecisionType(newDecision);
			
			return dao.save(newDecision);
		} catch (Exception e) {
			if (newDecision.getType() == null || newDecision.getDescription() == null ||
				newDecision.getLocation() == null || newDecision.getSolution() == null) {
				throw new DecisionException(DecisionException.INCOMPLETE_INFORMATIONS);
			}
			throw e;
		}
	}

	@Override
	@Transactional(rollbackFor = { Exception.class })
    public Decision update(UUID id, Decision update, String... ignoredProperties) throws Exception {
		try {
			Decision decision = super.update(id, update, IGNORED_PROPERTIES);
	        
	        return decision;
		} catch (Exception e) {
			throw e;
		}
    }
	

	@Override
	@Transactional(readOnly = true, rollbackFor = { Exception.class })
	public List<Decision> getAllByDecisionTypes(List<DecisionType> types) {
		if (types == null) {
			return new ArrayList<>();
		}
		
		return ((DecisionDao) dao).findByTypeIn(types);
	}
	
	@Override
	@Transactional(rollbackFor = { Exception.class })
	public List<Decision> algoChangementBulb() throws Exception {
		Optional<DecisionType> decisionType = decisionTypeDao.findByTitleContains("Changement");
		
		if (decisionType.isEmpty()) {
			throw new DecisionException(DecisionException.DECISIONTYPE_LOADING);
		}

		List<Lamp> lampsNotLed = lampDao.findByLampTypeIsNot("LED");
		List<Lamp> lampsTooOld = lampDao.findLampsWithBulbLifetimeGreaterThanOrEqualToEstimated();
		
		List<Decision> decisions = new ArrayList<>();
		List<LampDecision> lampDecisions = new ArrayList<>();
		
		lampsNotLed.forEach(lamp -> {
			if (lamp.getLampDecisions() == null ||
				lamp.getLampDecisions().stream().map(LampDecision::getDecision).filter(decision -> decision.getType().getTitle().contains(decisionType.get().getTitle())).count() == 0) {
				Decision decision = Decision.builder()
						.type(decisionType.get())
						.location(lamp.getAddress())
						.description("Ampoule LED moins consommatrice.")
						.solution("Changer l'ampoule '" + lamp.getLampType() + "' en ampoule 'LED'.")
						.build();
				LampDecision lampDecision = LampDecision.builder()
						.decision(decision)
						.lamp(lamp)
						.build();
				decision.setLampDecision(lampDecision);
				
				decisions.add(decision);
				lampDecisions.add(lampDecision);
			}
		});
		lampsTooOld.forEach(lamp -> {
			if (lamp.getLampDecisions() == null ||
				lamp.getLampDecisions().stream().map(LampDecision::getDecision).filter(decision -> decision.getType().getTitle().contains(decisionType.get().getTitle())).count() == 0) {
				Decision decision = Decision.builder()
						.type(decisionType.get())
						.location(lamp.getAddress())
						.description("Durée de vie de l'ampoule estimée atteinte.")
						.solution("Remplacer l'ampoule '" + lamp.getLampType() + "' du lampadaire '" + lamp.getName() + "'.")
						.build();
				LampDecision lampDecision = LampDecision.builder()
						.decision(decision)
						.lamp(lamp)
						.build();
				decision.setLampDecision(lampDecision);
				
				decisions.add(decision);
				lampDecisions.add(lampDecision);
			}
		});
		
		dao.saveAll(decisions);
		lampDecisionDao.saveAll(lampDecisions);
		
		return decisions;
	}
	
	@Override
	@Transactional(rollbackFor = { Exception.class })
	public List<Decision> algoReductionConsoHoraire() throws Exception {
		Optional<DecisionType> decisionTypeAllumer = decisionTypeDao.findByTitleContains("Allumer lampadaire");
		Optional<DecisionType> decisionTypeEteindre = decisionTypeDao.findByTitleContains("Éteindre lampadaire");
		
		if (decisionTypeAllumer.isEmpty() || decisionTypeEteindre.isEmpty()) {
			throw new DecisionException(DecisionException.DECISIONTYPE_LOADING);
		}
		
		LocalTime sunrise = TimeHelper.getSunriseTime(47.2173, -1.5534);//lighOff1 avec coord de nantes
		LocalTime sunset = TimeHelper.getSunsetTime(47.2173, -1.5534);//LightOn2 avec coord de nantes

		List<Lamp> lampsAllumer = lampDao.findByLightOn2IsNullOrLightOn2After(sunset);
		List<Lamp> lampsEteindre = lampDao.findByLightOffIsNullOrLightOffBefore(sunrise);
		List<Decision> decisions = new ArrayList<>();
		List<LampDecision> lampDecisions = new ArrayList<>();

		lampsAllumer.forEach(lamp -> {
			if (lamp.getLampDecisions() == null ||
				lamp.getLampDecisions().stream().map(LampDecision::getDecision).filter(decision -> decision.getType().getTitle().contains(decisionTypeAllumer.get().getTitle())).count() == 0) {
				Decision decisionAllumer = Decision.builder()
						.type(decisionTypeAllumer.get())
						.location(lamp.getAddress())
						.description("Coucher du soleil à " + sunset.toString())
						.solution("Allumer le lampadaire " + lamp.getName() + " à partir de " + sunset.toString())//TODO changer les solution en comparant les anciennes plages et nouvelles proposées
						.build();
				LampDecision lampDecisionAllumer = LampDecision.builder()
						.decision(decisionAllumer)
						.lamp(lamp)
						.build();
				decisionAllumer.setLampDecision(lampDecisionAllumer);
	
				decisions.add(decisionAllumer);
				lampDecisions.add(lampDecisionAllumer);
			}
		});
		
		lampsEteindre.forEach(lamp -> {
			if (lamp.getLampDecisions() == null ||
				lamp.getLampDecisions().stream().map(LampDecision::getDecision).filter(decision -> decision.getType().getTitle().contains(decisionTypeEteindre.get().getTitle())).count() == 0) {
				Decision decisionEteindre = Decision.builder()
						.type(decisionTypeEteindre.get())
						.location(lamp.getAddress())
						.description("Lever du soleil à " + sunrise.toString())
						.solution("Éteindre le lampadaire " + lamp.getName() + " à partir de " + sunrise.toString())//TODO changer les solution en comparant les anciennes plages et nouvelles proposées
						.build();
				LampDecision lampDecisionEteindre = LampDecision.builder()
						.decision(decisionEteindre)
						.lamp(lamp)
						.build();
				decisionEteindre.setLampDecision(lampDecisionEteindre);
	
				decisions.add(decisionEteindre);
				lampDecisions.add(lampDecisionEteindre);
			}
		});
		
		dao.saveAll(decisions);
		lampDecisionDao.saveAll(lampDecisions);
		
		return decisions;
	}

	@Override
	@Transactional(rollbackFor = { Exception.class })
	public List<Decision> algoReductionConsoHoraireWeather() throws Exception {
		Optional<DecisionType> decisionType = decisionTypeDao.findByTitleContains("Allumer lampadaire");
		
		if (decisionType.isEmpty()) {
			throw new DecisionException(DecisionException.DECISIONTYPE_LOADING);
		}
		
		Optional<Weather> weather = getActualWeather();
		
		if (weather.isEmpty()) {
			throw new DecisionException(DecisionException.GET_WEATHER);
		}

		List<Decision> decisions = new ArrayList<>();
		List<LampDecision> lampDecisions = new ArrayList<>();
		
		if (weather.get().getVis() < 7.5) {// Pourquoi 7.5 ? (7.39 + marge) -> https://link.springer.com/article/10.1007/s11457-023-09385-0
			List<Lamp> lamps = lampDao.findAll();

			lamps.forEach(lamp -> {
				if (lamp.getLampDecisions() == null ||
					lamp.getLampDecisions().stream().map(LampDecision::getDecision).filter(decision -> decision.getDescription().contains("Temps actuel ")).count() == 0) {
					Decision decisionAllumer = Decision.builder()
							.type(decisionType.get())
							.location(lamp.getAddress())
							.description("Temps actuel étant '" + weather.get().getTraductedDescription() + "' avec une visibilité de " + weather.get().getVis() + "km insuffisante.")
							.solution("Allumer le lampadaire " + lamp.getName() + " jusqu'au prochain balayage (2h).")
							.build();
					LampDecision lampDecisionAllumer = LampDecision.builder()
							.decision(decisionAllumer)
							.lamp(lamp)
							.build();
					decisionAllumer.setLampDecision(lampDecisionAllumer);
		
					decisions.add(decisionAllumer);
					lampDecisions.add(lampDecisionAllumer);
				}
			});
			
			dao.saveAll(decisions);
			lampDecisionDao.saveAll(lampDecisions);
		}
		
		return decisions;
	}
	
	private Optional<Weather> getActualWeather() {//TODO changer plus tard par la recup de la ville et utiliser ses lat et long (update celles de nantes)
		double nantesLat = 47.216671;
		double nantesLng = -1.55;
		Optional<Weather> weather = weatherDao.findByLatitudeAndLongitude(nantesLat, nantesLng);
		long actualTimestamp = Instant.now().getEpochSecond();
		
		
		if (weather.isEmpty() || is2hoursAhead(actualTimestamp, weather.get().getTs())) {
	        Weather newWeather = weather.isEmpty() ? Weather.builder().latitude(nantesLat).longitude(nantesLng).build() : weather.get();
	        
	        Map<String, Object> weatherValues = getApiWeather(nantesLat, nantesLng);
	        
	        if (weatherValues == null) {
	        	return Optional.empty();
	        }
	        
	        try {
	        	newWeather.setTs((Long) weatherValues.get("ts"));
	        } catch (Exception e) {
	        	newWeather.setTs(((Integer) weatherValues.get("ts")).longValue());
	        }
	        newWeather.setVis((Integer) weatherValues.get("vis"));
	        newWeather.setDescription((String) weatherValues.get("description"));
	        
	        weatherDao.save(newWeather);
	        weather = Optional.ofNullable(newWeather);
		}
		
		return weather;
	}
	
	private boolean is2hoursAhead(long timestamp1, long timestamp2) {
		long timestamp1Millis = timestamp1 * 1000;
        long timestamp2Millis = timestamp2 * 1000;

        long differenceMillis = timestamp1Millis - timestamp2Millis;

        long twoHoursInMillis = 2 * 60 * 60 * 1000;
        
        if (differenceMillis >= twoHoursInMillis) {
        	((DecisionDao) dao).deleteByDescriptionContaining("Temps actuel ");
        	return true;
        }

        return false;
	}
	
	private Map<String, Object> getApiWeather(double latitude, double longitude) {
		try {
			Map<String, Object> returnValue = new HashMap<>();
			
			String url = "https://api.weatherbit.io/v2.0/current?key=cf98bfa5acf44c73ad4a5d46af813e5b&lat=" + latitude + "&lon=" + longitude;
	        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
	        String json = response.getBody();

	        ObjectMapper mapper = new ObjectMapper();
	        Map<String, Object> map = mapper.readValue(json, new TypeReference<Map<String, Object>>() {});
            Map<String, Object> data = (Map<String, Object>) ((List<Object>) map.get("data")).get(0);
            Map<String, Object> weather = (Map<String, Object>) data.get("weather");
            
            returnValue.put("ts", data.get("ts"));
            returnValue.put("vis", data.get("vis"));
            returnValue.put("description", weather.get("description"));
            
            System.out.println("Call weather api on " + url);
            
            return returnValue;
        } catch (Exception e) {
        }
		
		return null;
	}

	@Override
	@Transactional(rollbackFor = { Exception.class })
	public List<Decision> algoRetirerLampadaire() throws Exception {
		Optional<DecisionType> decisionType = decisionTypeDao.findByTitleContains("Retirer lampadaire");
		
		if (decisionType.isEmpty()) {
			throw new DecisionException(DecisionException.DECISIONTYPE_LOADING);
		}
		
		List<Lamp> lamps = lampDao.findAll();
		List<Decision> decisions = new ArrayList<>();
		List<LampDecision> lampDecisions = new ArrayList<>();
		
		for (Lamp lamp : lamps) {
			if (lamp.getHeight() != null) {
				List<Lamp> results = lampDao.findByLatitudeBetweenAndLongitudeBetween(
						addMetersToLatitude(lamp.getLatitude(), -lamp.getHeight() * 1.5),
						addMetersToLatitude(lamp.getLatitude(), lamp.getHeight() * 1.5),
						addMetersToLongitude(lamp.getLongitude(), lamp.getLatitude(), -lamp.getHeight() * 1.5),
						addMetersToLongitude(lamp.getLongitude(), lamp.getLatitude(), lamp.getHeight() * 1.5));
				
				if (results.size() > 1 && (lamp.getLampDecisions() == null ||
					lamp.getLampDecisions().stream().map(LampDecision::getDecision).filter(decision -> decision.getType().getTitle().contains(decisionType.get().getTitle())).count() == 0)) {
					Decision decision = Decision.builder()
							.type(decisionType.get())
							.location(lamp.getAddress())
							.description("La distance entre les lampadaires n'est pas optimale.")
							.solution("Retirer le lampadaire " + lamp.getName() + " car trop proche des lampadaires " +
									  results.stream().map(Lamp::getName).collect(Collectors.joining(", ")))
							.build();
					LampDecision lampDecision = LampDecision.builder()
							.decision(decision)
							.lamp(lamp)
							.build();
					decision.setLampDecision(lampDecision);
	
					decisions.add(decision);
					lampDecisions.add(lampDecision);
				}
			}
		}
		
		dao.saveAll(decisions);
		lampDecisionDao.saveAll(lampDecisions);
		
		return decisions;
	}

	@Override
	@Transactional(rollbackFor = { Exception.class })
	public List<Decision> algoAjouterLampadaire() throws Exception {
		Optional<DecisionType> decisionType = decisionTypeDao.findByTitleContains("Ajouter lampadaire");
		
		if (decisionType.isEmpty()) {
			throw new DecisionException(DecisionException.DECISIONTYPE_LOADING);
		}
		
		List<Lamp> lamps = lampDao.findAll();
		List<Decision> decisions = new ArrayList<>();
		List<LampDecision> lampDecisions = new ArrayList<>();
		
		for (Lamp lamp : lamps) {
			if (lamp.getHeight() != null) {
				List<Lamp> results = lampDao.findByLatitudeBetweenAndLongitudeBetween(
						addMetersToLatitude(lamp.getLatitude(), -lamp.getHeight() * 3),
						addMetersToLatitude(lamp.getLatitude(), lamp.getHeight() * 3),
						addMetersToLongitude(lamp.getLongitude(), lamp.getLatitude(), -lamp.getHeight() * 3),
						addMetersToLongitude(lamp.getLongitude(), lamp.getLatitude(), lamp.getHeight() * 3));
				
				if (results.size() < 2 && (lamp.getLampDecisions() == null ||
					lamp.getLampDecisions().stream().map(LampDecision::getDecision).filter(decision -> decision.getType().getTitle().contains(decisionType.get().getTitle())).count() == 0)) {
					Decision decision = Decision.builder()
							.type(decisionType.get())
							.location(lamp.getAddress())
							.description("La distance entre 2 lampadaire n'est pas respectée.")
							.solution("Ajouter un lampadaire dans le rayon: " +
									  "LatMin: " + String.format("%.3f", addMetersToLatitude(lamp.getLatitude(), -lamp.getHeight() * 3)) +
									  " ; LatMax: " + String.format("%.3f", addMetersToLatitude(lamp.getLatitude(), lamp.getHeight() * 3)) + " ; " +
									  "LongMin: " + String.format("%.3f", addMetersToLongitude(lamp.getLongitude(), lamp.getLatitude(), -lamp.getHeight() * 3)) +
									  " ; LongMax: " + String.format("%.3f", addMetersToLongitude(lamp.getLongitude(), lamp.getLatitude(), lamp.getHeight() * 3)))
							.build();
					LampDecision lampDecision = LampDecision.builder()
							.decision(decision)
							.lamp(lamp)
							.build();
					decision.setLampDecision(lampDecision);
	
					decisions.add(decision);
					lampDecisions.add(lampDecision);
				}
			}
		}
		
		dao.saveAll(decisions);
		lampDecisionDao.saveAll(lampDecisions);
		
		return decisions;
	}

	@Override
	@Transactional(rollbackFor = { Exception.class })
	public List<Decision> algoReduireIntensiteLampadaire() throws Exception {
		Optional<DecisionType> decisionType = decisionTypeDao.findByTitleContains("Réduire intensité lampadaire");
		
		if (decisionType.isEmpty()) {
			throw new DecisionException(DecisionException.DECISIONTYPE_LOADING);
		}
		
		List<Lamp> lamps = lampDao.findAll();
		List<Decision> decisions = new ArrayList<>();
		List<LampDecision> lampDecisions = new ArrayList<>();
		
		for (Lamp lamp : lamps) {
			if (lamp.getHeight() != null) {
				List<Lamp> results = lampDao.findByLatitudeBetweenAndLongitudeBetween(
						addMetersToLatitude(lamp.getLatitude(), -lamp.getHeight() * 2.5),
						addMetersToLatitude(lamp.getLatitude(), lamp.getHeight() * 2.5),
						addMetersToLongitude(lamp.getLongitude(), lamp.getLatitude(), -lamp.getHeight() * 2.5),
						addMetersToLongitude(lamp.getLongitude(), lamp.getLatitude(), lamp.getHeight() * 2.5));
				
				if (!results.isEmpty() && (lamp.getLampDecisions() == null ||
					lamp.getLampDecisions().stream().map(LampDecision::getDecision).filter(decision -> decision.getType().getTitle().contains(decisionType.get().getTitle())).count() == 0)) {
					Decision decision = Decision.builder()
							.type(decisionType.get())
							.location(lamp.getAddress())
							.description("Le lampdaire est entouré par " + results.size() + " lampadaire(s) dans un rayon de " + lamp.getHeight() * 2.5 + "m.")
							.solution("Réduire l'intensité du lampadaire de " + (results.size() > 4 ? 20 : 5 * results.size()) + "% afin d'économiser de l'énergie.")
							.build();
					LampDecision lampDecision = LampDecision.builder()
							.decision(decision)
							.lamp(lamp)
							.build();
					decision.setLampDecision(lampDecision);
	
					decisions.add(decision);
					lampDecisions.add(lampDecision);
				}
			}
		}
		
		dao.saveAll(decisions);
		lampDecisionDao.saveAll(lampDecisions);
		
		return decisions;
	}

	@Override
	@Transactional(rollbackFor = { Exception.class })
	public List<Decision> algoAugmenterIntensiteLampadaire() throws Exception {
		Optional<DecisionType> decisionType = decisionTypeDao.findByTitleContains("Augmenter intensité lampadaire");
		
		if (decisionType.isEmpty()) {
			throw new DecisionException(DecisionException.DECISIONTYPE_LOADING);
		}
		
		List<Lamp> lamps = lampDao.findAll();
		List<Decision> decisions = new ArrayList<>();
		List<LampDecision> lampDecisions = new ArrayList<>();
		
		for (Lamp lamp : lamps) {
			if (lamp.getHeight() != null) {
				List<Lamp> results = lampDao.findByLatitudeBetweenAndLongitudeBetween(
						addMetersToLatitude(lamp.getLatitude(), -lamp.getHeight() * 3),
						addMetersToLatitude(lamp.getLatitude(), lamp.getHeight() * 3),
						addMetersToLongitude(lamp.getLongitude(), lamp.getLatitude(), -lamp.getHeight() * 3),
						addMetersToLongitude(lamp.getLongitude(), lamp.getLatitude(), lamp.getHeight() * 3));
				
				if (results.size() < 4 && (lamp.getLampDecisions() == null ||
					lamp.getLampDecisions().stream().map(LampDecision::getDecision).filter(decision -> decision.getType().getTitle().contains(decisionType.get().getTitle())).count() == 0)) {
					Decision decision = Decision.builder()
							.type(decisionType.get())
							.location(lamp.getAddress())
							.description("Le lampdaire est entouré par " + results.size() + " lampadaire(s) dans un rayon de " + lamp.getHeight() * 3 + "m.")
							.solution("Augmenter l'intensité du lampadaire de " + (5 * (4 - results.size())) + "% afin d'assurer la sécurité.")
							.build();
					LampDecision lampDecision = LampDecision.builder()
							.decision(decision)
							.lamp(lamp)
							.build();
					decision.setLampDecision(lampDecision);
	
					decisions.add(decision);
					lampDecisions.add(lampDecision);
				}
			}
		}
		
		dao.saveAll(decisions);
		lampDecisionDao.saveAll(lampDecisions);
		
		return decisions;
	}

	@Override
	@Transactional(rollbackFor = { Exception.class })
	public void deleteAllByDescriptionContaining(String description) {
		((DecisionDao) dao).deleteByDescriptionContaining(description);
	}
	
	@Override
	@Transactional(readOnly = true, rollbackFor = { Exception.class })
	public String getState(UUID idDecision) throws Exception {
		Optional<Decision> decision = dao.findById(idDecision);
		
		if (decision.isEmpty()) {
			throw new DecisionException(DecisionException.DECISION_LOADING);
		}
		
		return decision.get().getState();
	}

	@Override
	@Transactional(rollbackFor = { Exception.class })
	public void deleteAllBySolutionContaining(String solution) {
		((DecisionDao) dao).deleteBySolutionContaining(solution);
	}
	
	@Override
	@Transactional(rollbackFor = { Exception.class })
	public void setState(UUID idDecision, String state) throws Exception {
		Optional<Decision> decision = dao.findById(idDecision);
		
		if (decision.isEmpty()) {
			throw new DecisionException(DecisionException.DECISION_LOADING);
		}
		
		decision.get().setState(state);
	}

		// Private \\
	private void loadDecisionType(Decision newDecision) throws DecisionException {
		if (newDecision.getType() == null) {
			throw new DecisionException(DecisionException.INCOMPLETE_INFORMATIONS);
		}
	
		UUID typeId = newDecision.getType().getId();
		
		Optional<DecisionType> type = decisionTypeDao.findById(typeId);
		if (type.isEmpty()) {
			throw new DecisionException(DecisionException.DECISIONTYPE_LOADING);
		}
	
		newDecision.setType(type.orElseGet(() -> { return null; }));
	}
	
	private double addMetersToLongitude(double longitude, double latitude, double meters) {
		double radiusAtLatitude = 6371e3 * Math.cos(Math.toRadians(latitude));
        double delta = meters / radiusAtLatitude;

        delta = Math.toDegrees(delta);

        return longitude + delta;
	}
	
	private double addMetersToLatitude(double latitude, double meters) {
		double delta = meters / 6371e3;

        delta = Math.toDegrees(delta);

        return latitude + delta;
	}

}
