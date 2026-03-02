package com.cnx.onyxbackend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "blackjack_sessions")
@Data
public class BlackjackSession {

    @Id
    private String id; // We will use UUID here

    private String uid;
    private double betAmount;
    private int activeHandIndex = 0;
    private String status;
    private Instant createdAt = Instant.now();

    // The Magic: This tells Hibernate to save these arrays as Postgres JSONB!
    @JdbcTypeCode(SqlTypes.JSON)
    private List<String> deck = new ArrayList<>();

    @JdbcTypeCode(SqlTypes.JSON)
    private List<String> dealerHand = new ArrayList<>();

    @JdbcTypeCode(SqlTypes.JSON)
    private List<PlayerHand> playerHands = new ArrayList<>();
}