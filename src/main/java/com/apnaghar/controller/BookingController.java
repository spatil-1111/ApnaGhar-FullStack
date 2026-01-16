package com.apnaghar.controller;

import com.apnaghar.dto.BookingRequest;
import com.apnaghar.dto.BookingResponse;
import com.apnaghar.model.Booking;
import com.apnaghar.service.BookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
public class BookingController {

    private final BookingService bookingService;

    // ===============================
    // CREATE BOOKING (USER)
    // ===============================
    @PostMapping
    public ResponseEntity<BookingResponse> createBooking(
            @RequestParam Long propertyId,
            @RequestBody BookingRequest request,
            Authentication authentication
    ) {
        String userEmail = authentication.getName();

        Booking booking = bookingService.bookProperty(propertyId, userEmail, request);

        return ResponseEntity.ok(
                bookingService.mapToResponse(booking)
        );
    }

    // ===============================
    // GET MY BOOKINGS (USER)
    // ===============================
    @GetMapping("/my")
    public ResponseEntity<List<BookingResponse>> getMyBookings(Authentication authentication) {

        String userEmail = authentication.getName();

        List<BookingResponse> response =
                bookingService.getMyBookings(userEmail)
                        .stream()
                        .map(bookingService::mapToResponse)
                        .toList();

        return ResponseEntity.ok(response);
    }

    // ===============================
    // GET OWNER BOOKINGS (OWNER)
    // ===============================
    @GetMapping("/owner")
    public ResponseEntity<List<BookingResponse>> getOwnerBookings(Authentication authentication) {

        String ownerEmail = authentication.getName();

        List<BookingResponse> response =
                bookingService.getBookingsForOwner(ownerEmail)
                        .stream()
                        .map(bookingService::mapToResponse)
                        .toList();

        return ResponseEntity.ok(response);
    }

    // ===============================
    // OWNER CONFIRM / CANCEL BOOKING
    // ===============================
    @PutMapping("/{bookingId}/status")
    public ResponseEntity<BookingResponse> updateBookingStatus(
            @PathVariable Long bookingId,
            @RequestParam String status,
            Authentication authentication
    ) {
        Booking updatedBooking =
                bookingService.updateBookingStatus(bookingId, status);

        return ResponseEntity.ok(
                bookingService.mapToResponse(updatedBooking)
        );
    }
    
    @PutMapping("/cancel/{bookingId}")
    public ResponseEntity<?> cancelBookingByUser(
            @PathVariable Long bookingId,
            Authentication authentication
    ) {
        String userEmail = authentication.getName();
        return ResponseEntity.ok(
                bookingService.cancelBookingByUser(bookingId, userEmail)
        );
    }

}
