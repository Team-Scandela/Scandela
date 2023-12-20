package com.scandela.server.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.scandela.server.entity.ElectricityPrice;
import com.scandela.server.service.IElectricityPriceService;

@RestController
@RequestMapping(value = "/electricityPrice")
public class EletricityPriceController extends AbstractController {

    @Autowired
	private IElectricityPriceService electricityPriceService;

    @GetMapping
    public List<ElectricityPrice> getElectricityPrice() {
        return electricityPriceService.getAll();
    }
}
