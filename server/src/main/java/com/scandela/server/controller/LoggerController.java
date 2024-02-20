package com.scandela.server.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class LoggerController {

    private static final Logger logger = LoggerFactory.getLogger(LoggerController.class);

    @GetMapping("/sample")
    public String sampleEndpoint() {
        logger.info("Sample endpoint accessed");
        // ... Your controller logic here
        return "Sample response";
    }
}
