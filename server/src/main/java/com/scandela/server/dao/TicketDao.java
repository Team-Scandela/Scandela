package com.scandela.server.dao;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.scandela.server.entity.Ticket;

@Repository
public interface TicketDao extends JpaRepository<Ticket, UUID> {
    // Constructors \\
}
