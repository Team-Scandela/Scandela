package com.scandela.server.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.scandela.server.entity.WhileAway;

@Repository
public interface WhileAwayDao extends JpaRepository<WhileAway, Long> {

}
