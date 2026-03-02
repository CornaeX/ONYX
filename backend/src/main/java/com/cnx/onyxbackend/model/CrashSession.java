package com.cnx.onyxbackend.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "crash_sessions")
@Data
public class CrashSession {

    @Id
    private String id = UUID.randomUUID().toString();

    private String uid;
    private double betAmount;
    private double crashPoint;
    private boolean cashedOut = false;
    private double cashoutMultiplier;
    private String status; // ACTIVE, CRASHED, CASHED_OUT

    private Instant createdAt = Instant.now();
}