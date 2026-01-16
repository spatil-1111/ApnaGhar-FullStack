package com.apnaghar.service;

import com.apnaghar.model.Notification;
import com.apnaghar.model.User;
import com.apnaghar.repository.NotificationRepository;
import com.apnaghar.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;

    @Override
    public void createNotification(Long userId, String role, String message) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Notification notification = Notification.builder()
                .user(user)
                .role(role)
                .message(message)
                .read(false)
                .createdAt(LocalDateTime.now())
                .build();

        notificationRepository.save(notification);
    }

    @Override
    public List<Notification> getMyNotifications(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return notificationRepository
                .findByUserIdOrderByCreatedAtDesc(user.getId());
    }

    @Override
    public void markAsRead(Long notificationId, String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new RuntimeException("Notification not found"));

        if (!notification.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Not allowed");
        }

        notification.setRead(true);
        notificationRepository.save(notification);
    }

    @Override
    public long getUnreadCount(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return notificationRepository.countByUserIdAndReadFalse(user.getId());
    }

    // ✅ MARK ALL AS READ
    @Override
    public void markAllAsRead(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Notification> list =
                notificationRepository.findByUserIdOrderByCreatedAtDesc(user.getId());

        for (Notification n : list) {
            n.setRead(true);
        }

        notificationRepository.saveAll(list);
    }
}
