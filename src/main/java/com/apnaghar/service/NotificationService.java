package com.apnaghar.service;

import com.apnaghar.model.Notification;

import java.util.List;

public interface NotificationService {

    // Create notification
    void createNotification(Long userId, String role, String message);

    // Get notifications for logged-in user
    List<Notification> getMyNotifications(String email);

    // Mark notification as read
    void markAsRead(Long notificationId, String email);

    // Unread count
    long getUnreadCount(String email);
    
    //for mark as all read notification
    void markAllAsRead(String email);

}
