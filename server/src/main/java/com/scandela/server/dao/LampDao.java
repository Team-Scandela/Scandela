package com.scandela.server.dao;

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
	public List<Lamp> findFirst100ByLampTypeIsNot(String lampType);
	
	@Query("SELECT l FROM Lamp l " +
           "LEFT JOIN l.lampDecisions ld " +
           "WHERE l.lampType <> :lampType " +
           "AND (ld IS NULL OR (ld IS NOT NULL AND NOT EXISTS " +
           "(SELECT d FROM LampDecision d " +
           "WHERE d.lamp = l AND d.decision.solution LIKE %:decisionSolution%)))")
	public Page<Lamp> findByTypeIsNotAndLampDecisionsContains(@Param("lampType") String lampType, @Param("decisionSolution") String decisionSolution, Pageable pageable);
}
