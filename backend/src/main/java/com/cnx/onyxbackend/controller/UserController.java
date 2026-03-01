package com.cnx.onyxbackend.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ExecutionException;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
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

        DocumentSnapshot userDoc = db.collection("users").document(uid).get().get();
        Double rakebackAvailableObj = userDoc.getDouble("rakebackAvailable");
        double rakebackAvailable = rakebackAvailableObj != null ? rakebackAvailableObj : 0.0;

        String username = userDoc.getString("email"); // later change to username
        String role = userDoc.getString("role");
        String walletId = userDoc.getString("walletId");

        DocumentSnapshot walletDoc = db.collection("wallets").document(walletId).get().get();

        // 🔥 FIX: Use getDouble() instead of getLong() so the cents aren't deleted!
        Double balanceObj = walletDoc.getDouble("balance");
        double balance = balanceObj != null ? balanceObj : 0.0;

        Map<String, Object> response = new HashMap<>();
        response.put("uid", uid);
        response.put("username", username);
        response.put("role", role);
        response.put("balance", balance); // Now this sends 15.85 instead of just 15
        response.put("rakeback", rakebackAvailable);

        return response;
    }

    @PostMapping("/deposit")
    public ResponseEntity<?> deposit(
            @AuthenticationPrincipal String uid,
            @RequestBody Map<String, Double> body
    ) {
        try {
            double amount = body.get("amount");
            Firestore db = FirestoreClient.getFirestore();

            // 1. Get Wallet ID (we do this outside the transaction to keep the transaction fast)
            String walletId = db.collection("users").document(uid).get().get().getString("walletId");
            DocumentReference walletRef = db.collection("wallets").document(walletId);

            // 2. Run safely inside a Firestore Transaction
            ApiFuture<Double> futureTransaction = db.runTransaction(transaction -> {
                // Fetch the current state inside the transaction
                DocumentSnapshot snapshot = transaction.get(walletRef).get();
                
                // Handle null balance safely
                Double currentBalance = snapshot.getDouble("balance");
                double startingBalance = currentBalance != null ? currentBalance : 0.0;
                
                double newBalance = startingBalance + amount;

                // Update the document
                transaction.update(walletRef, "balance", newBalance);
                
                return newBalance;
            });

            // 3. Wait for the transaction to finish and get the result
            double finalBalance = futureTransaction.get();
            return ResponseEntity.ok(Map.of("balance", finalBalance));

        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Deposit failed: " + e.getMessage());
        }
    }

    @PostMapping("/withdraw")
    public ResponseEntity<?> withdraw(
            @AuthenticationPrincipal String uid,
            @RequestBody Map<String, Double> body
    ) {
        try {
            double amount = body.get("amount");
            Firestore db = FirestoreClient.getFirestore();

            String walletId = db.collection("users").document(uid).get().get().getString("walletId");
            DocumentReference walletRef = db.collection("wallets").document(walletId);

            ApiFuture<Double> futureTransaction = db.runTransaction(transaction -> {
                DocumentSnapshot snapshot = transaction.get(walletRef).get();
                
                Double currentBalance = snapshot.getDouble("balance");
                double startingBalance = currentBalance != null ? currentBalance : 0.0;

                // Check for insufficient funds INSIDE the transaction
                if (amount > startingBalance) {
                    throw new Exception("Insufficient funds");
                }

                double newBalance = startingBalance - amount;
                transaction.update(walletRef, "balance", newBalance);
                
                return newBalance;
            });

            double finalBalance = futureTransaction.get();
            return ResponseEntity.ok(Map.of("balance", finalBalance));

        } catch (ExecutionException e) {
            // ExecutionException wraps the error we threw inside the transaction
            return ResponseEntity.badRequest().body(e.getCause().getMessage());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Withdrawal failed: " + e.getMessage());
        }
    }
}