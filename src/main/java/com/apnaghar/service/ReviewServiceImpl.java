package com.apnaghar.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.apnaghar.dto.RatingSummaryResponse;
import com.apnaghar.model.*;
import com.apnaghar.model.enums.BookingStatus;
import com.apnaghar.model.enums.PaymentStatus;
import com.apnaghar.repository.*;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;
    private final PropertyRepository propertyRepository;
    private final BookingRepository bookingRepository;
    private final PaymentRepository paymentRepository;

    @Override
    public Review addReview(Long propertyId, int rating, String comment, String userEmail) {

        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Property property = propertyRepository.findById(propertyId)
                .orElseThrow(() -> new RuntimeException("Property not found"));

        Booking booking = bookingRepository
                .findTopByUserIdAndPropertyIdAndStatus(user.getId(), propertyId, BookingStatus.CONFIRMED)
                .orElseThrow(() -> new RuntimeException("You must book this property before reviewing"));

        boolean paid = paymentRepository
                .existsByBookingIdAndStatus(booking.getId(), PaymentStatus.SUCCESS);

        if (!paid) {
            throw new RuntimeException("Payment required before submitting review");
        }

        if (reviewRepository.findByUserIdAndPropertyId(user.getId(), propertyId).isPresent()) {
            throw new RuntimeException("You already reviewed this property");
        }

        Review review = Review.builder()
                .rating(rating)
                .comment(comment)
                .createdAt(LocalDateTime.now())
                .user(user)
                .property(property)
                .build();

        return reviewRepository.save(review);
    }

    @Override
    public List<Review> getReviewsByProperty(Long propertyId) {
        return reviewRepository.findByPropertyId(propertyId);
    }

    // ⭐ RATING SUMMARY
    @Override
    public RatingSummaryResponse getRatingSummary(Long propertyId) {

        Double avg = reviewRepository.findAverageRating(propertyId);
        Long count = reviewRepository.countByProperty(propertyId);

        return RatingSummaryResponse.builder()
                .averageRating(avg == null ? 0.0 : avg)
                .totalReviews(count == null ? 0 : count)
                .build();
    }
}
