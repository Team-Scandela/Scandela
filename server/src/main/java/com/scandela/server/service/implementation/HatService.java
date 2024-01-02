package com.scandela.server.service.implementation;

import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.scandela.server.dao.HatDao;
import com.scandela.server.entity.Hat;
import com.scandela.server.exception.HatException;
import com.scandela.server.service.AbstractService;
import com.scandela.server.service.IHatService;

@Service
public class HatService extends AbstractService<Hat> implements IHatService {

	// Attributes \\
		// Private \\
	private final String[] EDITABLES = { "latitude", "longitude" };

	// Constructors \\
	protected HatService(HatDao hatDao) {
		super(hatDao);
	}

	// Methods \\
		// Public \\
	@Override
	@Transactional(rollbackFor = { Exception.class })
	public Hat create(Hat newHat) throws HatException{
		try {
			return dao.save(newHat);
		} catch (Exception e) {
			if (newHat.getQuality() == null || newHat.getReference() == null) {
				throw new HatException(HatException.INCOMPLETE_INFORMATIONS);
			}
			throw e;
		}
	}

	@Override
	@Transactional(rollbackFor = { Exception.class })
    public Hat update(UUID id, Hat update, String... editables) throws Exception {
		try {
			Hat hat = super.update(id, update, EDITABLES);
			
	        return hat;
		} catch (Exception e) {
			throw e;
		}
    }

}
