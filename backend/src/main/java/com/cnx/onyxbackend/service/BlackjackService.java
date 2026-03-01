package com.cnx.onyxbackend.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.cnx.onyxbackend.model.GameStatus;
import com.cnx.onyxbackend.util.DeckUtil;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.FieldValue;
import com.google.cloud.firestore.Firestore;


@Service
public class BlackjackService {

    private final Firestore db;

    public BlackjackService(Firestore db) {
        this.db = db;
    }

    public Map<String, Object> startGame(String uid, double bet) throws Exception {

        return db.runTransaction(transaction -> {

            DocumentReference userRef = db.collection("users").document(uid);
            DocumentSnapshot userDoc = transaction.get(userRef).get();

            Double totalWageredObj = userDoc.getDouble("totalWagered");
            Double rakeAvailableObj = userDoc.getDouble("rakebackAvailable");
            Double rakeRateObj = userDoc.getDouble("rakebackRate");

            double totalWagered = totalWageredObj != null ? totalWageredObj : 0.0;
            double rakeAvailable = rakeAvailableObj != null ? rakeAvailableObj : 0.0;
            double rakeRate = rakeRateObj != null ? rakeRateObj : 0.01;

            double rakeEarned = bet * rakeRate;

            if (!userDoc.exists()) {
                throw new RuntimeException("User not found");
            }

            String activeGameId = userDoc.getString("activeGameId");
            if (activeGameId != null) {
                throw new RuntimeException("Game already active");
            }

            String walletId = userDoc.getString("walletId");
            if (walletId == null) {
                throw new RuntimeException("Wallet not found");
            }

            DocumentReference walletRef = db.collection("wallets").document(walletId);
            DocumentSnapshot walletDoc = transaction.get(walletRef).get();

            if (!walletDoc.exists()) {
                throw new RuntimeException("Wallet document missing");
            }

            Double balanceObj = walletDoc.getDouble("balance");
            double balance = balanceObj != null ? balanceObj : 0.0;

            if (balance < bet) {
                throw new RuntimeException("Insufficient balance");
            }

            // Deduct bet
            transaction.update(walletRef, "balance", balance - bet);

            // Update rake tracking
            transaction.update(userRef, Map.of(
                "totalWagered", totalWagered + bet,
                "rakebackAvailable", rakeAvailable + rakeEarned
            ));

            // Generate deck
            List<String> deck = DeckUtil.generateShuffledDeck();

            List<String> playerHand = new ArrayList<>();
            List<String> dealerHand = new ArrayList<>();

            playerHand.add(deck.remove(0));
            dealerHand.add(deck.remove(0));
            playerHand.add(deck.remove(0));
            dealerHand.add(deck.remove(0));

            String gameId = UUID.randomUUID().toString();

            Map<String, Object> session = new HashMap<>();
            session.put("uid", uid);
            session.put("walletId", walletId);
            session.put("betAmount", bet);
            session.put("deck", deck);
            Map<String, Object> firstHand = new HashMap<>();
            firstHand.put("cards", playerHand);
            firstHand.put("bet", bet);
            firstHand.put("doubled", false);

            List<Map<String, Object>> hands = new ArrayList<>();
            hands.add(firstHand);

            session.put("playerHands", hands);
            session.put("dealerHand", dealerHand);
            session.put("activeHandIndex", 0);
            session.put("status", GameStatus.PLAYER_TURN.name());
            session.put("createdAt", FieldValue.serverTimestamp());

            DocumentReference gameRef = db.collection("blackjack_sessions").document(gameId);
            transaction.set(gameRef, session);

            transaction.update(userRef, "activeGameId", gameId);

            return session;
        }).get();
    }

