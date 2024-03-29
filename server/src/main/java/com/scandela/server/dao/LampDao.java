package com.scandela.server.dao;

import java.time.LocalTime;
import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.scandela.server.entity.Lamp;

@Repository
public interface LampDao extends JpaRepository<Lamp, UUID> {
	@Query("SELECT l FROM Lamp l " +
           "LEFT JOIN l.lampDecisions ld " +
           "WHERE l.lampType <> :lampType " +
           "AND (ld IS NULL OR (ld IS NOT NULL AND NOT EXISTS " +
           "(SELECT d FROM LampDecision d " +
           "WHERE d.lamp = l AND d.decision.solution LIKE %:decisionSolution%)))")
	public Page<Lamp> findByTypeIsNotAndLampDecisionsContains(@Param("lampType") String lampType, @Param("decisionSolution") String decisionSolution, Pageable pageable);

	@Query("SELECT l FROM Lamp l " +
           "LEFT JOIN l.lampDecisions ld " +
           "WHERE (l.lightOff IS NULL OR l.lightOff < :lightOff) " +
           "AND (ld IS NULL OR (ld IS NOT NULL AND NOT EXISTS " +
           "(SELECT d FROM LampDecision d " +
           "WHERE d.lamp = l AND d.decision.solution LIKE %:decisionSolution%)))")
	public Page<Lamp> findByLightOffInferiorAndLampDecisionsContains(@Param("lightOff") LocalTime lightOff, @Param("decisionSolution") String decisionSolution, Pageable pageable);
	
	@Query("SELECT l FROM Lamp l " +
	           "LEFT JOIN l.lampDecisions ld " +
	           "WHERE (l.lightOn2 IS NULL OR l.lightOn2 > :lightOn) " +
	           "AND (ld IS NULL OR (ld IS NOT NULL AND NOT EXISTS " +
	           "(SELECT d FROM LampDecision d " +
	           "WHERE d.lamp = l AND d.decision.solution LIKE %:decisionSolution%)))")
	public Page<Lamp> findByLightOn2SuperiorAndLampDecisionsContains(@Param("lightOn") LocalTime lightOn, @Param("decisionSolution") String decisionSolution, Pageable pageable);
	
	public List<Lamp> findByLatitudeBetweenAndLongitudeBetween(double latitudeMin, double latitudeMax, double longitudeMin, double longitudeMax);
	
	public List<Lamp> findByName(String name);
}
