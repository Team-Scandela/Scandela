package com.scandela.server.dao;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.scandela.server.entity.Weather;

@Repository
public interface WeatherDao extends JpaRepository<Weather, UUID> {
	public Optional<Weather> findByLatitudeAndLongitude(double latitude, double longitude);
}
