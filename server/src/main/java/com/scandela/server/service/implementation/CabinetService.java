package com.scandela.server.service.implementation;

import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.scandela.server.dao.CabinetDao;
import com.scandela.server.entity.Cabinet;
import com.scandela.server.exception.CabinetException;
import com.scandela.server.service.AbstractService;
import com.scandela.server.service.ICabinetService;

@Service
public class CabinetService extends AbstractService<Cabinet> implements ICabinetService {

	// Attributes \\
		// Private \\
	private final String[] IGNORED_PROPERTIES = { "id", "lamps" };

	// Constructors \\
	protected CabinetService(CabinetDao cabinetDao) {
		super(cabinetDao);
	}

	// Methods \\
		// Public \\
	@Override
	@Transactional(rollbackFor = { Exception.class })
	public Cabinet create(Cabinet newCabinet) throws CabinetException{
		try {
			return dao.save(newCabinet);
		} catch (Exception e) {
			if (newCabinet.getLatitude() == null || newCabinet.getLongitude() == null ||
				newCabinet.getReference() == null) {
				throw new CabinetException(CabinetException.INCOMPLETE_INFORMATIONS);
			}
			throw e;
		}
	}

	@Override
	@Transactional(rollbackFor = { Exception.class })
    public Cabinet update(UUID id, Cabinet update, String... ignoredProperties) throws Exception {
		try {
			Cabinet cabinet = super.update(id, update, IGNORED_PROPERTIES);
			
	        return cabinet;
		} catch (Exception e) {
			throw e;
		}
    }

}
