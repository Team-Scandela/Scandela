package com.scandela.server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.annotation.PropertySources;

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class })
@PropertySources({ @PropertySource("classpath:application.properties"), @PropertySource("classpath:datasource.properties") })
public class ServerApplication {

	// Methods \\
		// Public \\
	public static void main(String[] args) {
		SpringApplication.run(ServerApplication.class, args);
	}
	
}
