package com.scandela.server.service.implementation;

import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.scandela.server.dao.NotificationDao;
import com.scandela.server.entity.Notification;
import com.scandela.server.exception.NotificationException;
import com.scandela.server.service.AbstractService;
import com.scandela.server.service.INotificationService;

@Service
public class NotificationService extends AbstractService<Notification> implements INotificationService {

	// Attributes \\
		// Private \\
	private final String[] IGNORED_PROPERTIES = { "id", "user" };

	// Constructors \\
	protected NotificationService(NotificationDao NotificationDao) {
		super(NotificationDao);
	}

	// Methods \\
		// Public \\
	@Override
	@Transactional(rollbackFor = { Exception.class })
	public Notification create(Notification newNotification) throws NotificationException{
		try {
			return dao.save(newNotification);
		} catch (Exception e) {
			if (newNotification.getName() == null) {
				throw new NotificationException(NotificationException.INCOMPLETE_INFORMATIONS);
			}
			throw e;
		}
	}

	@Override
	@Transactional(rollbackFor = { Exception.class })
    public Notification update(UUID id, Notification update, String... editables) throws Exception {
		try {
			Notification Notification = super.update(id, update, IGNORED_PROPERTIES);
	        
	        return Notification;
		} catch (Exception e) {
			throw e;
		}
    }

}
