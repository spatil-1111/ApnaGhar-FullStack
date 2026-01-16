package com.apnaghar.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.apnaghar.dto.OwnerDashboardResponse;
import com.apnaghar.service.OwnerDashboardService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/owner/dashboard")
@RequiredArgsConstructor
public class OwnerDashboardController {

    private final OwnerDashboardService dashboardService;

    @GetMapping
    public ResponseEntity<OwnerDashboardResponse> getDashboard(
            Authentication authentication) {

        String email = authentication.getName();
        return ResponseEntity.ok(dashboardService.getDashboard(email));
    }
}
