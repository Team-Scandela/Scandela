package com.scandela.server.service.implementation;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import com.scandela.server.dao.IFitlerDao;
import com.scandela.server.entity.Filter;
import com.scandela.server.entity.dto.FilterDto;
import com.scandela.server.service.AbstractService;
import com.scandela.server.service.IFilterManagerService;

public class FilterManagerService extends AbstractService implements IFilterManagerService {


    @Autowired
	private IFitlerDao filterDao;

    @Override
	@Transactional(readOnly = true)
    public List<FilterDto> getFiltersInfo() {
        List<Filter> filters = filterDao.getAll();
		List<FilterDto> filterDtos = new ArrayList<>();

		for (Filter filter : filters) {
			filterDtos.add(FilterDto.from(filter));
		}

		return filterDtos;
    }

    @Override
	@Transactional(readOnly = true)
	public FilterDto getFilter(int id) {
		Optional<Filter> filter = filterDao.get(id);

		if (filter.isEmpty()) {
			return null;
		}

		return FilterDto.from(filter.get());
	}
}
