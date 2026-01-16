package com.apnaghar.controller;

import com.apnaghar.model.Notification;
import com.apnaghar.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;

    // 🔔 Get my notifications (MAIN)
    @GetMapping
    public ResponseEntity<List<Notification>> getMyNotifications(
            Authentication authentication) {

        String email = authentication.getName();
        return ResponseEntity.ok(
                notificationService.getMyNotifications(email)
        );
    }

    // 🔔 Get my notifications (ALIAS for frontend /my)
    @GetMapping("/my")
    public ResponseEntity<List<Notification>> getMyNotificationsAlias(
            Authentication authentication) {

        String email = authentication.getName();
        return ResponseEntity.ok(
                notificationService.getMyNotifications(email)
        );
    }

    // 🔔 Get unread count (bell icon)
    @GetMapping("/unread-count")
    public ResponseEntity<Long> getUnreadCount(
            Authentication authentication) {

        String email = authentication.getName();
        return ResponseEntity.ok(
                notificationService.getUnreadCount(email)
        );
    }

    // 🔔 Mark notification as read
    @PutMapping("/{id}/read")
    public ResponseEntity<?> markAsRead(
            @PathVariable Long id,
            Authentication authentication) {

        String email = authentication.getName();
        notificationService.markAsRead(id, email);
        return ResponseEntity.ok("Notification marked as read");
    }
    
 // 🔔 Mark all notifications as read
    @PutMapping("/read-all")
    public ResponseEntity<?> markAllAsRead(Authentication authentication) {

        String email = authentication.getName();
        notificationService.markAllAsRead(email);
        return ResponseEntity.ok("All notifications marked as read");
    }

}
