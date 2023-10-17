package com.scandela.server.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.scandela.server.entity.Hood;

@Repository
public interface HoodDao extends JpaRepository<Hood, Long> {

}