    public Map<String, Object> hit(String uid) throws Exception {

        return db.runTransaction(transaction -> {

            DocumentReference userRef = db.collection("users").document(uid);
            DocumentSnapshot userDoc = transaction.get(userRef).get();

            String gameId = userDoc.getString("activeGameId");
            if (gameId == null) {
                throw new RuntimeException("No active game");
            }

            DocumentReference gameRef = db.collection("blackjack_sessions").document(gameId);
            DocumentSnapshot gameDoc = transaction.get(gameRef).get();

            if (!gameDoc.exists()) {
                throw new RuntimeException("Game session missing");
            }

            if (!uid.equals(gameDoc.getString("uid"))) {
                throw new RuntimeException("Unauthorized game access");
            }

            String status = gameDoc.getString("status");
            if (!"PLAYER_TURN".equals(status)) {
                throw new RuntimeException("Not player's turn");
            }

            List<String> deck = (List<String>) gameDoc.get("deck");
            List<Map<String, Object>> hands =
                    (List<Map<String, Object>>) gameDoc.get("playerHands");

            int activeHandIndex = ((Long) gameDoc.get("activeHandIndex")).intValue();

            Map<String, Object> currentHand = hands.get(activeHandIndex);
            List<String> cards = (List<String>) currentHand.get("cards");

            // Draw card
            cards.add(deck.remove(0));

            int value = com.cnx.onyxbackend.util.HandUtil.calculateHandValue(cards);

            // If bust → move to next hand or dealer
            if (value > 21) {

                if (activeHandIndex + 1 < hands.size()) {
                    activeHandIndex++;
                } else {
                    transaction.update(gameRef, "status", "DEALER_TURN");
                }
            }

            transaction.update(gameRef, Map.of(
                    "deck", deck,
                    "playerHands", hands,
                    "activeHandIndex", activeHandIndex
            ));

            // Update local session map manually
            Map<String, Object> updatedSession = gameDoc.getData();
            updatedSession.put("deck", deck);
            updatedSession.put("playerHands", hands);
            updatedSession.put("activeHandIndex", activeHandIndex);

            if ("DEALER_TURN".equals(status)) {
                updatedSession.put("status", "DEALER_TURN");
            }

            return updatedSession;
        }).get();
    }

    public Map<String, Object> stand(String uid) throws Exception {

        return db.runTransaction(transaction -> {

            DocumentReference userRef = db.collection("users").document(uid);
            DocumentSnapshot userDoc = transaction.get(userRef).get();

            String gameId = userDoc.getString("activeGameId");
            if (gameId == null) {
                throw new RuntimeException("No active game");
            }

            DocumentReference gameRef = db.collection("blackjack_sessions").document(gameId);
            DocumentSnapshot gameDoc = transaction.get(gameRef).get();

            if (!gameDoc.exists()) {
                throw new RuntimeException("Game not found");
            }

            if (!uid.equals(gameDoc.getString("uid"))) {
                throw new RuntimeException("Unauthorized");
            }

            List<Map<String, Object>> hands = (List<Map<String, Object>>) gameDoc.get("playerHands");
            int activeHandIndex = gameDoc.get("activeHandIndex") != null ? ((Long) gameDoc.get("activeHandIndex")).intValue() : 0;

            // ---- HANDLE SPLIT STANDS FIRST ----
            // If they stand, but there is another hand (like after a split), advance to the next hand instead of ending the game.
            if (activeHandIndex + 1 < hands.size()) {
                int nextIndex = activeHandIndex + 1;
                transaction.update(gameRef, "activeHandIndex", nextIndex);
                
                // Return updated active index without playing dealer/ending game
                Map<String, Object> result = new HashMap<>(gameDoc.getData());
                result.put("activeHandIndex", nextIndex);
                return result; 
            }

            // ---- IT IS THE LAST HAND, RESOLVE GAME AND DEALER PLAY ----
            List<String> deck = (List<String>) gameDoc.get("deck");
            List<String> dealerHand = (List<String>) gameDoc.get("dealerHand");

            double totalPayout = 0;

            while (com.cnx.onyxbackend.util.HandUtil.calculateHandValue(dealerHand) < 17) {
                dealerHand.add(deck.remove(0));
            }

            int dealerValue = com.cnx.onyxbackend.util.HandUtil.calculateHandValue(dealerHand);

            for (Map<String, Object> hand : hands) {

                List<String> cards = (List<String>) hand.get("cards");
                double bet = ((Number) hand.get("bet")).doubleValue();

                int playerValue = com.cnx.onyxbackend.util.HandUtil.calculateHandValue(cards);
                boolean isBlackjack = cards.size() == 2 && playerValue == 21;

                if (playerValue > 21) {
                    continue; // bust
                }

                if (isBlackjack && dealerValue != 21) {
                    totalPayout += bet * 2.5;
                    continue;
                }

                if (dealerValue > 21 || playerValue > dealerValue) {
                    totalPayout += bet * 2;
                } else if (playerValue == dealerValue) {
                    totalPayout += bet;
                }
            }

            String walletId = gameDoc.getString("walletId");
            DocumentReference walletRef = db.collection("wallets").document(walletId);
            DocumentSnapshot walletDoc = transaction.get(walletRef).get();

            double balance = walletDoc.getDouble("balance");
            transaction.update(walletRef, "balance", balance + totalPayout);
            transaction.update(userRef, "activeGameId", null);
            transaction.delete(gameRef);

            Map<String, Object> result = new HashMap<>();
            result.put("dealerHand", dealerHand);
            result.put("payout", totalPayout);

            return result;

        }).get();
    }

