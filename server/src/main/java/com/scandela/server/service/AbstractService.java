package com.scandela.server.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

public abstract class AbstractService<T> implements IService<T> {

	// Attributes \\
		// Protected \\
	protected final Logger logger = LoggerFactory.getLogger(getClass());
	
	protected JpaRepository<T, UUID> dao;
	
	// Constructors \\
	protected AbstractService(JpaRepository<T, UUID> dao) {
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
	public T get(UUID id) {
		return dao.findById(id).orElse(null);
	}

	@Override
	@Transactional(rollbackFor = { Exception.class })
	public T create(T newEntity) throws Exception {
		return dao.save(newEntity);
	}
	
	@Override
	@Transactional(rollbackFor = { Exception.class })
	public T update(UUID id, T update, String... editables) throws Exception {
		Optional<T> entity = dao.findById(id);
		
		if (editables.length > 0) {
			BeanUtils.copyProperties(update, entity.get(), editables);
		} else {
			BeanUtils.copyProperties(update, entity.get(), "id");
		}
		
		return entity.get();
	}

	@Override
	@Transactional(rollbackFor = { Exception.class })
	public void delete(UUID id) {
		dao.deleteById(id);
	}

}
