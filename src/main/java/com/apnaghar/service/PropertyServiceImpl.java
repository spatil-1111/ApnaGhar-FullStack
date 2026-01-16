package com.apnaghar.service;

import com.apnaghar.model.Property;
import com.apnaghar.model.User;
import com.apnaghar.repository.PropertyRepository;
import com.apnaghar.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PropertyServiceImpl implements PropertyService {

    private final PropertyRepository propertyRepository;
    private final UserRepository userRepository;

    // ✅ Owner adds property
    @Override
    public Property addProperty(Property property, String ownerEmail) {

        User owner = userRepository.findByEmail(ownerEmail)
                .orElseThrow(() -> new RuntimeException("Owner not found"));

        property.setOwner(owner);
        return propertyRepository.save(property);
    }

    // ✅ Existing method (KEEP)
    @Override
    public List<Property> getAllProperties() {
        return propertyRepository.findAll();
    }

    // 🔥 NEW – pagination method
    @Override
    public Page<Property> getAllProperties(Pageable pageable) {
        return propertyRepository.findAll(pageable);
    }

    // ✅ Search by location
    @Override
    public List<Property> searchByLocation(String location) {
        return propertyRepository.findByLocationContainingIgnoreCase(location);
    }

    // ✅ Search by type
    @Override
    public List<Property> searchByType(String type) {
        return propertyRepository.findByTypeIgnoreCase(type);
    }

    // ✅ Search by location + type
    @Override
    public List<Property> search(String location, String type) {
        return propertyRepository
                .findByLocationContainingIgnoreCaseAndTypeIgnoreCase(location, type);
    }
    
    @Override
    public Property getPropertyById(Long id) {
        return propertyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Property not found"));
    }
    
    @Override
    public List<Property> getMyProperties(String ownerEmail) {

        User owner = userRepository.findByEmail(ownerEmail)
                .orElseThrow(() -> new RuntimeException("Owner not found"));

        return propertyRepository.findByOwnerId(owner.getId());
    }
    
    
    @Override
    public void deleteProperty(Long propertyId, String ownerEmail) {

        User owner = userRepository.findByEmail(ownerEmail)
                .orElseThrow(() -> new RuntimeException("Owner not found"));

        Property property = propertyRepository.findById(propertyId)
                .orElseThrow(() -> new RuntimeException("Property not found"));

        // 🔒 Ensure owner owns this property
        if (!property.getOwner().getId().equals(owner.getId())) {
            throw new RuntimeException("You are not allowed to delete this property");
        }

        propertyRepository.delete(property);
    }


    //this is for update property 
    @Override
    public Property updateProperty(Long propertyId, Property updatedProperty, String ownerEmail) {

        User owner = userRepository.findByEmail(ownerEmail)
                .orElseThrow(() -> new RuntimeException("Owner not found"));

        Property existing = propertyRepository.findById(propertyId)
                .orElseThrow(() -> new RuntimeException("Property not found"));

        // 🔒 Owner validation
        if (!existing.getOwner().getId().equals(owner.getId())) {
            throw new RuntimeException("You are not allowed to update this property");
        }

        // ✅ Update allowed fields only
        existing.setTitle(updatedProperty.getTitle());
        existing.setType(updatedProperty.getType());
        existing.setLocation(updatedProperty.getLocation());
        existing.setRent(updatedProperty.getRent());
        existing.setBedrooms(updatedProperty.getBedrooms());
        existing.setAmenities(updatedProperty.getAmenities());
        existing.setAvailable(updatedProperty.isAvailable());

        return propertyRepository.save(existing);
    }


}
