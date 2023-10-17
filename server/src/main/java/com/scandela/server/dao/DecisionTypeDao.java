package com.scandela.server.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.scandela.server.entity.DecisionType;

@Repository
public interface DecisionTypeDao extends JpaRepository<DecisionType, Long> {

}
