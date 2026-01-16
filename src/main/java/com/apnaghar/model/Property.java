package com.apnaghar.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "properties")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Property {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;      // e.g. PG for Boys

    @Column(nullable = false)
    private String type;       // PG / HOSTEL / FLAT / ROOM

    @Column(nullable = false)
    private String location;   // Pune, Mumbai, etc.

    @Column(nullable = false)
    private Integer rent;

    private Integer bedrooms;

    @Column(length = 500)
    private String amenities;

    private String imageUrl;

    // OWNER who added the property
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_id", nullable = false)
    private User owner;
    
    private boolean available = true;

}
