package com.scandela.server.dao;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.scandela.server.entity.Notification;

@Repository
public interface NotificationDao extends JpaRepository<Notification, UUID> {
}
