package com.scandela.server.service.implementation;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.scandela.server.dao.ITownDao;
import com.scandela.server.dao.criteria.TownCriteria;
import com.scandela.server.entity.Town;
import com.scandela.server.entity.dto.TownDto;
import com.scandela.server.service.AbstractService;
import com.scandela.server.service.ITownService;

@Service
public class TownService extends AbstractService implements ITownService {

	// Attributes \\
		// Private \\
	@Autowired
	private ITownDao townDao;

	// Methods \\
		// Public \\
	@Override
	@Transactional(readOnly = true)
	public List<TownDto> getTowns() {
		List<Town> towns = townDao.getAll();
		List<TownDto> townDtos = new ArrayList<>();

		for (Town town : towns) {
			townDtos.add(TownDto.from(town));
		}

		return townDtos;
	}

	@Override
	@Transactional(readOnly = true)
	public TownDto getTown(int id) {
		Optional<Town> town = townDao.get(id);

		if (town.isEmpty()) {
			return null;
		}

		return TownDto.from(town.get());
	}

	@Override
	@Transactional(rollbackFor = { Exception.class })
	public TownDto createTown(Town newTown) {
		if (newTown.getName() == null) {
			return null;// throw pour différencier?
		}
		if (townDao.getByCriteria(TownCriteria.builder().name(newTown.getName()).build()).isPresent()) {
			return null;// throw pour différencier?
		}

		return TownDto.from(townDao.save(newTown));
	}

	@Override
	@Transactional(rollbackFor = { Exception.class })
	public void deleteTown(Town town) {
		townDao.delete(town);
	}

}
