package com.apnaghar.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RatingSummaryResponse {

    private double averageRating;
    private long totalReviews;
}
