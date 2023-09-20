package com.scandela.server.service;

import java.util.List;

import com.scandela.server.entity.dto.FilterDto;

public interface IFilterManagerService {
    public List<FilterDto> getFiltersInfo();
    public FilterDto getFilter(int id);
}
