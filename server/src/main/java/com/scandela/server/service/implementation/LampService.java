package com.scandela.server.service.implementation;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.util.Pair;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

}
