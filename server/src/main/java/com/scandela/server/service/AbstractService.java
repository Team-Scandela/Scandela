package com.scandela.server.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

public abstract class AbstractService<T> implements IService<T> {

	// Attributes \\
		// Protected \\
	protected final Logger logger = LoggerFactory.getLogger(getClass());
	
	protected JpaRepository<T, Long> dao;
	
	// Constructors \\
	protected AbstractService(JpaRepository<T, Long> dao) {
		this.dao = dao;
	}
	
	// Methods \\
		// Public \\
	@Override
	@Transactional(readOnly = true)
	public List<T> getAll() {
		return dao.findAll();
	}

	@Override
	@Transactional(readOnly = true)
	public T get(long id) {
		return dao.findById(id).orElse(null);
	}

	@Override
	@Transactional(rollbackFor = { Exception.class })
	public T create(T newEntity) throws Exception {
		return dao.save(newEntity);
	}

	@Override
	@Transactional(rollbackFor = { Exception.class })
	public void delete(T entity) {
		dao.delete(entity);
	}

}
