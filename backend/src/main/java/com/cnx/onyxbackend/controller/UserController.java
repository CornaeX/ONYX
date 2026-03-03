package com.cnx.onyxbackend.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cnx.onyxbackend.model.User;
import com.cnx.onyxbackend.service.TransactionService;
import com.cnx.onyxbackend.service.UserService;
@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;
    private final TransactionService transactionService;

    // Inject our new PostgreSQL Repository and Transaction Service
    public UserController(UserService userService, TransactionService transactionService) {
        this.userService = userService;
        this.transactionService = transactionService;
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(Authentication authentication) {
        try {
            // Get the Firebase UID from the security token
            String uid = authentication.getName();

            // Fetch the user directly from PostgreSQL
            User user = userService.getUserProfile(uid);

            // Build the response exactly how the frontend expects it
            Map<String, Object> response = new HashMap<>();
            response.put("uid", user.getUid());
            response.put("username", user.getEmail());
            response.put("role", "USER");
            response.put("balance", user.getBalance());
            response.put("rakeback", user.getRakebackAvailable());

            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(403).body("Error fetching profile: " + e.getMessage());
        }
    }

    @PostMapping("/deposit")
    public ResponseEntity<?> deposit(
            Authentication authentication,
            @RequestBody Map<String, Double> body
    ) {
        try {
            String uid = authentication.getName();
            double amount = body.get("amount");

            // Use the TransactionService we updated earlier!
            User updatedUser = transactionService.deposit(uid, amount);

            return ResponseEntity.ok(Map.of("balance", updatedUser.getBalance()));

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Deposit failed: " + e.getMessage());
        }
    }

    @PostMapping("/withdraw")
    public ResponseEntity<?> withdraw(
            Authentication authentication,
            @RequestBody Map<String, Double> body
    ) {
        try {
            String uid = authentication.getName();
            double amount = body.get("amount");

            // Use the TransactionService we updated earlier!
            User updatedUser = transactionService.withdraw(uid, amount);

            return ResponseEntity.ok(Map.of("balance", updatedUser.getBalance()));

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Withdrawal failed: " + e.getMessage());
        }
    }

    @PostMapping("/claim-rakeback")
    public ResponseEntity<?> claimRakeback(
            Authentication authentication
    ) throws Exception {

        String uid = authentication.getName();

        Map<String, Double> result = transactionService.claimRakeback(uid);

        return ResponseEntity.ok(result);
    }
}