package com.scandela.server.dao;

import java.time.LocalTime;
import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.scandela.server.entity.Lamp;

@Repository
public interface LampDao extends JpaRepository<Lamp, UUID> {
	public List<Lamp> findByLampTypeIsNot(String lampType);
	
	public List<Lamp> findByLightOffIsNullOrLightOffBefore(LocalTime lightOff);
	
	public List<Lamp> findByLightOn2IsNullOrLightOn2After(LocalTime lightOn2);
	
	public List<Lamp> findByLatitudeBetweenAndLongitudeBetween(double latitudeMin, double latitudeMax, double longitudeMin, double longitudeMax);
	
	public List<Lamp> findByName(String name);
	
	@Query("SELECT l FROM Lamp l WHERE l.bulbLifetime IS NOT NULL AND l.bulb.estimatedLifetime IS NOT NULL AND l.bulbLifetime >= l.bulb.estimatedLifetime")
    public List<Lamp> findLampsWithBulbLifetimeGreaterThanOrEqualToEstimated();
}
