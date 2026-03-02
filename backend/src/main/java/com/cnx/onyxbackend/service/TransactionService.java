package com.cnx.onyxbackend.service;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cnx.onyxbackend.model.User;
import com.cnx.onyxbackend.repository.UserRepository;

@Service
public class TransactionService {

    @Autowired
    private UserRepository userRepository;

    @Transactional 
    public User deposit(String uid, double amount) { // CHANGED: Long userId -> String uid
        
        // PESSIMISTIC_WRITE lock ensures no double-spending
        User user = userRepository.findByIdForUpdate(uid) // CHANGED: userId -> uid
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Do the math safely
        double newBalance = user.getBalance() + amount;
        user.setBalance(newBalance);

        // Save the new balance to PostgreSQL
        return userRepository.save(user);
    }
    
    @Transactional 
    public User withdraw(String uid, double amount) {
        User user = userRepository.findByIdForUpdate(uid)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (user.getBalance() < amount) {
            throw new RuntimeException("Insufficient funds");
        }

        user.setBalance(user.getBalance() - amount);
        return userRepository.save(user);
    }

    @Transactional
    public Map<String, Double> claimRakeback(String uid) throws Exception {
        // 🔥 FIXED: Changed return type in header from BlackjackResponseDTO to Map<String, Double>
        User user = userRepository.findByIdForUpdate(uid).orElseThrow();

        double amountToClaim = Math.floor(user.getRakebackAvailable());
        if (amountToClaim < 1.0) throw new RuntimeException("You need at least $1.00 to claim.");

        user.setBalance(user.getBalance() + amountToClaim);
        user.setRakebackAvailable(user.getRakebackAvailable() - amountToClaim);
        user.setRakebackClaimed(user.getRakebackClaimed() + amountToClaim);

        userRepository.save(user);
        return Map.of("claimed", amountToClaim);
    }
}