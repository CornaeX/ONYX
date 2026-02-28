package com.cnx.onyxbackend.util;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class DeckUtil {

    private static final String[] SUITS = {"♥", "♦", "♣", "♠"};
    private static final String[] RANKS = {
            "2","3","4","5","6","7","8","9","10","J","Q","K","A"
    };

    public static List<String> generateShuffledDeck() {
        List<String> deck = new ArrayList<>();

        for (String suit : SUITS) {
            for (String rank : RANKS) {
                deck.add(rank + suit);
            }
        }

        Collections.shuffle(deck);
        return deck;
    }
}
