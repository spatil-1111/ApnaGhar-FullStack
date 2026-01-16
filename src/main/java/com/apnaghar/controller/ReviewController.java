package com.apnaghar.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.apnaghar.dto.RatingSummaryResponse;
import com.apnaghar.model.Review;
import com.apnaghar.service.ReviewService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    // ✅ ADD REVIEW
    @PostMapping
    public ResponseEntity<Review> addReview(
            @RequestParam Long propertyId,
            @RequestParam int rating,
            @RequestParam(required = false) String comment,
            Authentication authentication) {

        String email = authentication.getName();

        Review review = reviewService.addReview(propertyId, rating, comment, email);

        return ResponseEntity.ok(review);
    }

    // ✅ GET REVIEWS BY PROPERTY
    @GetMapping("/property/{propertyId}")
    public ResponseEntity<List<Review>> getReviews(@PathVariable Long propertyId) {

        return ResponseEntity.ok(reviewService.getReviewsByProperty(propertyId));
    }

    // ⭐ GET RATING SUMMARY
    @GetMapping("/property/{propertyId}/summary")
    public ResponseEntity<RatingSummaryResponse> getRatingSummary(
            @PathVariable Long propertyId) {

        return ResponseEntity.ok(
                reviewService.getRatingSummary(propertyId)
        );
    }
}
