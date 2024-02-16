package com.scandela.server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.scandela.server.entity.ElectricityPrice;
import com.scandela.server.service.IElectricityPriceService;

@RestController
@RequestMapping(value = "/electricityPrice")
public class EletricityPriceController {

    @Autowired
	private IElectricityPriceService electricityPriceService;

    @GetMapping
    public ElectricityPrice getCurrentElectricityPrice() {
        String accessToken = electricityPriceService.getoAuth2AccessToken();

        return electricityPriceService.getLastElectricityPrice(accessToken);
    }
}
