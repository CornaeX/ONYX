package com.cnx.onyxbackend.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
public class SpinQuestSession {

    @Id
    private String id;

    // private String uid;
    // private double betAmount;

    @ElementCollection
    private List<String> result; // 3 symbols

    // private double payout;
}