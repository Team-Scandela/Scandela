package com.scandela.server.dao;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.scandela.server.entity.PriceLimit;

@Repository
public interface PriceLimitDao extends JpaRepository<PriceLimit, UUID> {
    // Constructors \\
}
