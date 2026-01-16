package com.apnaghar.repository;

import com.apnaghar.model.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {

    // All notifications of a user (latest first)
    List<Notification> findByUserIdOrderByCreatedAtDesc(Long userId);

    // Unread count (for bell icon)
    long countByUserIdAndReadFalse(Long userId);
}
