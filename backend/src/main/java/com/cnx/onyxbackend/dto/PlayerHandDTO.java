package com.cnx.onyxbackend.dto;

import java.util.List;

public class PlayerHandDTO {

    private List<String> cards;
    private double bet;
    private boolean doubled;

    public PlayerHandDTO(List<String> cards, double bet, boolean doubled) {
        this.cards = cards;
        this.bet = bet;
        this.doubled = doubled;
    }

    public List<String> getCards() { return cards; }
    public double getBet() { return bet; }
    public boolean isDoubled() { return doubled; }
}