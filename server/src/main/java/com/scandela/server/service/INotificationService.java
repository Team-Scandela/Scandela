package com.scandela.server.service;

import java.util.List;
import java.util.UUID;
import com.scandela.server.entity.Notification;

public interface INotificationService extends IService<Notification> {
    public List<Notification> getAll(UUID idUser);
    public List<Notification> getLatest(UUID idUser, int limit);
}
