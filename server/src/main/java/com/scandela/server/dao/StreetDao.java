package com.scandela.server.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.scandela.server.entity.Street;

@Repository
public interface StreetDao extends JpaRepository<Street, Long> {

}
