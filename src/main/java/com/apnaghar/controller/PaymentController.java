package com.apnaghar.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.apnaghar.model.Payment;
import com.apnaghar.service.PaymentService;

import org.springframework.security.core.Authentication;

import java.util.List;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class PaymentController {

	private final PaymentService paymentService;

	// ===============================
	// USER PAY NOW
	// ===============================
	@PutMapping("/pay/{bookingId}")
	public ResponseEntity<Payment> payForBooking(@PathVariable Long bookingId, Authentication authentication) {

		String userEmail = authentication.getName();

		Payment payment = paymentService.payForBooking(bookingId, userEmail);

		return ResponseEntity.ok(payment);
	}

	// ===============================
	// USER PAYMENT HISTORY
	// ===============================
	@GetMapping("/my")
	public ResponseEntity<List<Payment>> getMyPayments(Authentication authentication) {

		String userEmail = authentication.getName();

		List<Payment> payments = paymentService.getMyPayments(userEmail);

		return ResponseEntity.ok(payments);
	}

	// ===============================
	// OWNER EARNINGS
	// ===============================
	@GetMapping("/owner")
	public ResponseEntity<List<Payment>> getOwnerPayments(Authentication authentication) {

		String ownerEmail = authentication.getName();
		return ResponseEntity.ok(paymentService.getOwnerPayments(ownerEmail));
	}

}
