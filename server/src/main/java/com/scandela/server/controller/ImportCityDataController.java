// package com.scandela.server.controller;

// import java.io.IOException;
// import java.io.InputStream;
// import java.util.ArrayList;
// import java.util.List;
// import java.util.UUID;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.CrossOrigin;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RequestParam;
// import org.springframework.web.bind.annotation.RestController;
// import org.springframework.web.multipart.MultipartFile;

// import com.fasterxml.jackson.core.JsonFactory;
// import com.fasterxml.jackson.core.JsonParser;
// import com.fasterxml.jackson.core.JsonToken;
// import com.scandela.server.entity.Lamp;
// import com.scandela.server.service.ILampService;

// @RestController
// @RequestMapping(value = "/importcitydata")
// @CrossOrigin(origins = "*")
// public class ImportCityDataController {


//     @Autowired
//     private ILampService lampService;

//     @PostMapping("/lamps")
// 	public ResponseEntity<?> importLamps(@RequestParam("file") MultipartFile file) throws Exception {
//         JsonFactory factory = new JsonFactory();
//         try {

//             InputStream inputStream = file.getInputStream();
//             JsonParser parser = factory.createParser(inputStream);

//             if (parser.nextToken() != JsonToken.START_ARRAY) {
//                 throw new IllegalStateException("Expected content to be an array");
//             }

//             List<Lamp> batch = new ArrayList<>();
//             int count = 0;

//             while (parser.nextToken() != JsonToken.END_ARRAY) {
//                 Lamp lampadaire = parseLampadaire(parser);
//                 if (lampadaire != null) {
//                     batch.add(lampadaire);
//                     count++;

//                     if (batch.size() >= 1000) {
//                         lampadaireRepository.saveAll(batch);
//                         batch.clear();
//                     }
//                 }
//             }

//             if (!batch.isEmpty()) {
//                 lampadaireRepository.saveAll(batch);
//             }

//         } catch (Exception e) {
//             System.out.println("Error: " + e);
//         }
//         return ResponseEntity.ok("good ig");
//     }

//     private Lamp parseLampadaire(JsonParser parser) throws IOException {
//         Lamp lamp = new Lamp();
//         while (parser.nextToken() != JsonToken.END_OBJECT) {
//             String fieldName = parser.getCurrentName();
//             parser.nextToken();
//             switch (fieldName) {
//                 case "id":
//                     lamp.setId(UUID.fromString(parser.getValueAsString()));
//                     break;
//                 case "type":
//                     lamp.setLampType(parser.getText());
//                     break;
//                 case "height":
//                     lamp.setHeight(parser.getDoubleValue());
//                     break;
//                 // Ajoutez d'autres cas pour les champs que vous voulez parser
//                 default:
//                     parser.skipChildren();
//             }
//         }
//         return isValidLampadaire(lamp) ? lamp : null;
//     }

//     private boolean isValidLampadaire(Lamp lamp) {
//         return lamp.getId() != null && lamp.getLampType() != null && lamp.getHeight() != null;
//     }
// }
