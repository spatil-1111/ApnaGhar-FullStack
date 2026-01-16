package com.apnaghar.service;

import java.util.List;

import com.apnaghar.dto.RatingSummaryResponse;
import com.apnaghar.model.Review;

public interface ReviewService {

    Review addReview(Long propertyId, int rating, String comment, String userEmail);

    List<Review> getReviewsByProperty(Long propertyId);

    // ⭐ Rating summary
    RatingSummaryResponse getRatingSummary(Long propertyId);
}
