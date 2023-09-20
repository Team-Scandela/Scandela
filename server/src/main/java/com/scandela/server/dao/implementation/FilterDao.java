package com.scandela.server.dao.implementation;

import org.springframework.stereotype.Repository;

import com.scandela.server.dao.AbstractDao;
import com.scandela.server.dao.IFitlerDao;
import com.scandela.server.entity.Filter;

@Repository
public class FilterDao extends AbstractDao<Filter> implements IFitlerDao {
    // Constructors \\
	protected FilterDao() {
		super(Filter.class);
	}
}
