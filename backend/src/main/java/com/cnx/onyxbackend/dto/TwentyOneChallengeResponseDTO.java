package com.cnx.onyxbackend.dto;

import java.util.List;

public class TwentyOneChallengeResponseDTO {

    private String uid;
    private double betAmount;
    private List<String> dealerHand;
    private int activeHandIndex;
    private String status;
    private List<PlayerHandDTO> playerHands;
    private double payout;
    private double balance;
    private double rakebackAvailable;

    // constructor
    public TwentyOneChallengeResponseDTO(
            String uid,
            double betAmount,
            List<String> dealerHand,
            int activeHandIndex,
            String status,
            List<PlayerHandDTO> playerHands,
            double payout,
            double balance,
            double rakebackAvailable
    ) {
        this.uid = uid;
        this.betAmount = betAmount;
        this.dealerHand = dealerHand;
        this.activeHandIndex = activeHandIndex;
        this.status = status;
        this.playerHands = playerHands;
        this.payout = payout;
        this.balance = balance;
        this.rakebackAvailable = rakebackAvailable;
    }

    // getters
    public String getUid() { return uid; }
    public double getBetAmount() { return betAmount; }
    public List<String> getDealerHand() { return dealerHand; }
    public int getActiveHandIndex() { return activeHandIndex; }
    public String getStatus() { return status; }
    public List<PlayerHandDTO> getPlayerHands() { return playerHands; }
    public double getPayout() { return payout; }
    public double getBalance() { return balance; }
    public double getRakebackAvailable() { return rakebackAvailable; }

}