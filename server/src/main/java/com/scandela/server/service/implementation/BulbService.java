package com.scandela.server.service.implementation;

import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.scandela.server.dao.BulbDao;
import com.scandela.server.entity.Bulb;
import com.scandela.server.exception.BulbException;
import com.scandela.server.service.AbstractService;
import com.scandela.server.service.IBulbService;

@Service
public class BulbService extends AbstractService<Bulb> implements IBulbService {

	// Attributes \\
		// Private \\
	private final String[] EDITABLES = { "intensity", "consommation", "reference" };

	// Constructors \\
	protected BulbService(BulbDao bulbDao) {
		super(bulbDao);
	}

	// Methods \\
		// Public \\
	@Override
	@Transactional(rollbackFor = { Exception.class })
	public Bulb create(Bulb newBulb) throws BulbException{
		try {
			return dao.save(newBulb);
		} catch (Exception e) {
			if (newBulb.getConsommation() == null || newBulb.getIntensity() == null ||
				newBulb.getReference() == null) {
				throw new BulbException(BulbException.INCOMPLETE_INFORMATIONS);
			}
			throw e;
		}
	}

	@Override
	@Transactional(rollbackFor = { Exception.class })
    public Bulb update(UUID id, Bulb update, String... editables) throws Exception {
		try {
			Bulb bulb = super.update(id, update, EDITABLES);
			
	        return bulb;
		} catch (Exception e) {
			throw e;
		}
    }

}
