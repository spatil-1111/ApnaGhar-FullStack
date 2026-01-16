package com.apnaghar.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.apnaghar.model.Review;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    List<Review> findByPropertyId(Long propertyId);

    Optional<Review> findByUserIdAndPropertyId(Long userId, Long propertyId);

    // ⭐ Average rating of property
    @Query("SELECT AVG(r.rating) FROM Review r WHERE r.property.id = :propertyId")
    Double findAverageRating(@Param("propertyId") Long propertyId);

    // ⭐ Total reviews of property
    @Query("SELECT COUNT(r) FROM Review r WHERE r.property.id = :propertyId")
    Long countByProperty(@Param("propertyId") Long propertyId);
}
