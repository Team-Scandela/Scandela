package com.scandela.server.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.scandela.server.entity.Decision;

@Repository
public interface DecisionDao extends JpaRepository<Decision, Long> {

}