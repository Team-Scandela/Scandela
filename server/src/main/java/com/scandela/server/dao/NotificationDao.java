package com.scandela.server.dao;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.scandela.server.entity.Notification;
import com.scandela.server.entity.User;

@Repository
public interface NotificationDao extends JpaRepository<Notification, UUID> {
	public List<Notification> findTop10ByUserOrderByTimeDesc(User user);
}
