package com.scandela.server.service.implementation;

import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.scandela.server.dao.BulbDao;
import com.scandela.server.dao.LampDao;
import com.scandela.server.dao.StreetDao;
import com.scandela.server.dao.TownDao;
import com.scandela.server.dao.WhileAwayDao;
import com.scandela.server.entity.Bulb;
import com.scandela.server.entity.Lamp;
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
	private final String[] EDITABLES = { "name", "address", "latitude", "longitude",
										  "lightOn", "lightOff", "height", "moreInformations",
										  "recommandedOptimisations", "lampType", "foyerType" };
	private TownDao townDao;
	private StreetDao streetDao;
	private BulbDao bulbDao;
    private WhileAwayDao whileAwayDao;

	// Constructors \\
	protected LampService(LampDao lampDao, TownDao townDao, StreetDao streetDao, BulbDao bulbDao, WhileAwayDao whileAwayDao) {
		super(lampDao);
		this.townDao = townDao;
		this.streetDao = streetDao;
		this.bulbDao = bulbDao;
		this.whileAwayDao = whileAwayDao;
	}

	// Methods \\
		// Public \\
	@Override
	@Transactional(rollbackFor = { Exception.class })
	public Lamp create(Lamp newLamp) throws LampException {
		try {
			loadTown(newLamp);
			loadStreet(newLamp);
			loadBulb(newLamp);
			
			return dao.save(newLamp);
		} catch (Exception e) {
			if (newLamp.getTown() == null || newLamp.getStreet() == null ||
				newLamp.getLatitude() == null || newLamp.getLongitude() == null ||
				newLamp.getLightOff() == null || newLamp.getLightOn() == null ||
				newLamp.getHeight() == null || newLamp.getBulb() == null) {
				throw new LampException(LampException.INCOMPLETE_INFORMATIONS);
			}
			throw e;
		}
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
    public Lamp update(UUID id, Lamp update, String... editables) throws Exception {
		try {
			Lamp lamp = super.update(id, update, EDITABLES);

	        WhileAway whileAway = new WhileAway();

	        whileAway.setId(lamp.getId());
	        whileAway.setUpdatedData(update.toString());
	        whileAwayDao.save(whileAway);
	        
	        return lamp;
		} catch (Exception e) {
			throw e;
		}
    }

		// Private \\
	private void loadTown(Lamp newLamp) throws LampException {
		if (newLamp.getTown() == null) {
			throw new LampException(LampException.INCOMPLETE_INFORMATIONS);
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
			throw new LampException(LampException.INCOMPLETE_INFORMATIONS);
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
			throw new LampException(LampException.INCOMPLETE_INFORMATIONS);
		}
	
		UUID bulbId = newLamp.getBulb().getId();
		
		Optional<Bulb> bulb = bulbDao.findById(bulbId);
		if (bulb.isEmpty()) {
			throw new LampException(LampException.BULB_LOADING);
		}
	
		newLamp.setBulb(bulb.orElseGet(() -> { return null; }));
	}

}
