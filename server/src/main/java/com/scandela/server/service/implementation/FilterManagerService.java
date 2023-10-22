package com.scandela.server.service.implementation;

import org.springframework.stereotype.Service;

import com.scandela.server.dao.implementation.FilterDao;
import com.scandela.server.entity.Filter;
import com.scandela.server.service.AbstractService;
import com.scandela.server.service.IFilterManagerService;

@Service
public class FilterManagerService extends AbstractService<Filter> implements IFilterManagerService {

	protected FilterManagerService(FilterDao filterDao) {
		super(filterDao);
	}
}
