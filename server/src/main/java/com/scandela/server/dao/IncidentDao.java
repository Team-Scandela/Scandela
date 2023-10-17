package com.scandela.server.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.scandela.server.entity.Incident;

@Repository
public interface IncidentDao extends JpaRepository<Incident, Long> {

}