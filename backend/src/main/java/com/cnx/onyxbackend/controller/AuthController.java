package com.cnx.onyxbackend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cnx.onyxbackend.model.User;
import com.cnx.onyxbackend.service.AuthService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(
            @RequestHeader("Authorization") String authHeader
    ) {
        try {
            // 1. Extract the token
            String token = authHeader.replace("Bearer ", "");
            
            // 2. Verify token and save the user to PostgreSQL (Wallet is included inside User!)
            User savedUser = authService.getOrCreateUserFromToken(token);

            // 3. Return success
            return ResponseEntity.ok(savedUser);
            
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Registration failed: " + e.getMessage());
        }
    }
}