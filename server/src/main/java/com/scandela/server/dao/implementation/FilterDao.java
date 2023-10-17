package com.scandela.server.dao.implementation;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.scandela.server.entity.Filter;

@Repository
public interface FilterDao extends JpaRepository<Filter, Long> {
    // Constructors \\
}
