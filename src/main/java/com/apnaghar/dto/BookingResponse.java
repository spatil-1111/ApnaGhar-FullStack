package com.apnaghar.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@Builder
public class BookingResponse {

    private Long id;
    private LocalDate bookingDate;
    private LocalDate startDate;
    private LocalDate endDate;
    private String status;

    private UserResponse user;
    private PropertyResponse property;
}
