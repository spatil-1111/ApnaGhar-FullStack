package com.apnaghar.model;

import com.apnaghar.model.enums.PaymentStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "payments")
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Each payment is for exactly one booking
    @OneToOne
    @JoinColumn(name = "booking_id", nullable = false)
    private Booking booking;

    // who pays
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // property related (for owner earnings)
    @ManyToOne
    @JoinColumn(name = "property_id", nullable = false)
    private Property property;

    private double amount;

    // which month rent is for
    @Column(nullable = false)
    private LocalDate rentMonth;

    @Enumerated(EnumType.STRING)
    private PaymentStatus status;

    private LocalDateTime paymentDate;
}
