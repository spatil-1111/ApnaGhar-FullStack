package com.apnaghar.service;

import com.apnaghar.dto.RegisterRequest;
import com.apnaghar.model.User;

public interface UserService {

    User registerUser(RegisterRequest request);

    User getUserByEmail(String email);
}
