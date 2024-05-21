package com.scandela.server.service;

import java.util.List;
import java.util.UUID;

import com.scandela.server.entity.Notification;
import com.scandela.server.exception.NotificationException;

public interface INotificationService extends IService<Notification> {
	public List<Notification> getAll(UUID idUser) throws NotificationException;
}
