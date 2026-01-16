package com.apnaghar.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.apnaghar.model.Payment;
import com.apnaghar.model.enums.PaymentStatus;

public interface PaymentRepository extends JpaRepository<Payment, Long> {

    Optional<Payment> findByBookingId(Long bookingId);

    // USER payment history (not used now, but ok to keep)
    List<Payment> findByUserId(Long userId);

    // OWNER earnings (all payments)
    List<Payment> findByPropertyOwnerId(Long ownerId);

    // OWNER earnings via booking (used in dashboard)
    List<Payment> findByBooking_Property_Owner_Id(Long ownerId);

    // ✅ OWNER earnings with SUCCESS status (BEST for dashboard)
    List<Payment> findByBooking_Property_Owner_IdAndStatus(
            Long ownerId, PaymentStatus status);

    // For review validation
    boolean existsByBookingIdAndStatus(Long bookingId, PaymentStatus status);
}
