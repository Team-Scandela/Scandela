package com.scandela.server.service.implementation;

import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.scandela.server.dao.LampDao;
import com.scandela.server.dao.StreetDao;
import com.scandela.server.dao.TownDao;
import com.scandela.server.entity.Lamp;
import com.scandela.server.entity.Street;
import com.scandela.server.entity.Town;
import com.scandela.server.exception.LampException;
import com.scandela.server.service.AbstractService;
import com.scandela.server.service.ILampService;

@Service
public class LampService extends AbstractService<Lamp> implements ILampService {

	// Attributes \\
		// Private \\
	private TownDao townDao;
	private StreetDao streetDao;

	// Constructors \\
	protected LampService(LampDao lampDao, TownDao townDao, StreetDao streetDao) {
		super(lampDao);
		this.townDao = townDao;
		this.streetDao = streetDao;
	}

	// Methods \\
		// Public \\
	@Override
	@Transactional(rollbackFor = { Exception.class })
	public Lamp create(Lamp newLamp) throws LampException{
		try {
			loadTown(newLamp);
			loadStreet(newLamp);
			
			return dao.save(newLamp);
		} catch (Exception e) {
			if (newLamp.getTown() == null || newLamp.getStreet() == null ||
				newLamp.getLatitude() == null || newLamp.getLongitude() == null ||
				newLamp.getLightOff() == null || newLamp.getLightOn() == null ||
				newLamp.getHeight() == null) {
				throw new LampException(LampException.INCOMPLETE_INFORMATIONS);
			}
			throw e;
		}
	}

		// Private \\
	private void loadTown(Lamp newLamp) throws LampException {
		if (newLamp.getTown() == null) {
			throw new LampException(LampException.INCOMPLETE_INFORMATIONS);
		}
	
		UUID typeId = newLamp.getTown().getId();
		
		Optional<Town> type = townDao.findById(typeId);
		if (type.isEmpty()) {
			throw new LampException(LampException.TOWN_LOADING);
		}
	
		newLamp.setTown(type.orElseGet(() -> { return null; }));
	}
	
	private void loadStreet(Lamp newLamp) throws LampException {
		if (newLamp.getStreet() == null) {
			throw new LampException(LampException.INCOMPLETE_INFORMATIONS);
		}
	
		UUID userId = newLamp.getStreet().getId();
		
		Optional<Street> user = streetDao.findById(userId);
		if (user.isEmpty()) {
			throw new LampException(LampException.STREET_LOADING);
		}
	
		newLamp.setStreet(user.orElseGet(() -> { return null; }));
	}

}
