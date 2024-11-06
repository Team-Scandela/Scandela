package com.scandela.server.controller;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.core.JsonFactory;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonToken;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.scandela.server.entity.Lamp;
import com.scandela.server.service.ILampService;
import com.scandela.server.service.implementation.LampService;
import com.scandela.server.util.LampImportWrapper;

import lombok.Data;

@RestController
@RequestMapping(value = "/importcitydata")
@CrossOrigin(origins = "*")
public class ImportCityDataController {


    @Autowired
    private ILampService lampService;

    @Autowired
    private ObjectMapper objectMapper;


    @PostMapping("/lamps")
	public ResponseEntity<?> importLamps(@RequestBody LampImportWrapper lampWrapper) throws Exception {
        try {
            // Convertir et sauvegarder chaque LampImportDTO en Lamp
            List<Lamp> savedLamps = lampWrapper.getLamps().stream().map(lampService::createLampFromDTO).collect(Collectors.toList());

            return ResponseEntity.ok()
                .body(Map.of(
                    "message", "Import réussi",
                    "count", savedLamps.size()
                ));

        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(Map.of(
                    "error", "Erreur lors de l'import",
                    "details", e.getMessage()
                ));
        }
    }

    private Lamp parseLampadaire(JsonParser parser) throws IOException {
        Lamp lamp = new Lamp();
        while (parser.nextToken() != JsonToken.END_OBJECT) {
            String fieldName = parser.getCurrentName();
            parser.nextToken();
            switch (fieldName) {
                case "id":
                    lamp.setId(UUID.fromString(parser.getValueAsString()));
                    break;
                case "type":
                    lamp.setLampType(parser.getText());
                    break;
                case "height":
                    lamp.setHeight(parser.getDoubleValue());
                    break;
                // Ajoutez d'autres cas pour les champs que vous voulez parser
                default:
                    parser.skipChildren();
            }
        }
        return isValidLampadaire(lamp) ? lamp : null;
    }

    private boolean isValidLampadaire(Lamp lamp) {
        return lamp.getId() != null && lamp.getLampType() != null && lamp.getHeight() != null;
    }
}
