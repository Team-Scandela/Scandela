package com.scandela.server.service.implementation;

import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.scandela.server.dao.IncidentDao;
import com.scandela.server.dao.LampDao;
import com.scandela.server.dao.LampIncidentDao;
import com.scandela.server.entity.Incident;
import com.scandela.server.entity.Lamp;
import com.scandela.server.entity.LampIncident;
import com.scandela.server.exception.LampIncidentException;
import com.scandela.server.service.AbstractService;
import com.scandela.server.service.ILampIncidentService;

@Service
public class LampIncidentService extends AbstractService<LampIncident> implements ILampIncidentService {

	// Attributes \\
		// Private \\
	private final String[] IGNORED_PROPERTIES = { "id", "lamp", "incident" };
	
	private LampDao lampDao;
	private IncidentDao incidentDao;

	// Constructors \\
	protected LampIncidentService(LampIncidentDao lampIncidentDao, IncidentDao incidentDao, LampDao lampDao) {
		super(lampIncidentDao);
		this.incidentDao = incidentDao;
		this.lampDao = lampDao;
	}

	// Methods \\
		// Public \\
	@Override
	@Transactional(rollbackFor = { Exception.class })
	public LampIncident create(LampIncident newLampIncident) throws LampIncidentException {
		try {
			loadLamp(newLampIncident);
			loadIncident(newLampIncident);

			return dao.save(newLampIncident);
		} catch (Exception e) {
			if (newLampIncident.getIncident() == null || newLampIncident.getLamp() == null) {
				throw new LampIncidentException(LampIncidentException.INCOMPLETE_INFORMATIONS);
			}
			throw e;
		}
	}

	@Override
	@Transactional(rollbackFor = { Exception.class })
    public LampIncident update(UUID id, LampIncident update, String... ignoredProperties) throws Exception {
		try {
			LampIncident lampIncident = super.update(id, update, IGNORED_PROPERTIES);
	        
	        return lampIncident;
		} catch (Exception e) {
			throw e;
		}
    }

		// Private \\
	private void loadLamp(LampIncident newLampIncident) throws LampIncidentException {
		if (newLampIncident.getLamp() == null) {
			throw new LampIncidentException(LampIncidentException.INCOMPLETE_INFORMATIONS);
		}
	
		UUID decisionId = newLampIncident.getLamp().getId();
		
		Optional<Lamp> lamp = lampDao.findById(decisionId);
		if (lamp.isEmpty()) {
			throw new LampIncidentException(LampIncidentException.LAMP_LOADING);
		}
	
		newLampIncident.setLamp(lamp.orElseGet(() -> { return null; }));
	}
	
	private void loadIncident(LampIncident newLampIncident) throws LampIncidentException {
		if (newLampIncident.getIncident() == null) {
			throw new LampIncidentException(LampIncidentException.INCOMPLETE_INFORMATIONS);
		}
	
		UUID incidentId = newLampIncident.getIncident().getId();
		
		Optional<Incident> incident = incidentDao.findById(incidentId);
		if (incident.isEmpty()) {
			throw new LampIncidentException(LampIncidentException.INCIDENT_LOADING);
		}
	
		newLampIncident.setIncident(incident.orElseGet(() -> { return null; }));
	}

}
