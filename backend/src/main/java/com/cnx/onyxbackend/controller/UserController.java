package com.cnx.onyxbackend.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.cloud.FirestoreClient;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @GetMapping("/profile")
    public Map<String, Object> getProfile(Authentication authentication) throws Exception {

        String uid = authentication.getName();

        Firestore db = FirestoreClient.getFirestore();

        DocumentSnapshot userDoc =
                db.collection("users").document(uid).get().get();

        String username = userDoc.getString("email"); // later change to username
        String role = userDoc.getString("role");
        String walletId = userDoc.getString("walletId");

        DocumentSnapshot walletDoc =
                db.collection("wallets").document(walletId).get().get();

        Long balance = walletDoc.getLong("balance");

        Map<String, Object> response = new HashMap<>();
        response.put("uid", uid);
        response.put("username", username);
        response.put("role", role);
        response.put("balance", balance);

        return response;
    }
}