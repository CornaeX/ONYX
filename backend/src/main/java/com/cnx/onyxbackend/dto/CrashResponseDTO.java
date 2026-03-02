package com.cnx.onyxbackend.dto;

public class CrashResponseDTO {

    private double multiplier;
    private boolean crashed;
    private double payout;
    private double balance;
    private double rakebackAvailable;
    private String sessionId;
    private double crashPoint;

    public CrashResponseDTO(
            double multiplier,
            boolean crashed,
            double payout,
            double balance,
            double rakebackAvailable,
            String sessionId,
            double crashPoint
    ) {
        this.multiplier = multiplier;
        this.crashed = crashed;
        this.payout = payout;
        this.balance = balance;
        this.rakebackAvailable = rakebackAvailable;
        this.sessionId = sessionId;
        this.crashPoint = crashPoint;
    }

    public double getMultiplier() { return multiplier; }
    public boolean isCrashed() { return crashed; }
    public double getPayout() { return payout; }
    public double getBalance() { return balance; }
    public double getRakebackAvailable() { return rakebackAvailable; }
    public String getSessionId() { return sessionId; }
    public double getCrashPoint() { return crashPoint; }
}