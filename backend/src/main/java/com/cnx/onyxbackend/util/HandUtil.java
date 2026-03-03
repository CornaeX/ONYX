package com.cnx.onyxbackend.util;

import java.util.List;

public class HandUtil {

    public static int calculateHandValue(List<String> hand) {
        int total = 0;
        int aceCount = 0;

        for (String card : hand) {
            String rank = card.substring(0, card.length() - 1);

            switch (rank) {
                case "J":
                case "Q":
                case "K":
                    total += 10;
                    break;
                case "A":
                    total += 11;
                    aceCount++;
                    break;
                default:
                    total += Integer.parseInt(rank);
            }
        }

        // Convert A from 11 → 1 if bust
        while (total > 21 && aceCount > 0) {
            total -= 10;
            aceCount--;
        }

        return total;
    }

    public static boolean isBlackjack(List<String> hand) {
        return hand.size() == 2 && calculateHandValue(hand) == 21;
    }

    public static boolean isSoft(List<String> hand) {
        int aceCount = 0;

        for (String card : hand) {
            String rank = card.substring(0, card.length() - 1);
            if (rank.equals("A")) {
                aceCount++;
            }
        }

        int hardTotal = 0;
        for (String card : hand) {
            String rank = card.substring(0, card.length() - 1);
            if (rank.equals("A")) {
                hardTotal += 1;
            } else if (rank.equals("J") || rank.equals("Q") || rank.equals("K")) {
                hardTotal += 10;
            } else {
                hardTotal += Integer.parseInt(rank);
            }
        }

        return aceCount > 0 && hardTotal + 10 <= 21;
    }
}
