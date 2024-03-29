package com.scandela.server.service;

import java.util.List;
import java.util.UUID;

public interface IService<T> {

	// Methods \\
		// Public \\
	public List<T> getAll();
	public List<T> getAll(Integer pageNumber);
	public T get(UUID id);
	public T create(T entity) throws Exception;
	public T update(UUID id, T update, String... ignoredProperties) throws Exception;
	public void delete(UUID id);
}
