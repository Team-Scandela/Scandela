package com.scandela.server.controller;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
    public LightPoint getLightPopUpInfos(@PathVariable UUID id) {
        return lightPopUpService.computeOptimisations(lightPopUpService.get(id));
    }

    @PutMapping("/{id}")
    public LightPoint updateLightPoint(@PathVariable UUID id, @RequestBody LightPoint updatedData) {
        return lightPopUpService.updateLightPoint(lightPopUpService.get(id), updatedData);
    }
}
