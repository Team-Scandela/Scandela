package com.scandela.server.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.scandela.server.entity.LightPoint;

@Repository
public interface LightPointDao extends JpaRepository<LightPoint, Long> {
    @Query("SELECT lp FROM lamp lp WHERE lp.uuid = :uuid")
    LightPoint findByUuid(String uuid);
}