    public Map<String, Object> split(String uid) throws Exception {

        return db.runTransaction(transaction -> {

            DocumentReference userRef = db.collection("users").document(uid);
            DocumentSnapshot userDoc = transaction.get(userRef).get();

            String gameId = userDoc.getString("activeGameId");
            if (gameId == null) {
                throw new RuntimeException("No active game");
            }

            DocumentReference gameRef = db.collection("blackjack_sessions").document(gameId);
            DocumentSnapshot gameDoc = transaction.get(gameRef).get();

            List<String> deck = (List<String>) gameDoc.get("deck");
            List<Map<String, Object>> hands =
                    (List<Map<String, Object>>) gameDoc.get("playerHands");

            if (hands.size() > 1) {
                throw new RuntimeException("Already split");
            }

            Map<String, Object> firstHand = hands.get(0);
            List<String> cards = (List<String>) firstHand.get("cards");
            double bet = ((Number) firstHand.get("bet")).doubleValue();

            if (cards.size() != 2) {
                throw new RuntimeException("Split only allowed on first two cards");
            }

            String rank1 = cards.get(0).substring(0, cards.get(0).length() - 1);
            String rank2 = cards.get(1).substring(0, cards.get(1).length() - 1);

            if (!rank1.equals(rank2)) {
                throw new RuntimeException("Cards must be same rank to split");
            }

            // ---- WALLET CHECK ----
            String walletId = gameDoc.getString("walletId");
            DocumentReference walletRef = db.collection("wallets").document(walletId);
            DocumentSnapshot walletDoc = transaction.get(walletRef).get();

            double balance = walletDoc.getDouble("balance");

            if (balance < bet) {
                throw new RuntimeException("Insufficient balance to split");
            }

            Double rakeRateObj = userDoc.getDouble("rakebackRate");
            Double totalWageredObj = userDoc.getDouble("totalWagered");
            Double rakeAvailableObj = userDoc.getDouble("rakebackAvailable");

            double rakeRate = rakeRateObj != null ? rakeRateObj : 0.01;
            double totalWagered = totalWageredObj != null ? totalWageredObj : 0.0;
            double rakeAvailable = rakeAvailableObj != null ? rakeAvailableObj : 0.0;

            double rakeEarned = bet * rakeRate;

            System.out.println("Rake earned: " + rakeEarned);
            System.out.println("Total wagered after: " + (totalWagered + bet));
            System.out.println("Rake available after: " + (rakeAvailable + rakeEarned));


            transaction.update(userRef, Map.of(
                "totalWagered", totalWagered + bet,
                "rakebackAvailable", rakeAvailable + rakeEarned
            ));

            // Create two hands
            List<String> hand1Cards = new ArrayList<>();
            List<String> hand2Cards = new ArrayList<>();

            hand1Cards.add(cards.get(0));
            hand2Cards.add(cards.get(1));

            hand1Cards.add(deck.remove(0));
            hand2Cards.add(deck.remove(0));

            Map<String, Object> hand1 = new HashMap<>();
            hand1.put("cards", hand1Cards);
            hand1.put("bet", bet);
            hand1.put("doubled", false);

            Map<String, Object> hand2 = new HashMap<>();
            hand2.put("cards", hand2Cards);
            hand2.put("bet", bet);
            hand2.put("doubled", false);

            List<Map<String, Object>> newHands = new ArrayList<>();
            newHands.add(hand1);
            newHands.add(hand2);

            transaction.update(gameRef, Map.of(
                    "deck", deck,
                    "playerHands", newHands,
                    "activeHandIndex", 0
            ));

            Map<String, Object> result = new HashMap<>();
            result.put("playerHands", newHands);

            return result;

        }).get();
    }

