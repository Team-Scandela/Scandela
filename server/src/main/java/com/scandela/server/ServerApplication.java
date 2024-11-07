package com.scandela.server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.annotation.PropertySources;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableScheduling;
@EnableScheduling
@EnableJpaAuditing
@SpringBootApplication()
@PropertySources({ @PropertySource("classpath:application.properties"), @PropertySource("classpath:datasource.properties"), @PropertySource("classpath:security.properties") })
public class ServerApplication {

	// Methods \\
		// Public \\
	public static void main(String[] args) {
		SpringApplication.run(ServerApplication.class, args);
	}

}
