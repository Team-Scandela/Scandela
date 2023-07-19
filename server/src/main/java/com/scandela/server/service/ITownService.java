package com.scandela.server.service;

import java.util.List;

import com.scandela.server.entity.Town;
import com.scandela.server.entity.dto.TownDto;

public interface ITownService {

	// Methods \\
		// Public \\
	public List<TownDto> getTowns();
	public TownDto getTown(int id);
	public TownDto createTown(Town town);
	public void deleteTown(Town town);

}
