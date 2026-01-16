package com.apnaghar.service;

import com.apnaghar.dto.BookingRequest;
import com.apnaghar.dto.BookingResponse;
import com.apnaghar.model.Booking;

import java.util.List;

public interface BookingService {

    // User books a property with dates
    Booking bookProperty(Long propertyId, String userEmail, BookingRequest request);

    // Get bookings of logged-in user
    List<Booking> getMyBookings(String userEmail);

    // Get bookings by property
    List<Booking> getBookingsByProperty(Long propertyId);

    // Confirm or cancel booking
    Booking updateBookingStatus(Long bookingId, String status);

    // Generic save
    Booking createBooking(Booking booking);

    // Get bookings for owner
    List<Booking> getBookingsForOwner(String ownerEmail);

    // 🔥 NEW: Entity → Response mapping
    BookingResponse mapToResponse(Booking booking);
    
    Booking cancelBookingByUser(Long bookingId, String userEmail);

}
