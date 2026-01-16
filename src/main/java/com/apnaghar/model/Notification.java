package com.apnaghar.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "notifications")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Receiver of notification
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // Notification message
    @Column(nullable = false, length = 500)
    private String message;

    // USER / OWNER
    @Column(nullable = false)
    private String role;

    // ❌ read (reserved keyword)
    // ✅ is_read (safe)
    @Column(name = "is_read", nullable = false)
    private boolean read = false;

    // Timestamp
    @Column(nullable = false)
    private LocalDateTime createdAt;
}
