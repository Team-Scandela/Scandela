package com.scandela.server.service.implementation;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.scandela.server.dao.DecisionDao;
import com.scandela.server.dao.DecisionTypeDao;
import com.scandela.server.dao.LampDao;
import com.scandela.server.dao.LampDecisionDao;
import com.scandela.server.entity.Decision;
import com.scandela.server.entity.DecisionType;
import com.scandela.server.entity.Lamp;
import com.scandela.server.entity.LampDecision;
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

	// Constructors \\
	protected DecisionService(DecisionDao decisionDao, DecisionTypeDao decisionTypeDao, LampDecisionDao lampDecisionDao, LampDao lampDao) {
		super(decisionDao);
		this.decisionTypeDao = decisionTypeDao;
		this.lampDecisionDao = lampDecisionDao;
		this.lampDao = lampDao;
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
		
		Page<Lamp> lampsPage = lampDao.findByTypeIsNotAndLampDecisionsContains("LED", "Changer l'ampoule", PageRequest.of(0, 20));
		List<Lamp> lamps = lampsPage.getContent();
		List<Decision> decisions = new ArrayList<>();
		List<LampDecision> lampDecisions = new ArrayList<>();
		
		lamps.forEach(lamp -> {
			Decision decision = Decision.builder()
					.type(decisionType.get())
					.location(lamp.getAddress())
					.description("Ampoule LED moins consommatrice.")
					.solution("Changer l'ampoule \"" + lamp.getLampType() + "\" en ampoule \"LED\".")
					.build();
			LampDecision lampDecision = LampDecision.builder()
					.decision(decision)
					.lamp(lamp)
					.build();
			decision.setLampDecision(lampDecision);
			
			decisions.add(decision);
			lampDecisions.add(lampDecision);
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

		Page<Lamp> lampsPageAllumer = lampDao.findByLightOn2SuperiorAndLampDecisionsContains(sunset, "Allumer le lampdaire", PageRequest.of(0, 20));
		Page<Lamp> lampsPageEteindre = lampDao.findByLightOffInferiorAndLampDecisionsContains(sunrise, "Éteindre le lampdaire", PageRequest.of(0, 20));
		List<Lamp> lampsEteindre = lampsPageEteindre.getContent();
		List<Lamp> lampsAllumer = lampsPageAllumer.getContent();
		List<Decision> decisions = new ArrayList<>();
		List<LampDecision> lampDecisions = new ArrayList<>();

		lampsAllumer.forEach(lamp -> {
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
		});
		
		lampsEteindre.forEach(lamp -> {
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
		});
		
		dao.saveAll(decisions);
		lampDecisionDao.saveAll(lampDecisions);
		
		return decisions;
	}

	@Override
	@Transactional(rollbackFor = { Exception.class })
	public List<Decision> algoRetirerLampadaire() throws Exception {
		Optional<DecisionType> decisionType = decisionTypeDao.findByTitleContains("Retirer lampadaire");
		
		if (decisionType.isEmpty()) {
			throw new DecisionException(DecisionException.DECISIONTYPE_LOADING);
		}
		
		Random rand = new Random();
		long lampCount = lampDao.count();
		int pageNumbers = lampCount > 50 ?  Math.toIntExact(lampCount / 50) + 1 : 1;
		Page<Lamp> lampPage = lampDao.findAll(PageRequest.of(rand.nextInt(pageNumbers), 20));
		List<Lamp> lamps = lampPage.getContent();
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
		
		Random rand = new Random();
		long lampCount = lampDao.count();
		int pageNumbers = lampCount > 50 ?  Math.toIntExact(lampCount / 50) + 1 : 1;
		Page<Lamp> lampPage = lampDao.findAll(PageRequest.of(rand.nextInt(pageNumbers), 20));
		List<Lamp> lamps = lampPage.getContent();
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
		
		Random rand = new Random();
		long lampCount = lampDao.count();
		int pageNumbers = lampCount > 50 ?  Math.toIntExact(lampCount / 50) + 1 : 1;
		Page<Lamp> lampPage = lampDao.findAll(PageRequest.of(rand.nextInt(pageNumbers), 20));
		List<Lamp> lamps = lampPage.getContent();
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
		
		Random rand = new Random();
		long lampCount = lampDao.count();
		int pageNumbers = lampCount > 50 ?  Math.toIntExact(lampCount / 50) + 1 : 1;
		Page<Lamp> lampPage = lampDao.findAll(PageRequest.of(rand.nextInt(pageNumbers), 20));
		List<Lamp> lamps = lampPage.getContent();
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
							.description("Le lampdaire est entouré par " + results.size() + " dans un rayon de " + lamp.getHeight() * 3 + "m.")
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
