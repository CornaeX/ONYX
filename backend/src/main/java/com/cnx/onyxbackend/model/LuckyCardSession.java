package com.cnx.onyxbackend.model;

import jakarta.persistence.*;
import java.util.*;

@Entity
public class LuckyCardSession {

    @Id
    private String id;

    private String uid;
    private double betAmount;

    @ElementCollection
    private List<Double> multipliers;

    private String status; // PLAYING / FINISHED
    private int selectedIndex;
    private double payout;

    // Getters & Setters

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getUid() { return uid; }
    public void setUid(String uid) { this.uid = uid; }

    public double getBetAmount() { return betAmount; }
    public void setBetAmount(double betAmount) { this.betAmount = betAmount; }

    public List<Double> getMultipliers() { return multipliers; }
    public void setMultipliers(List<Double> multipliers) { this.multipliers = multipliers; }

    public Integer getSelectedIndex() { return selectedIndex; }
    public void setSelectedIndex(Integer selectedIndex) { this.selectedIndex = selectedIndex; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public double getPayout() { return payout; }
    public void setPayout(double payout) { this.payout = payout; }
}