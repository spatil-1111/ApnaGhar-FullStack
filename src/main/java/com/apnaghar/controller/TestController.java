package com.apnaghar.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/test")
public class TestController {

    // USER, OWNER, ADMIN
    @GetMapping("/user")
    @PreAuthorize("hasAnyRole('USER','OWNER','ADMIN')")
    public String userAccess() {
        return "USER API accessed successfully";
    }

    // OWNER, ADMIN
    @GetMapping("/owner")
    @PreAuthorize("hasAnyRole('OWNER','ADMIN')")
    public String ownerAccess() {
        return "OWNER API accessed successfully";
    }

    // ADMIN only
    @GetMapping("/admin")
    @PreAuthorize("hasRole('ADMIN')")
    public String adminAccess() {
        return "ADMIN API accessed successfully";
    }
}
