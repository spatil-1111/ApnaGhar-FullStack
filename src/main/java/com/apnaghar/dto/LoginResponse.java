package com.apnaghar.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginResponse {

    private String token;     // 🔑 JWT TOKEN (MOST IMPORTANT)
    private Long userId;
    private String name;
    private String email;
    private String role;
}
