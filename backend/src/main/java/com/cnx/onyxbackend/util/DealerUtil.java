package com.cnx.onyxbackend.util;

import java.util.List;

public class DealerUtil {
    public static void playDealer(List<String> dealerHand, List<String> deck) {

        while (true) {
            int value = HandUtil.calculateHandValue(dealerHand);

            boolean isSoft = HandUtil.isSoft(dealerHand);

            if (value < 17) {
                dealerHand.add(deck.remove(0));
            } else if (value == 17 && isSoft) {
                dealerHand.add(deck.remove(0));
            } else {
                break;
            }
        }
    }
}
