package com.cnx.onyxbackend.service;

import com.cnx.onyxbackend.model.User;
import com.cnx.onyxbackend.repository.UserRepository;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    public FirebaseToken verifyToken(String token) throws Exception {
        return FirebaseAuth.getInstance().verifyIdToken(token);
    }

    // Call this from your AuthController when a user registers or logs in
    public User getOrCreateUserFromToken(String token) throws Exception {
        FirebaseToken decodedToken = verifyToken(token);
        String uid = decodedToken.getUid();
        String email = decodedToken.getEmail();

        Optional<User> existingUser = userRepository.findById(uid);
        
        if (existingUser.isPresent()) {
            return existingUser.get();
        } else {
            // Create a brand new user in PostgreSQL with a $0 balance
            User newUser = new User();
            newUser.setUid(uid);
            newUser.setEmail(email);
            newUser.setBalance(0.0);
            newUser.setTotalWagered(0.0);
            newUser.setRakebackAvailable(0.0);
            newUser.setRakebackClaimed(0.0);
            newUser.setRakebackRate(0.01); // 1% default
            
            return userRepository.save(newUser);
        }
    }
}