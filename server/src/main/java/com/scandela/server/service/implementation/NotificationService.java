package com.scandela.server.service.implementation;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.scandela.server.dao.NotificationDao;
import com.scandela.server.dao.UserDao;
import com.scandela.server.entity.Notification;
import com.scandela.server.entity.User;
import com.scandela.server.exception.NotificationException;
import com.scandela.server.exception.UserException;
import com.scandela.server.service.AbstractService;
import com.scandela.server.service.INotificationService;

@Service
public class NotificationService extends AbstractService<Notification> implements INotificationService {

	// Attributes \\
		// Private \\
	private final String[] IGNORED_PROPERTIES = { "id", "user" };
	private UserDao userDao;

	// Constructors \\
	protected NotificationService(NotificationDao notificationDao, UserDao userDao) {
		super(notificationDao);
		this.userDao = userDao;
	}

	// Methods \\
	// Public \\
	@Override
	@Transactional(rollbackFor = { Exception.class })
	public List<Notification> getAll(UUID idUser) {
//		List<Notification> notifications = ((NotificationDao) dao).findLast10ByUuiduser(idUser);

//		return notifications;
		return null;
	}

	@Override
	@Transactional(rollbackFor = { Exception.class })
	public Notification create(Notification newNotification) throws Exception {
		try {
			loadUser(newNotification);

			newNotification.setTime(LocalDateTime.now());

			return dao.save(newNotification);
		} catch (Exception e) {
			if (newNotification.getUser() == null || newNotification.getDescription() == null) {
				throw new NotificationException(NotificationException.INCOMPLETE_INFORMATIONS);
			}
			throw e;
		}
	}

	@Override
	@Transactional(rollbackFor = { Exception.class })
    public Notification update(UUID id, Notification update, String... ignoredProperties) throws Exception {
		try {
			Notification notification = super.update(id, update, IGNORED_PROPERTIES);

	        return notification;
		} catch (Exception e) {
			throw e;
		}
    }

	// Private \\
	private void loadUser(Notification newNotification) throws UserException {
		if (newNotification.getUser() == null) {
			throw new UserException(NotificationException.INCOMPLETE_INFORMATIONS);
		}

		UUID notificationId = newNotification.getUser().getId();

		Optional<User> user = userDao.findById(notificationId);
		if (user.isEmpty()) {
			throw new UserException(NotificationException.USER_LOADING);
		}

		newNotification.setUser(user.orElseGet(() -> {
			return null;
		}));
	}

}