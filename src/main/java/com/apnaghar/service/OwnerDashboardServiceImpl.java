package com.apnaghar.service;

import java.time.LocalDate;

import org.springframework.stereotype.Service;

import com.apnaghar.dto.OwnerDashboardResponse;
import com.apnaghar.model.Payment;
import com.apnaghar.model.User;
import com.apnaghar.model.enums.PaymentStatus;
import com.apnaghar.repository.BookingRepository;
import com.apnaghar.repository.PaymentRepository;
import com.apnaghar.repository.PropertyRepository;
import com.apnaghar.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OwnerDashboardServiceImpl implements OwnerDashboardService {

    private final UserRepository userRepository;
    private final PaymentRepository paymentRepository;
    private final BookingRepository bookingRepository;
    private final PropertyRepository propertyRepository;

    @Override
    public OwnerDashboardResponse getDashboard(String ownerEmail) {

        User owner = userRepository.findByEmail(ownerEmail)
                .orElseThrow(() -> new RuntimeException("Owner not found"));

        var payments = paymentRepository
                .findByBooking_Property_Owner_IdAndStatus(
                        owner.getId(), PaymentStatus.SUCCESS);

        double total = payments.stream()
                .mapToDouble(Payment::getAmount)
                .sum();

        int month = LocalDate.now().getMonthValue();
        int year = LocalDate.now().getYear();

        double monthly = payments.stream()
                .filter(p ->
                        p.getPaymentDate().getMonthValue() == month &&
                        p.getPaymentDate().getYear() == year)
                .mapToDouble(Payment::getAmount)
                .sum();

        long totalBookings =
                bookingRepository.countByPropertyOwnerId(owner.getId());

        long activeProperties =
                propertyRepository.countByOwnerIdAndAvailableTrue(owner.getId());

        return OwnerDashboardResponse.builder()
                .totalEarnings(total)
                .monthlyEarnings(monthly)
                .totalBookings(totalBookings)
                .activeProperties(activeProperties)
                .build();
    }
}
