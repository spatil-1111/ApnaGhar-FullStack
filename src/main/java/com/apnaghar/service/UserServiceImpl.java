package com.apnaghar.service;

import com.apnaghar.dto.RegisterRequest;
import com.apnaghar.model.User;
import com.apnaghar.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.apnaghar.model.Role;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    // ✅ REGISTER USER (ROLE FIXED)
    @Override
    public User registerUser(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already registered");
        }

        // ✅ DEFAULT ROLE SAFETY (if frontend doesn't send)
        Role role = request.getRole() != null ? request.getRole() : Role.USER;

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(role)              // ✅ NOW USING REQUEST ROLE
                .enabled(true)
                .build();

        return userRepository.save(user);
    }

    // ✅ FETCH USER BY EMAIL
    @Override
    public User getUserByEmail(String email) {
        return userRepository
                .findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}
