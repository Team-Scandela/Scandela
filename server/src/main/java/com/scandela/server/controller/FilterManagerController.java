package com.scandela.server.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.scandela.server.entity.dto.FilterDto;
import com.scandela.server.service.IFilterManagerService;

@RestController
@RequestMapping(value = "/filtermanager")
public class FilterManagerController extends AbstractController {

    @Autowired
    private IFilterManagerService filterManagerService;


    @GetMapping
    public ResponseEntity<List<FilterDto>> getFiltersInfo() {
        return ResponseEntity.ok(filterManagerService.getFiltersInfo());
    }
}
