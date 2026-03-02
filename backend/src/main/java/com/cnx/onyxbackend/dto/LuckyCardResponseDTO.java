package com.cnx.onyxbackend.dto;

import java.util.List;

public class LuckyCardResponseDTO {

    private String uid;
    private double betAmount;
    private List<Double> multipliers;
    private String status;
    private double payout;
    private double balance;

    public LuckyCardResponseDTO(
        String uid,
        double betAmount,
        List<Double> multipliers,
        String status,
        double payout,
        double balance
    ) {
        this.uid = uid;
        this.betAmount = betAmount;
        this.multipliers = multipliers;
        this.status = status;
        this.payout = payout;
        this.balance = balance;
    }

    public String getUid() { return uid; }
    public double getBetAmount() { return betAmount; }
    public List<Double> getMultipliers() { return multipliers; }
    public String getStatus() { return status; }
    public double getPayout() { return payout; }
    public double getBalance() { return balance; }
}