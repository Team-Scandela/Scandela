package com.scandela.server.dao.implementation;

import java.util.Optional;

import org.springframework.stereotype.Repository;

import com.scandela.server.dao.AbstractDao;
import com.scandela.server.dao.ITownDao;
import com.scandela.server.dao.criteria.TownCriteria;
import com.scandela.server.entity.Town;

import jakarta.persistence.TypedQuery;

@Repository
public class TownDao extends AbstractDao<Town> implements ITownDao {
	
	// Constructors \\
	protected TownDao() {
		super(Town.class);
	}

	// Methods \\
		// Public \\
	@Override
	public Optional<Town> getByCriteria(TownCriteria criteria) {
		Optional<Town> town = Optional.empty();
		String req = "SELECT t FROM Town t";

		if (criteria.getName().isPresent()) {
			req += " WHERE t.name = :name";
		}
		
		TypedQuery<Town> query = entityManager.createQuery(req, Town.class);

		if (criteria.getName().isPresent()) {
			query.setParameter("name", criteria.getName().get());
		}

		try {
			town = Optional.ofNullable(query.getSingleResult());
		} catch (Exception e) {}

		return town;
	}

}
