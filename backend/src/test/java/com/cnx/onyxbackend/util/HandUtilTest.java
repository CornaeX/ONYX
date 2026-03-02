package com.cnx.onyxbackend.util;

import org.junit.jupiter.api.Test;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

class HandUtilTest {

    @Test
    void calculateHandValue_shouldReturn21_forBlackjack() {
        List<String> hand = List.of("A♠", "K♦");

        int value = HandUtil.calculateHandValue(hand);

        assertEquals(21, value);
        assertTrue(HandUtil.isBlackjack(hand));
    }

    @Test
    void calculateHandValue_shouldHandleSoftAceCorrectly() {
        List<String> hand = List.of("A♠", "9♦", "5♣"); 
        // A=11 + 9 + 5 = 25 → convert Ace to 1 → total = 15

        int value = HandUtil.calculateHandValue(hand);

        assertEquals(15, value);
    }

    @Test
    void generateShuffledDeck_shouldContain52Cards() {
        var deck = DeckUtil.generateShuffledDeck();

        assertEquals(52, deck.size());
        assertEquals(52, deck.stream().distinct().count());
    }
}