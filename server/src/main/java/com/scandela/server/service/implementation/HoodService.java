package com.scandela.server.service.implementation;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.scandela.server.dao.HoodDao;
import com.scandela.server.entity.Hood;
import com.scandela.server.exception.HoodException;
import com.scandela.server.service.AbstractService;
import com.scandela.server.service.IHoodService;

@Service
public class HoodService extends AbstractService<Hood> implements IHoodService {

	// Constructors \\
	protected HoodService(HoodDao hoodDao) {
		super(hoodDao);
	}

	// Methods \\
		// Public \\
	@Override
	@Transactional(rollbackFor = { Exception.class })
	public Hood create(Hood newHood) throws HoodException {
		try {
			return dao.save(newHood);
		} catch (Exception e) {
			if (newHood.getName() == null || newHood.getTown() == null ||
				newHood.getLatitude() == null || newHood.getLongitude() == null) {
				throw new HoodException(HoodException.INCOMPLETE_INFORMATIONS);
			}
			throw e;
		}
	}

}
