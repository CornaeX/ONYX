package com.cnx.onyxbackend.service;

import com.cnx.onyxbackend.model.User;
import com.cnx.onyxbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class TransactionService {

    @Autowired
    private UserRepository userRepository;

    // @Transactional tells Spring to open a database transaction.
    // Once the method finishes, the transaction commits and the lock releases.
    @Transactional 
    public User deposit(Long userId, double amount) {
        
        // 1. Fetch and LOCK the user. If another thread is already modifying this user,
        // this line will wait until the other thread is done.
        User user = userRepository.findByIdForUpdate(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // 2. Do the math safely
        double newBalance = user.getBalance() + amount;
        user.setBalance(newBalance);

        // 3. Save the new balance
        return userRepository.save(user);
    }
}