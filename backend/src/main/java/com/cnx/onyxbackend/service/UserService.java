package com.cnx.onyxbackend.service;

import com.cnx.onyxbackend.model.User;
import com.cnx.onyxbackend.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User getUserProfile(String uid) {
        return userRepository.findById(uid)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}