package com.apnaghar.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.apnaghar.model.Booking;
import com.apnaghar.model.enums.BookingStatus;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    List<Booking> findByUserId(Long userId);

    List<Booking> findByPropertyId(Long propertyId);

    List<Booking> findByPropertyIdAndStatus(Long propertyId, BookingStatus status);

    boolean existsByPropertyIdAndStatusInAndStartDateLessThanEqualAndEndDateGreaterThanEqual(
            Long propertyId,
            List<BookingStatus> statuses,
            LocalDate endDate,
            LocalDate startDate
    );

    Optional<Booking> findTopByUserIdAndPropertyIdAndStatus(
            Long userId, Long propertyId, BookingStatus status);

    // ✅ OWNER total bookings count
    long countByPropertyOwnerId(Long ownerId);
}
