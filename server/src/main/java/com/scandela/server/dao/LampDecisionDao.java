package com.scandela.server.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.scandela.server.entity.LampDecision;

@Repository
public interface LampDecisionDao extends JpaRepository<LampDecision, Long> {

}
