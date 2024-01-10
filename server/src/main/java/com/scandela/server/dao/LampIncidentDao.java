package com.scandela.server.dao;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.scandela.server.entity.LampIncident;

@Repository
public interface LampIncidentDao extends JpaRepository<LampIncident, UUID> {

}
