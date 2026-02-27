package com.cnx.onyxbackend.controller;

import java.time.Instant;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cnx.onyxbackend.service.AuthService;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.auth.FirebaseToken;
import com.google.firebase.cloud.FirestoreClient;

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
    ) throws Exception {

        String token = authHeader.replace("Bearer ", "");
        FirebaseToken decodedToken = authService.verifyToken(token);

        String uid = decodedToken.getUid();
        String email = decodedToken.getEmail();

        Firestore db = FirestoreClient.getFirestore();

        // Create wallet
        String walletId = "wallet_" + uid;

        Map<String, Object> wallet = new HashMap<>();
        wallet.put("walletId", walletId);
        wallet.put("balance", 0);
        wallet.put("createdAt", Instant.now().toString());

        db.collection("wallets")
        .document(walletId)
        .set(wallet)
        .get(); // 🔥 WAIT

        // Create user
        Map<String, Object> user = new HashMap<>();
        user.put("uid", uid);
        user.put("email", email);
        user.put("role", "USER");
        user.put("walletId", walletId);
        user.put("createdAt", Instant.now().toString());

        db.collection("users")
        .document(uid)
        .set(user)
        .get(); // 🔥 WAIT

        return ResponseEntity.ok("User + Wallet created");
    }
}