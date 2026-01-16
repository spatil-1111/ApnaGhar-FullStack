package com.apnaghar.service;

import com.apnaghar.model.Property;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface PropertyService {

    // ✅ Owner adds property
    Property addProperty(Property property, String ownerEmail);

    // ✅ Existing (keep it)
    List<Property> getAllProperties();

    // 🔥 NEW – pagination support
    Page<Property> getAllProperties(Pageable pageable);

    // ✅ Search by location
    List<Property> searchByLocation(String location);

    // ✅ Search by type
    List<Property> searchByType(String type);

    // ✅ Search by location + type
    List<Property> search(String location, String type);
    
    Property getPropertyById(Long id);

    List<Property> getMyProperties(String ownerEmail);

    //this is for delete property
    void deleteProperty(Long propertyId, String ownerEmail);

    // this is for update feature of property
    Property updateProperty(Long propertyId, Property updatedProperty, String ownerEmail);

}
