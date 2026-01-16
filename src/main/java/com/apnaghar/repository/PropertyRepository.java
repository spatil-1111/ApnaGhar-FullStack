package com.apnaghar.repository;

import com.apnaghar.model.Property;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PropertyRepository extends JpaRepository<Property, Long> {

    // 🔍 Search by location (case-insensitive)
    List<Property> findByLocationContainingIgnoreCase(String location);

    // 🔍 Search by property type (PG / HOSTEL / FLAT / ROOM)
    List<Property> findByTypeIgnoreCase(String type);

    // 🔍 Search by location + type
    List<Property> findByLocationContainingIgnoreCaseAndTypeIgnoreCase(
            String location,
            String type
    );

    // ✅ ADD ONLY THIS (for owner bookings)
    List<Property> findByOwnerId(Long ownerId);

 // ✅ REQUIRED FOR OWNER DASHBOARD
    long countByOwnerIdAndAvailableTrue(Long ownerId);}
