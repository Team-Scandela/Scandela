package com.scandela.server.service.implementation;

import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.scandela.server.dao.HoodDao;
import com.scandela.server.dao.StreetDao;
import com.scandela.server.entity.Hood;
import com.scandela.server.entity.Street;
import com.scandela.server.exception.StreetException;
import com.scandela.server.service.AbstractService;
import com.scandela.server.service.IStreetService;

@Service
public class StreetService extends AbstractService<Street> implements IStreetService {

	// Attributes \\
		// Private \\
	private final String[] IGNORED_PROPERTIES = { "id", "hood", "lamps" };
	
	private HoodDao hoodDao;

	// Constructors \\
	protected StreetService(StreetDao streetDao, HoodDao hoodDao) {
		super(streetDao);
		this.hoodDao = hoodDao;
	}

	// Methods \\
		// Public \\
	@Override
	@Transactional(rollbackFor = { Exception.class })
	public Street create(Street newStreet) throws StreetException {
		try {
			loadHood(newStreet);
			
			return dao.save(newStreet);
		} catch (Exception e) {
			if (newStreet.getHood() == null || newStreet.getAddress() == null) {
				throw new StreetException(StreetException.INCOMPLETE_INFORMATIONS);
			}
			throw e;
		}
	}

	@Override
	@Transactional(rollbackFor = { Exception.class })
    public Street update(UUID id, Street update, String... ignoredProperties) throws Exception {
		try {
			Street street = super.update(id, update, IGNORED_PROPERTIES);
	        
	        return street;
		} catch (Exception e) {
			throw e;
		}
    }

		// Private \\
	private void loadHood(Street newStreet) throws StreetException {
		if (newStreet.getHood() == null) {
			throw new StreetException(StreetException.INCOMPLETE_INFORMATIONS);
		}

		UUID hoodId = newStreet.getHood().getId();
		
		Optional<Hood> hood = hoodDao.findById(hoodId);
		if (hood.isEmpty()) {
			throw new StreetException(StreetException.HOOD_LOADING);
		}

		newStreet.setHood(hood.orElseGet(() -> { return null; }));
	}
	
}
