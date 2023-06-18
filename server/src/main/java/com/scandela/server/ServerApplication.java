package com.scandela.server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.annotation.PropertySources;

@SpringBootApplication
@PropertySources({ @PropertySource("classpath:application.properties"), @PropertySource("classpath:datasource.properties") })
public class ServerApplication {

	// Methods \\
		// Public \\
	public static void main(String[] args) {
		SpringApplication.run(ServerApplication.class, args);
	}
	
}
