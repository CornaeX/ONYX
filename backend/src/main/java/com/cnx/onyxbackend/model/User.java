package com.cnx.onyxbackend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "users")
@Data // Lombok annotation: auto-generates Getters, Setters, and Constructors
public class User {

    // The ID is now a String to match the Firebase Auth UID
    @Id
    private String uid; 

    private String email;
    private double balance = 0.0;
    
    // Blackjack & Rakeback Stats
    private double totalWagered = 0.0;
    private double rakebackAvailable = 0.0;
    private double rakebackClaimed = 0.0;
    private double rakebackRate = 0.01; // Example: 1% rakeback
    
    private String activeGameId;
}