package com.apnaghar.controller;

import com.apnaghar.dto.PropertyResponse;
import com.apnaghar.dto.UserResponse;
import com.apnaghar.model.Property;
import com.apnaghar.service.PropertyService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication; // ✅ THIS WAS MISSING

import java.util.List;

@RestController
@RequestMapping("/api/properties")
@RequiredArgsConstructor
//@CrossOrigin(origins = "*")
public class PropertyController {

	private final PropertyService propertyService;

	// ✅ Add property (OWNER)
	@PostMapping
	public ResponseEntity<PropertyResponse> addProperty(@RequestBody Property property,
			@RequestParam String ownerEmail) {
		Property saved = propertyService.addProperty(property, ownerEmail);
		return ResponseEntity.ok(mapToResponse(saved));
	}

	// 🔥 PAGINATED – Get all properties (PUBLIC)
	@GetMapping
	public ResponseEntity<Page<PropertyResponse>> getAllProperties(
			@PageableDefault(size = 5, sort = "id") Pageable pageable) {
		return ResponseEntity.ok(propertyService.getAllProperties(pageable).map(this::mapToResponse));
	}

	// 🔍 Search by location
	@GetMapping("/search/location")
	public ResponseEntity<List<PropertyResponse>> searchByLocation(@RequestParam String location) {
		return ResponseEntity.ok(propertyService.searchByLocation(location).stream().map(this::mapToResponse).toList());
	}

	// 🔍 Search by type
	@GetMapping("/search/type")
	public ResponseEntity<List<PropertyResponse>> searchByType(@RequestParam String type) {
		return ResponseEntity.ok(propertyService.searchByType(type).stream().map(this::mapToResponse).toList());
	}

	// 🔍 Search by location + type
	@GetMapping("/search")
	public ResponseEntity<List<PropertyResponse>> search(@RequestParam String location, @RequestParam String type) {
		return ResponseEntity.ok(propertyService.search(location, type).stream().map(this::mapToResponse).toList());
	}

	// 🔍 Get property by ID (PUBLIC)
	@GetMapping("/{id}")
	public ResponseEntity<PropertyResponse> getPropertyById(@PathVariable Long id) {
		Property property = propertyService.getPropertyById(id);
		return ResponseEntity.ok(mapToResponse(property));
	}

	// 🔒 OWNER – Get my properties
	@GetMapping("/owner")
	public ResponseEntity<List<PropertyResponse>> getMyProperties(Authentication authentication) {
		String ownerEmail = authentication.getName();

		return ResponseEntity
				.ok(propertyService.getMyProperties(ownerEmail).stream().map(this::mapToResponse).toList());
	}

	// ===============================
	// ENTITY → DTO MAPPER
	// ===============================
	private PropertyResponse mapToResponse(Property property) {

		return PropertyResponse.builder().id(property.getId()).title(property.getTitle()).type(property.getType())
				.location(property.getLocation()).rent(property.getRent()).bedrooms(property.getBedrooms())
				.amenities(property.getAmenities()).imageUrl(property.getImageUrl()).available(property.isAvailable())
				.owner(UserResponse.builder().id(property.getOwner().getId()).name(property.getOwner().getName())
						.email(property.getOwner().getEmail()).role(property.getOwner().getRole().name()).build())
				.build();
	}

	// 🗑 OWNER – Delete my property
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteProperty(@PathVariable Long id, Authentication authentication) {

	    String ownerEmail = authentication.getName();

	    try {
	        propertyService.deleteProperty(id, ownerEmail);
	        return ResponseEntity.ok("Property deleted successfully");
	    } catch (RuntimeException ex) {
	        return ResponseEntity.badRequest().body(ex.getMessage());
	    }
	}

	
	// ✏️ OWNER – Update my property
	@PutMapping("/{id}")
	public ResponseEntity<PropertyResponse> updateProperty(
	        @PathVariable Long id,
	        @RequestBody Property updatedProperty,
	        Authentication authentication
	) {
	    String ownerEmail = authentication.getName();
	    Property saved = propertyService.updateProperty(id, updatedProperty, ownerEmail);
	    return ResponseEntity.ok(mapToResponse(saved));
	}


}