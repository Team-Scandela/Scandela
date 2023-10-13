package com.scandela.server.service.implementation;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.scandela.server.dao.TownDao;
import com.scandela.server.entity.Town;
import com.scandela.server.exception.TownException;
import com.scandela.server.service.AbstractService;
import com.scandela.server.service.ITownService;

@Service
public class TownService extends AbstractService<Town> implements ITownService {

	// Constructors \\
	protected TownService(TownDao townDao) {
		super(townDao);
	}

	// Methods \\
		// Public \\
	@Override
	@Transactional(rollbackFor = { Exception.class })
	public Town create(Town newTown) throws TownException{
		try {
			return dao.save(newTown);
		} catch (Exception e) {
			if (newTown.getName() == null || newTown.getLatitude() == null ||
				newTown.getLongitude() == null || newTown.getElectricityPrice() == null ||
				newTown.getIndiceElectricity() == null || newTown.getIndiceEcology() == null ||
				newTown.getIndiceQuality() == null) {
				throw new TownException(TownException.INCOMPLETE_INFORMATIONS);
			}
			throw e;
		}
	}

}
