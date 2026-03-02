package com.cnx.onyxbackend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import com.cnx.onyxbackend.util.HandUtil;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
@Data
@NoArgsConstructor  // Jackson needs this to create the object from JSON!
@AllArgsConstructor
public class PlayerHand implements Serializable {
    private List<String> cards = new ArrayList<>();
    private double bet;
    private boolean doubled;

    public boolean isBust() {
    return HandUtil.calculateHandValue(this.cards) > 21;
}

    public int getValue() {
        return HandUtil.calculateHandValue(this.cards);
    }
}