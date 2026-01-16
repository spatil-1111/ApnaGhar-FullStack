package com.apnaghar.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OwnerDashboardResponse {

    private double totalEarnings;
    private double monthlyEarnings;
    private long totalBookings;
    private long activeProperties;
}
