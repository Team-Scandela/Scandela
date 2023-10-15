package com.scandela.server.service.implementation;

import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.scandela.server.dao.IncidentDao;
import com.scandela.server.dao.LampIncidentDao;
import com.scandela.server.entity.Incident;
import com.scandela.server.entity.LampIncident;
import com.scandela.server.exception.IncidentException;
import com.scandela.server.exception.LampIncidentException;
import com.scandela.server.service.AbstractService;
import com.scandela.server.service.ILampIncidentService;

@Service
public class LampIncidentService extends AbstractService<LampIncident> implements ILampIncidentService {

	// Attributes \\
		// Private \\
//	private LampDao lampDao;TODO quand ce sera implémenté
	private IncidentDao incidentDao;

	// Constructors \\
	protected LampIncidentService(LampIncidentDao lampIncidentDao, IncidentDao incidentDao) {
		super(lampIncidentDao);
		this.incidentDao = incidentDao;
	}

	// Methods \\
		// Public \\
	@Override
	@Transactional(rollbackFor = { Exception.class })
	public LampIncident create(LampIncident newLampIncident) throws LampIncidentException {
		try {
			loadIncident(newLampIncident);

			return dao.save(newLampIncident);
		} catch (Exception e) {
			if (newLampIncident.getIncident() == null) {
				throw new LampIncidentException(LampIncidentException.INCOMPLETE_INFORMATIONS);
			}
			throw e;
		}
	}

		// Private \\
	private void loadIncident(LampIncident newLampIncident) throws LampIncidentException {
		if (newLampIncident.getIncident() == null) {
			throw new LampIncidentException(IncidentException.INCOMPLETE_INFORMATIONS);
		}
	
		long incidentId = newLampIncident.getIncident().getId();
		
		Optional<Incident> incident = incidentDao.findById(incidentId);
		if (incident.isEmpty()) {
			throw new LampIncidentException(LampIncidentException.INCIDENT_LOADING);
		}
	
		newLampIncident.setIncident(incident.orElseGet(() -> { return null; }));
	}

}
