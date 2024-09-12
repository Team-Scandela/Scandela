package com.scandela.server.service.implementation;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.scandela.server.dao.LampDao;
import com.scandela.server.dao.LampReparationDao;
import com.scandela.server.entity.Lamp;
import com.scandela.server.entity.LampReparation;
import com.scandela.server.exception.LampReparationException;
import com.scandela.server.service.AbstractService;
import com.scandela.server.service.ILampReparationService;

@Service
public class LampReparationService extends AbstractService<LampReparation> implements ILampReparationService {

	// Attributes \\
		// Private \\
	private final String[] IGNORED_PROPERTIES = { "id", "lamp", "incident" };
	
	private LampDao lampDao;

	// Constructors \\
	protected LampReparationService(LampReparationDao lampReparationDao, LampDao lampDao) {
		super(lampReparationDao);
		this.lampDao = lampDao;
	}

	// Methods \\
		// Public \\
	@Override
	@Transactional(rollbackFor = { Exception.class })
	public LampReparation create(LampReparation newLampReparation) throws LampReparationException {
		try {
			loadLamp(newLampReparation);
			
			newLampReparation.setDateCreated(LocalDateTime.now());

			return dao.save(newLampReparation);
		} catch (Exception e) {
			if (newLampReparation.getTitle() == null || newLampReparation.getDescription() == null ||
				newLampReparation.getLamp() == null) {
				throw new LampReparationException(LampReparationException.INCOMPLETE_INFORMATIONS);
			}
			throw e;
		}
	}

	@Override
	@Transactional(rollbackFor = { Exception.class })
    public LampReparation update(UUID id, LampReparation update, String... ignoredProperties) throws Exception {
		try {
			LampReparation lampReparation = super.update(id, update, IGNORED_PROPERTIES);
	        
	        return lampReparation;
		} catch (Exception e) {
			throw e;
		}
    }
	
	@Override
	@Transactional(rollbackFor = { Exception.class })
	public LampReparation addComment(UUID id, String comment) throws Exception {
		Optional<LampReparation> lampReparation = dao.findById(id);
		
		if (lampReparation.isEmpty()) {
			throw new LampReparationException(LampReparationException.ID_NOT_VALID);
		}
		
		lampReparation.get().getComments().add(comment);
		
		return lampReparation.get();
	}
	
	@Override
	@Transactional(rollbackFor = { Exception.class })
	public LampReparation finish(UUID id, int duration) throws Exception {
		Optional<LampReparation> lampReparation = dao.findById(id);
		
		if (lampReparation.isEmpty()) {
			throw new LampReparationException(LampReparationException.ID_NOT_VALID);
		}
		
		lampReparation.get().setDateFinished(LocalDateTime.now());
		lampReparation.get().setDuration(duration);
		
		return lampReparation.get();
	}

		// Private \\
	private void loadLamp(LampReparation newLampReparation) throws LampReparationException {
		if (newLampReparation.getLamp() == null) {
			throw new LampReparationException(LampReparationException.INCOMPLETE_INFORMATIONS);
		}
	
		UUID decisionId = newLampReparation.getLamp().getId();
		
		Optional<Lamp> lamp = lampDao.findById(decisionId);
		if (lamp.isEmpty()) {
			throw new LampReparationException(LampReparationException.LAMP_LOADING);
		}
	
		newLampReparation.setLamp(lamp.orElseGet(() -> { return null; }));
	}

}
