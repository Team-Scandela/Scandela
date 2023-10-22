package com.scandela.server.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.scandela.server.entity.LightPoint;

@Repository
public interface LightPointDao extends JpaRepository<LightPoint, Long> {

}
