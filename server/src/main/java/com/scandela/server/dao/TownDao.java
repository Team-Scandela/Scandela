package com.scandela.server.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.scandela.server.entity.Town;

@Repository
public interface TownDao extends JpaRepository<Town, Long> {
}
