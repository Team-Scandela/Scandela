package com.scandela.server.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.scandela.server.entity.Filter;
import com.scandela.server.service.IFilterManagerService;

@RestController
@RequestMapping(value = "/filtermanager")
public class FilterManagerController {

    @Autowired
    private IFilterManagerService filterManagerService;


    @GetMapping
    public List<Filter> getFiltersInfo() {
        return filterManagerService.getAll();
    }
}
