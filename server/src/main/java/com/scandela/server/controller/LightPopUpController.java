package com.scandela.server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.scandela.server.entity.LightPoint;
import com.scandela.server.service.ILightPopUpService;

@RestController
@RequestMapping(value = "/light")
public class LightPopUpController extends AbstractController {

    @Autowired
    private ILightPopUpService lightPopUpService;

    @GetMapping("/{id}")
    public LightPoint getLightPopUpInfos(@PathVariable int id) {
        return lightPopUpService.computeOptimisations(lightPopUpService.get(id));
    }
}
