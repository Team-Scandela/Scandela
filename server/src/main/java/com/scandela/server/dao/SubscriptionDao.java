package com.scandela.server.dao;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.scandela.server.entity.Subscription;

@Repository
public interface SubscriptionDao extends JpaRepository<Subscription, UUID> {
    // Constructors \\
    public Optional<Subscription> findByUserid(String userid);
}
