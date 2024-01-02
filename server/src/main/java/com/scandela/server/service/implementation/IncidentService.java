package com.scandela.server.service.implementation;

import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.scandela.server.dao.IncidentDao;
import com.scandela.server.dao.TownDao;
import com.scandela.server.entity.Incident;
import com.scandela.server.entity.Town;
import com.scandela.server.exception.IncidentException;
import com.scandela.server.service.AbstractService;
import com.scandela.server.service.IIncidentService;

@Service
public class IncidentService extends AbstractService<Incident> implements IIncidentService {

	// Attributes \\
		// Private \\
	private final String[] EDITABLES = { "title", "description", "impactElectricity", "impactEcology", "impactQuality" };
	
	private TownDao townDao;

	// Constructors \\
	protected IncidentService(IncidentDao incidentDao, TownDao townDao) {
		super(incidentDao);
		this.townDao = townDao;
	}

	// Methods \\
		// Public \\
	@Override
	@Transactional(rollbackFor = { Exception.class })
	public Incident create(Incident newIncident) throws IncidentException {
		try {
			loadTown(newIncident);

			return dao.save(newIncident);
		} catch (Exception e) {
			if (newIncident.getTown() == null || newIncident.getTitle() == null ||
				newIncident.getDescription() == null) {
				throw new IncidentException(IncidentException.INCOMPLETE_INFORMATIONS);
			}
			throw e;
		}
	}

	@Override
	@Transactional(rollbackFor = { Exception.class })
    public Incident update(UUID id, Incident update, String... editables) throws Exception {
		try {
			Incident incident = super.update(id, update, EDITABLES);
	        
	        return incident;
		} catch (Exception e) {
			throw e;
		}
    }

		// Private \\
	private void loadTown(Incident newIncident) throws IncidentException {
		if (newIncident.getTown() == null) {
			throw new IncidentException(IncidentException.INCOMPLETE_INFORMATIONS);
		}
	
		UUID townId = newIncident.getTown().getId();
		
		Optional<Town> town = townDao.findById(townId);
		if (town.isEmpty()) {
			throw new IncidentException(IncidentException.TOWN_LOADING);
		}
	
		newIncident.setTown(town.orElseGet(() -> { return null; }));
	}

}
