package com.scandela.server.dao;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.scandela.server.entity.Decision;
import com.scandela.server.entity.DecisionType;

@Repository
public interface DecisionDao extends JpaRepository<Decision, UUID> {
	public List<Decision> findByDescriptionContains(String description);
	public List<Decision> findByTypeIn(List<DecisionType> types);
	public void deleteByDescriptionContaining(String description);
}
