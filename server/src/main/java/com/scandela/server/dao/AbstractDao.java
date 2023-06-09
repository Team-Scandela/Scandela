package com.scandela.server.dao;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;

public abstract class AbstractDao<T> {

	// Attributes \\
		// Protected \\
	protected final Logger logger = LoggerFactory.getLogger(getClass());

	@PersistenceContext
	protected EntityManager entityManager;

		// Private \\
	private Class<T> clazz;

	// Constructors \\
	protected AbstractDao(Class<T> clazz) {
		this.clazz = clazz;
	}

	// Methods \\
		// Public \\
	public Optional<T> get(int id) {
		return Optional.ofNullable(entityManager.find(clazz, id));
	}

	public List<T> getAll() {
		CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
		CriteriaQuery<T> query = criteriaBuilder.createQuery(clazz);
		Root<T> c = query.from(clazz);

		List<T> entities = entityManager.createQuery(query).getResultList();

		return entities == null ? new ArrayList<>() : entities;
	}

	public T save(T entity) {
		entityManager.persist(entity);
		return entity;
	}

	public void delete(T entity) {
		entityManager.remove(entityManager.contains(entity) ? entity : entityManager.merge(entity));
	}

}
