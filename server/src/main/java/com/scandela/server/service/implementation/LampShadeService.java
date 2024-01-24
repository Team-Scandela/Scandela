package com.scandela.server.service.implementation;

import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.scandela.server.dao.LampShadeDao;
import com.scandela.server.entity.LampShade;
import com.scandela.server.exception.LampShadeException;
import com.scandela.server.service.AbstractService;
import com.scandela.server.service.ILampShadeService;

@Service
public class LampShadeService extends AbstractService<LampShade> implements ILampShadeService {

	// Attributes \\
		// Private \\
	private final String[] IGNORED_PROPERTIES = { "id", "lamps" };

	// Constructors \\
	protected LampShadeService(LampShadeDao hatDao) {
		super(hatDao);
	}

	// Methods \\
		// Public \\
	@Override
	@Transactional(rollbackFor = { Exception.class })
	public LampShade create(LampShade newHat) throws LampShadeException{
		try {
			return dao.save(newHat);
		} catch (Exception e) {
			if (newHat.getQuality() == null || newHat.getReference() == null) {
				throw new LampShadeException(LampShadeException.INCOMPLETE_INFORMATIONS);
			}
			throw e;
		}
	}

	@Override
	@Transactional(rollbackFor = { Exception.class })
    public LampShade update(UUID id, LampShade update, String... ignoredProperties) throws Exception {
		try {
			LampShade lampShade = super.update(id, update, IGNORED_PROPERTIES);
			
	        return lampShade;
		} catch (Exception e) {
			throw e;
		}
    }

}
