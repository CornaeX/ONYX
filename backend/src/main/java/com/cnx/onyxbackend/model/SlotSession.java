package com.cnx.onyxbackend.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
public class SlotSession {

    @Id
    private String id;

    // private String uid;
    // private double betAmount;

    @ElementCollection
    private List<String> result; // 3 symbols

    // private double payout;
}