package com.apnaghar.service;

import com.apnaghar.dto.BookingRequest;
import com.apnaghar.dto.BookingResponse;
import com.apnaghar.dto.PropertyResponse;
import com.apnaghar.dto.UserResponse;
import com.apnaghar.exception.BadRequestException;
import com.apnaghar.model.Booking;
import com.apnaghar.model.Payment;
import com.apnaghar.model.Property;
import com.apnaghar.model.User;
import com.apnaghar.model.enums.BookingStatus;
import com.apnaghar.model.enums.PaymentStatus;
import com.apnaghar.repository.BookingRepository;
import com.apnaghar.repository.PaymentRepository;
import com.apnaghar.repository.PropertyRepository;
import com.apnaghar.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BookingServiceImpl implements BookingService {

    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final PropertyRepository propertyRepository;
    private final PaymentRepository paymentRepository;     // ✅ ADDED
    private final NotificationService notificationService; // 🔔

    // ===============================
    // CREATE BOOKING (USER)
    // ===============================
    @Override
    public Booking bookProperty(Long propertyId, String userEmail, BookingRequest request) {

        if (request.getEndDate().isBefore(request.getStartDate())) {
            throw new BadRequestException("End date cannot be before start date");
        }

        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Property property = propertyRepository.findById(propertyId)
                .orElseThrow(() -> new RuntimeException("Property not found"));

        boolean overlapExists =
                bookingRepository.existsByPropertyIdAndStatusInAndStartDateLessThanEqualAndEndDateGreaterThanEqual(
                        propertyId,
                        List.of(BookingStatus.CONFIRMED),
                        request.getEndDate(),
                        request.getStartDate()
                );

        if (overlapExists) {
            throw new BadRequestException("Property already booked for selected dates");
        }

        Booking booking = Booking.builder()
                .user(user)
                .property(property)
                .bookingDate(LocalDate.now())
                .startDate(request.getStartDate())
                .endDate(request.getEndDate())
                .status(BookingStatus.PENDING)
                .build();

        Booking savedBooking = bookingRepository.save(booking);

        // 🔔 USER notification
        notificationService.createNotification(
                user.getId(),
                "USER",
                "Your booking request for '" + property.getTitle() + "' has been created."
        );

        // 🔔 OWNER notification
        notificationService.createNotification(
                property.getOwner().getId(),
                "OWNER",
                "New booking request received for your property '" + property.getTitle() + "'."
        );

        return savedBooking;
    }

    // ===============================
    // USER BOOKINGS
    // ===============================
    @Override
    public List<Booking> getMyBookings(String userEmail) {

        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return bookingRepository.findByUserId(user.getId());
    }

    // ===============================
    // BOOKINGS BY PROPERTY
    // ===============================
    @Override
    public List<Booking> getBookingsByProperty(Long propertyId) {
        return bookingRepository.findByPropertyId(propertyId);
    }

    // ===============================
    // OWNER CONFIRM / CANCEL
    // ===============================
    @Override
    public Booking updateBookingStatus(Long bookingId, String status) {

        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        BookingStatus newStatus = BookingStatus.valueOf(status.toUpperCase());
        Property property = booking.getProperty();

        // ===============================
        // OWNER CONFIRMS BOOKING
        // ===============================
        if (newStatus == BookingStatus.CONFIRMED) {

            booking.setStatus(BookingStatus.CONFIRMED);
            bookingRepository.save(booking);

            // 🔥 CREATE PAYMENT (MONTHLY RENT)
            Payment payment = Payment.builder()
                    .booking(booking)
                    .user(booking.getUser())
                    .property(property)
                    .amount(property.getRent())
                    .rentMonth(LocalDate.now().withDayOfMonth(1))
                    .status(PaymentStatus.PENDING)
                    .build();

            paymentRepository.save(payment);

            // 🔥 PROPERTY NOT AVAILABLE
            property.setAvailable(false);
            propertyRepository.save(property);

            // ❌ Cancel other pending bookings
            List<Booking> pendingBookings =
                    bookingRepository.findByPropertyIdAndStatus(
                            property.getId(),
                            BookingStatus.PENDING
                    );

            for (Booking b : pendingBookings) {
                if (!b.getId().equals(bookingId)) {
                    b.setStatus(BookingStatus.CANCELLED);
                    bookingRepository.save(b);
                }
            }

            // 🔔 USER notification
            notificationService.createNotification(
                    booking.getUser().getId(),
                    "USER",
                    "Your booking for '" + property.getTitle() + "' has been CONFIRMED."
            );

            return booking;
        }

        // ===============================
        // OWNER CANCELS BOOKING
        // ===============================
        if (newStatus == BookingStatus.CANCELLED) {

            booking.setStatus(BookingStatus.CANCELLED);
            Booking saved = bookingRepository.save(booking);

            // 🔔 USER notification
            notificationService.createNotification(
                    booking.getUser().getId(),
                    "USER",
                    "Your booking for '" + property.getTitle() + "' has been CANCELLED by owner."
            );

            return saved;
        }

        booking.setStatus(newStatus);
        return bookingRepository.save(booking);
    }

    // ===============================
    // GENERIC SAVE
    // ===============================
    @Override
    public Booking createBooking(Booking booking) {
        return bookingRepository.save(booking);
    }

    // ===============================
    // OWNER VIEW BOOKINGS
    // ===============================
    @Override
    public List<Booking> getBookingsForOwner(String ownerEmail) {

        User owner = userRepository.findByEmail(ownerEmail)
                .orElseThrow(() -> new RuntimeException("Owner not found"));

        List<Property> properties = propertyRepository.findByOwnerId(owner.getId());

        return properties.stream()
                .flatMap(p -> bookingRepository.findByPropertyId(p.getId()).stream())
                .toList();
    }

    // ===============================
    // ENTITY → RESPONSE DTO
    // ===============================
    @Override
    public BookingResponse mapToResponse(Booking booking) {

        return BookingResponse.builder()
                .id(booking.getId())
                .bookingDate(booking.getBookingDate())
                .startDate(booking.getStartDate())
                .endDate(booking.getEndDate())
                .status(booking.getStatus().name())
                .user(
                        UserResponse.builder()
                                .id(booking.getUser().getId())
                                .name(booking.getUser().getName())
                                .email(booking.getUser().getEmail())
                                .role(booking.getUser().getRole().name())
                                .build()
                )
                .property(
                        PropertyResponse.builder()
                                .id(booking.getProperty().getId())
                                .title(booking.getProperty().getTitle())
                                .type(booking.getProperty().getType())
                                .location(booking.getProperty().getLocation())
                                .rent(booking.getProperty().getRent())
                                .build()
                )
                .build();
    }

    // ===============================
    // USER CANCEL BOOKING
    // ===============================
    @Override
    public Booking cancelBookingByUser(Long bookingId, String userEmail) {

        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        if (!booking.getUser().getEmail().equals(userEmail)) {
            throw new RuntimeException("You are not allowed to cancel this booking");
        }

        if (booking.getStatus() != BookingStatus.PENDING) {
            throw new RuntimeException("Only pending bookings can be cancelled");
        }

        booking.setStatus(BookingStatus.CANCELLED);
        Booking saved = bookingRepository.save(booking);

        // 🔔 OWNER notification
        notificationService.createNotification(
                booking.getProperty().getOwner().getId(),
                "OWNER",
                "Booking for your property '" +
                        booking.getProperty().getTitle() + "' was cancelled by user."
        );

        return saved;
    }
}
