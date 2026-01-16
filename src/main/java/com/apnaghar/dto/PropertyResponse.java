package com.apnaghar.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class PropertyResponse {

    private Long id;
    private String title;
    private String type;
    private String location;
    private Integer rent;
    private Integer bedrooms;
    private String amenities;
    private String imageUrl;
    private boolean available;

    // Owner info (SAFE)
    private UserResponse owner;
}
