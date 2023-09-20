package com.scandela.server.service;

import java.util.List;

public interface IService<T> {

	// Methods \\
		// Public \\
	public List<T> getAll();
	public T get(long id);
	public T create(T entity) throws Exception;
	public void delete(long id);
}
