package com.scandela.server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.scandela.server.entity.dto.LightPointDto;
import com.scandela.server.service.ILightPopUpService;

@RestController
@RequestMapping(value = "/light")
public class LightPopUpController extends AbstractController {

    @Autowired
    private ILightPopUpService lightPopUpService;

    @GetMapping("/{id}")
    public ResponseEntity<LightPointDto> getLightPopUpInfos(@PathVariable int id) {
        return ResponseEntity.ok(lightPopUpService.getLightPopUpInfos(id));
    }
}
