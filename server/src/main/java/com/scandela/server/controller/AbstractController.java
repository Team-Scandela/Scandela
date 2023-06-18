package com.scandela.server.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping(produces = MediaType.APPLICATION_JSON_VALUE)
public abstract class AbstractController {

	protected final Logger logger = LoggerFactory.getLogger(getClass());

}
