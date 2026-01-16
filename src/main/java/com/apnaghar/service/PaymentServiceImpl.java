package com.apnaghar.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.apnaghar.model.Booking;
import com.apnaghar.model.Payment;
import com.apnaghar.model.enums.PaymentStatus;
import com.apnaghar.repository.BookingRepository;
import com.apnaghar.repository.PaymentRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {

    private final PaymentRepository paymentRepository;
    private final BookingRepository bookingRepository;

    // ===============================
    // USER PAY FOR BOOKING
    // ===============================
    @Override
    public Payment payForBooking(Long bookingId, String userEmail) {

        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        // 🔒 Only booking owner can pay
        if (!booking.getUser().getEmail().equals(userEmail)) {
            throw new RuntimeException("You are not allowed to pay for this booking");
        }

        Payment payment = paymentRepository.findByBookingId(bookingId)
                .orElseThrow(() -> new RuntimeException("Payment record not found"));

        if (payment.getStatus() == PaymentStatus.SUCCESS) {
            throw new RuntimeException("Payment already completed");
        }

        payment.setStatus(PaymentStatus.SUCCESS);
        payment.setPaymentDate(LocalDateTime.now());

        return paymentRepository.save(payment);
    }

    // ===============================
    // USER PAYMENT HISTORY
    // ===============================
    @Override
    public List<Payment> getMyPayments(String userEmail) {

        return paymentRepository.findAll().stream()
                .filter(p -> p.getBooking().getUser().getEmail().equals(userEmail))
                .toList();
    }
    
    
    //owner earning 
    @Override
    public List<Payment> getOwnerPayments(String ownerEmail) {

        var owner = bookingRepository.findAll().stream()
                .map(b -> b.getProperty().getOwner())
                .filter(o -> o.getEmail().equals(ownerEmail))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Owner not found"));

        return paymentRepository.findByBooking_Property_Owner_Id(owner.getId());
    }

}
