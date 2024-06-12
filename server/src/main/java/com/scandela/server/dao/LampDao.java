package com.scandela.server.dao;

import java.time.LocalTime;
import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.scandela.server.entity.Lamp;

@Repository
public interface LampDao extends JpaRepository<Lamp, UUID> {
	public Page<Lamp> findByLampTypeIsNot(String lampType, Pageable pageable);
	
	public Page<Lamp> findByLightOffIsNullOrLightOffBefore(LocalTime lightOff, Pageable pageable);
	
	public Page<Lamp> findByLightOn2IsNullOrLightOn2After(LocalTime lightOn2, Pageable pageable);
	
	public List<Lamp> findByLatitudeBetweenAndLongitudeBetween(double latitudeMin, double latitudeMax, double longitudeMin, double longitudeMax);
	
	public List<Lamp> findByName(String name);
}
