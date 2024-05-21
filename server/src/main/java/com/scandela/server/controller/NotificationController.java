package com.scandela.server.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.scandela.server.entity.Notification;
import com.scandela.server.exception.NotificationException;
import com.scandela.server.service.INotificationService;

@RestController
@RequestMapping(value = "/notifications")
@CrossOrigin(origins = "*")
public class NotificationController extends AbstractController<Notification> {

	// Constructors \\
	protected NotificationController(INotificationService notificationService) {
		super(notificationService);
	}

	// Methods \\
	// Public \\
	/**
	 * Get all notifications
	 * 
	 * @return allNotifications
	 */
	@GetMapping
	public List<Notification> getNotifications(@RequestParam UUID idUser) {
		return ((INotificationService) service).getAll(idUser);
	}

	/**
	 * Get notification by id
	 * 
	 * @param id
	 * @return notification
	 */
	@GetMapping("/{id}")
	public Notification getNotification(@PathVariable UUID id) {
		return super.get(id);
	}

    /** 
     * Get latest notifications by 10
     * 
     */
    @GetMapping("/latest")
    public List<Notification> getLatestNotifications(@RequestParam UUID idUser) {
        return ((INotificationService) service).getLatest(idUser, 10);
    }

	/**
	 * Create new notification
	 * 
	 * @param newNotification
	 * @return newNotification
	 * @throws NotificationException 
	 */
	@PostMapping("/create")
	public Notification createNotification(@RequestBody Notification newNotification) throws Exception {
		return super.create(newNotification);
	}

	/**
	 * Update notification by id
	 * 
	 * @param id
	 * @param update
	 * @return
	 * @throws Exception
	 */
    @PutMapping("/{id}")
    public Notification updateNotification(@PathVariable UUID id, @RequestBody Notification update) throws Exception {
        return super.update(id, update);
    }

	/**
	 * Delete notification
	 * 
	 * @param id
	 */
	@DeleteMapping("/delete/{id}")
	public void deleteNotification(@PathVariable UUID id) {
		super.delete(id);
	}

}