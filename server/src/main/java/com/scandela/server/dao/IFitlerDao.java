package com.scandela.server.dao;

import java.util.List;
import java.util.Optional;

import com.scandela.server.entity.Filter;

public interface IFitlerDao {
    public List<Filter> getAll();

	public Optional<Filter> get(int id);
}