    public Map<String, Object> doubleDown(String uid) throws Exception {

        return db.runTransaction(transaction -> {

            DocumentReference userRef = db.collection("users").document(uid);
            DocumentSnapshot userDoc = transaction.get(userRef).get();

            String gameId = userDoc.getString("activeGameId");
            if (gameId == null) {
                throw new RuntimeException("No active game");
            }

            DocumentReference gameRef = db.collection("blackjack_sessions").document(gameId);
            DocumentSnapshot gameDoc = transaction.get(gameRef).get();

            List<String> deck = (List<String>) gameDoc.get("deck");
            List<Map<String, Object>> hands =
                    (List<Map<String, Object>>) gameDoc.get("playerHands");

            int activeHandIndex = ((Long) gameDoc.get("activeHandIndex")).intValue();
            Map<String, Object> currentHand = hands.get(activeHandIndex);

            List<String> cards = (List<String>) currentHand.get("cards");
            double bet = ((Number) currentHand.get("bet")).doubleValue();
            Boolean doubled = (Boolean) currentHand.get("doubled");

            if (cards.size() != 2) {
                throw new RuntimeException("Double only allowed on first two cards");
            }

            if (Boolean.TRUE.equals(doubled)) {
                throw new RuntimeException("Already doubled");
            }

            // ---- WALLET CHECK ----
            String walletId = gameDoc.getString("walletId");
            DocumentReference walletRef = db.collection("wallets").document(walletId);
            DocumentSnapshot walletDoc = transaction.get(walletRef).get();

            double balance = walletDoc.getDouble("balance");

            if (balance < bet) {
                throw new RuntimeException("Insufficient balance for double");
            }

            // Deduct extra bet
            Double rakeRateObj = userDoc.getDouble("rakebackRate");
            Double totalWageredObj = userDoc.getDouble("totalWagered");
            Double rakeAvailableObj = userDoc.getDouble("rakebackAvailable");

            double rakeRate = rakeRateObj != null ? rakeRateObj : 0.01;
            double totalWagered = totalWageredObj != null ? totalWageredObj : 0.0;
            double rakeAvailable = rakeAvailableObj != null ? rakeAvailableObj : 0.0;

            double rakeEarned = bet * rakeRate;

            System.out.println("Rake earned: " + rakeEarned);
            System.out.println("Total wagered after: " + (totalWagered + bet));
            System.out.println("Rake available after: " + (rakeAvailable + rakeEarned));

            transaction.update(userRef, Map.of(
                "totalWagered", totalWagered + bet,
                "rakebackAvailable", rakeAvailable + rakeEarned
            ));

            // Update hand
            currentHand.put("bet", bet * 2);
            currentHand.put("doubled", true);

            // Draw one card
            cards.add(deck.remove(0));

            int value =
                    com.cnx.onyxbackend.util.HandUtil.calculateHandValue(cards);

            // Move to next hand or dealer turn
            if (activeHandIndex + 1 < hands.size()) {
                activeHandIndex++;
            } else {
                transaction.update(gameRef, "status", "DEALER_TURN");
            }

            transaction.update(gameRef, Map.of(
                    "deck", deck,
                    "playerHands", hands,
                    "activeHandIndex", activeHandIndex
            ));

            Map<String, Object> result = new HashMap<>();
            result.put("playerHands", hands);
            result.put("activeHandIndex", activeHandIndex);

            return result;

        }).get();
    }

    public Map<String, Object> claimRakeback(String uid) throws Exception {

        return db.runTransaction(transaction -> {

            DocumentReference userRef = db.collection("users").document(uid);
            DocumentReference walletRef;

            DocumentSnapshot userDoc = transaction.get(userRef).get();

            Double rakeAvailableObj = userDoc.getDouble("rakebackAvailable");
            Double rakeClaimedObj = userDoc.getDouble("rakebackClaimed");
            String walletId = userDoc.getString("walletId");

            if (walletId == null) {
                throw new RuntimeException("Wallet not found");
            }

            walletRef = db.collection("wallets").document(walletId);
            DocumentSnapshot walletDoc = transaction.get(walletRef).get();

            double rakeAvailable = rakeAvailableObj != null ? rakeAvailableObj : 0.0;

            if (rakeAvailable <= 0) {
                throw new RuntimeException("No rakeback available");
            }

            double rakeClaimed = rakeClaimedObj != null ? rakeClaimedObj : 0.0;
            double balance = walletDoc.getDouble("balance");

            transaction.update(walletRef, "balance", balance + rakeAvailable);

            transaction.update(userRef, Map.of(
                    "rakebackAvailable", 0,
                    "rakebackClaimed", rakeClaimed + rakeAvailable
            ));

            Map<String, Object> result = new HashMap<>();
            result.put("claimed", rakeAvailable);

            return result;

        }).get();
    }
}