package com.scandela.server.service.implementation;

import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.scandela.server.dao.HoodDao;
import com.scandela.server.dao.TownDao;
import com.scandela.server.entity.Hood;
import com.scandela.server.entity.Town;
import com.scandela.server.exception.HoodException;
import com.scandela.server.service.AbstractService;
import com.scandela.server.service.IHoodService;

@Service
public class HoodService extends AbstractService<Hood> implements IHoodService {

	// Attributes \\
		// Private \\
	private TownDao townDao;

	// Constructors \\
	protected HoodService(HoodDao hoodDao, TownDao townDao) {
		super(hoodDao);
		this.townDao = townDao;
	}

	// Methods \\
		// Public \\
	@Override
	@Transactional(rollbackFor = { Exception.class })
	public Hood create(Hood newHood) throws HoodException {
		try {
			loadTown(newHood);

			return dao.save(newHood);
		} catch (Exception e) {
			if (newHood.getName() == null || newHood.getTown() == null ||
				newHood.getLatitude() == null || newHood.getLongitude() == null) {
				throw new HoodException(HoodException.INCOMPLETE_INFORMATIONS);
			}
			throw e;
		}
	}

		// Private \\
	private void loadTown(Hood newHood) throws HoodException {
		if (newHood.getTown() == null) {
			throw new HoodException(HoodException.INCOMPLETE_INFORMATIONS);
		}
	
		UUID townId = newHood.getTown().getId();
		
		Optional<Town> town = townDao.findById(townId);
		if (town.isEmpty()) {
			throw new HoodException(HoodException.TOWN_LOADING);
		}
	
		newHood.setTown(town.orElseGet(() -> { return null; }));
	}

}
