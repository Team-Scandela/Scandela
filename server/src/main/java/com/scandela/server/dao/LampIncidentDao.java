package com.scandela.server.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.scandela.server.entity.LampIncident;

@Repository
public interface LampIncidentDao extends JpaRepository<LampIncident, Long> {

}
