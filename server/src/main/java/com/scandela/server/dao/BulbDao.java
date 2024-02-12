package com.scandela.server.dao;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.scandela.server.entity.Bulb;

@Repository
public interface BulbDao extends JpaRepository<Bulb, UUID> {

}
