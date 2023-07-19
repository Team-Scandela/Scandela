package com.scandela.server.dao;

import java.util.List;
import java.util.Optional;

import com.scandela.server.dao.criteria.TownCriteria;
import com.scandela.server.entity.Town;

public interface ITownDao {

	// Methods \\
		// Public \\
	public List<Town> getAll();

	public Optional<Town> get(int id);
	
	public Optional<Town> getByCriteria(TownCriteria criteria);
	
	public Town save(Town town);

	public void delete(Town town);

}
