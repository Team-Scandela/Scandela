package com.scandela.server.configuration;

import org.springframework.web.cors.CorsConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfiguration {
	@Bean
	public PasswordEncoder passwordEncoder() {
	    return PasswordEncoderFactories.createDelegatingPasswordEncoder();
	}
	
	@Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http.csrf().disable().authorizeHttpRequests((authorize) -> {
            authorize.anyRequest().authenticated();
        }).httpBasic(Customizer.withDefaults());

        http.cors(configurer -> {
            CorsConfiguration corsConfiguration = new CorsConfiguration();
            corsConfiguration.addAllowedOrigin("*");
            corsConfiguration.addAllowedMethod("*");
            corsConfiguration.addAllowedHeader("*");
            configurer.configurationSource(request -> corsConfiguration);
        });

        return http.build();
    }
}
