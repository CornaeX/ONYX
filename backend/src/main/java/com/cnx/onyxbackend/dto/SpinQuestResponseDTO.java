package com.cnx.onyxbackend.dto;

import java.util.List;

public class SpinQuestResponseDTO {

    private List<String> result;
    private double payout;
    private double balance;
    private double rakebackAvailable;

    public SpinQuestResponseDTO(
        List<String> result,
        double payout,
        double balance,
        double rakebackAvailable
    ) {
        this.result = result;
        this.payout = payout;
        this.balance = balance;
        this.rakebackAvailable = rakebackAvailable;
    }

    public List<String> getResult() { return result; }
    public double getPayout() { return payout; }
    public double getBalance() { return balance; }
    public double getRakebackAvailable() { return rakebackAvailable; }
}