package com.apnaghar.model;

import com.apnaghar.model.enums.BookingStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "bookings")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // USER who booked
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // PROPERTY being booked
    @ManyToOne
    @JoinColumn(name = "property_id", nullable = false)
    private Property property;

    // Date when booking was created
    @Column(nullable = false)
    private LocalDate bookingDate;

    // 🔥 NEW: stay start date
    @Column(nullable = false)
    private LocalDate startDate;

    // 🔥 NEW: stay end date
    @Column(nullable = false)
    private LocalDate endDate;

    @Enumerated(EnumType.STRING)
    private BookingStatus status;
}
