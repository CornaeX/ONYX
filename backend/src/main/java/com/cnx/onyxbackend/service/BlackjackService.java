package com.cnx.onyxbackend.service;

import com.cnx.onyxbackend.dto.BlackjackResponseDTO;
import com.cnx.onyxbackend.dto.PlayerHandDTO;
import com.cnx.onyxbackend.model.BlackjackSession;
import com.cnx.onyxbackend.model.GameStatus;
import com.cnx.onyxbackend.model.PlayerHand;
import com.cnx.onyxbackend.model.User;
import com.cnx.onyxbackend.repository.BlackjackSessionRepository;
import com.cnx.onyxbackend.repository.UserRepository;
import com.cnx.onyxbackend.util.DealerUtil;
import com.cnx.onyxbackend.util.DeckUtil;
import com.cnx.onyxbackend.util.HandUtil;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class BlackjackService {

    private final UserRepository userRepository;
    private final BlackjackSessionRepository sessionRepository;

    public BlackjackService(UserRepository userRepository, BlackjackSessionRepository sessionRepository) {
        this.userRepository = userRepository;
        this.sessionRepository = sessionRepository;
    }

    @Transactional
    public BlackjackResponseDTO startGame(String uid, double bet) throws Exception {
        // 1. Fetch and Lock the user
        User user = userRepository.findByIdForUpdate(uid)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (user.getActiveGameId() != null) throw new RuntimeException("Game already active");
        if (user.getBalance() < bet) throw new RuntimeException("Insufficient balance");

        // 2. Math & Deductions
        double rakeEarned = bet * user.getRakebackRate();
        user.setBalance(user.getBalance() - bet);
        user.setTotalWagered(user.getTotalWagered() + bet);
        user.setRakebackAvailable(user.getRakebackAvailable() + rakeEarned);

        // 3. Setup Cards
        List<String> deck = DeckUtil.generateShuffledDeck();
        List<String> playerHandCards = new ArrayList<>(Arrays.asList(deck.remove(0), deck.remove(0)));
        List<String> dealerHand = new ArrayList<>(Arrays.asList(deck.remove(0), deck.remove(0)));

        PlayerHand firstHand = new PlayerHand();
        firstHand.setCards(playerHandCards);
        firstHand.setBet(bet);
        firstHand.setDoubled(false);

        // 4. Create Postgres Session
        BlackjackSession session = new BlackjackSession();
        session.setId(UUID.randomUUID().toString());
        session.setUid(uid);
        session.setBetAmount(bet);
        session.setDeck(deck);
        session.setDealerHand(dealerHand);
        session.getPlayerHands().add(firstHand);

        // --- NEW: REALISTIC INSTANT BLACKJACK CHECK ---
        int playerValue = HandUtil.calculateHandValue(playerHandCards);
        int dealerValue = HandUtil.calculateHandValue(dealerHand);
        boolean playerBJ = (playerValue == 21);
        boolean dealerBJ = (dealerValue == 21);

        if (playerBJ || dealerBJ) {
            session.setStatus(GameStatus.FINISHED.name());
            double totalPayout = 0;
            
            if (playerBJ && !dealerBJ) {
                totalPayout = bet * 2.5; // 3:2 Casino Payout
            } else if (playerBJ && dealerBJ) {
                totalPayout = bet; // Push
            } // If dealerBJ and !playerBJ, payout is 0

            user.setBalance(user.getBalance() + totalPayout);
            userRepository.save(user);
            
            // Return finished state immediately without saving an active session to DB
            return buildSessionResponse(session, totalPayout, user);
        }

        // If no instant blackjack, proceed normally
        session.setStatus(GameStatus.PLAYER_TURN.name());
        sessionRepository.save(session);
        user.setActiveGameId(session.getId());
        userRepository.save(user);

        return buildSessionResponse(session, 0, user);
    }

    @Transactional
    public BlackjackResponseDTO hit(String uid) throws Exception {
        User user = userRepository.findByIdForUpdate(uid).orElseThrow();
        BlackjackSession session = sessionRepository.findById(user.getActiveGameId())
                .orElseThrow(() -> new RuntimeException("No active game"));

        if (!"PLAYER_TURN".equals(session.getStatus())) throw new RuntimeException("Not player's turn");

        PlayerHand currentHand = session.getPlayerHands().get(session.getActiveHandIndex());
        currentHand.getCards().add(session.getDeck().remove(0));

        if (currentHand.isBust()) {
            if (session.getActiveHandIndex() + 1 < session.getPlayerHands().size()) {
                session.setActiveHandIndex(session.getActiveHandIndex() + 1);
            } else {
                session.setStatus("DEALER_TURN");
            }
        }

        sessionRepository.save(session);
        return buildSessionResponse(session, 0, user);
    }

    @Transactional
    public BlackjackResponseDTO stand(String uid) throws Exception {

        User user = userRepository.findByIdForUpdate(uid).orElseThrow();
        BlackjackSession session = sessionRepository
                .findById(user.getActiveGameId())
                .orElseThrow(() -> new RuntimeException("No active game"));

        System.out.println("Dealer initial: " + session.getDealerHand());
        System.out.println("Player hands: " + session.getPlayerHands());
        
        // If more split hands → just move index
        if (session.getActiveHandIndex() + 1 < session.getPlayerHands().size()) {
            session.setActiveHandIndex(session.getActiveHandIndex() + 1);
            sessionRepository.save(session);
            return buildSessionResponse(session, 0, user);
        }

        // ---- DEALER PLAY ----
        boolean allBusted = session.getPlayerHands().stream()
        .allMatch(hand -> HandUtil.calculateHandValue(hand.getCards()) > 21);

        List<String> dealerHand = session.getDealerHand();
        List<String> deck = session.getDeck();
        int dealerValue = HandUtil.calculateHandValue(dealerHand);

        if (!allBusted) {
            DealerUtil.playDealer(dealerHand, deck);
            dealerValue = HandUtil.calculateHandValue(dealerHand);
        }

        // ---- PAYOUT CALC ----
        double totalPayout = 0;

        for (PlayerHand hand : session.getPlayerHands()) {

            int playerValue = HandUtil.calculateHandValue(hand.getCards());
            boolean isBlackjack = hand.getCards().size() == 2 && playerValue == 21;

            System.out.println("----");
            System.out.println("Cards: " + hand.getCards());
            System.out.println("PlayerValue: " + playerValue);
            System.out.println("DealerValue: " + dealerValue);
            System.out.println("IsBlackjack: " + isBlackjack);

            if (playerValue > 21) continue;

            if (isBlackjack && dealerValue != 21) {
                totalPayout += hand.getBet() * 2.5;
            } else if (dealerValue > 21 || playerValue > dealerValue) {
                totalPayout += hand.getBet() * 2;
            } else if (playerValue == dealerValue) {
                totalPayout += hand.getBet();
            }
        }

        System.out.println("Dealer final: " + dealerHand + " = " + dealerValue);
        System.out.println("Total payout: " + totalPayout);

        // ---- APPLY MONEY ----
        user.setBalance(user.getBalance() + totalPayout);
        user.setActiveGameId(null);

        session.setStatus(GameStatus.FINISHED.name());

        userRepository.save(user);
        sessionRepository.delete(session);

        return buildSessionResponse(session, totalPayout, user);
    }

    @Transactional
    public BlackjackResponseDTO doubleDown(String uid) throws Exception {
        User user = userRepository.findByIdForUpdate(uid).orElseThrow();
        BlackjackSession session = sessionRepository.findById(user.getActiveGameId()).orElseThrow();

        PlayerHand currentHand = session.getPlayerHands().get(session.getActiveHandIndex());
        double bet = currentHand.getBet();

        if (currentHand.getCards().size() != 2) throw new RuntimeException("Only on first two cards");
        if (currentHand.isDoubled()) throw new RuntimeException("Already doubled");
        if (user.getBalance() < bet) throw new RuntimeException("Insufficient balance");

        // Math
        double rakeEarned = bet * user.getRakebackRate();
        user.setBalance(user.getBalance() - bet);
        user.setTotalWagered(user.getTotalWagered() + bet);
        user.setRakebackAvailable(user.getRakebackAvailable() + rakeEarned);

        // Update Hand
        currentHand.setBet(bet * 2);
        currentHand.setDoubled(true);
        currentHand.getCards().add(session.getDeck().remove(0));

        if (session.getActiveHandIndex() + 1 < session.getPlayerHands().size()) {
            session.setActiveHandIndex(session.getActiveHandIndex() + 1);
        } else {
            session.setStatus("DEALER_TURN");
        }

        userRepository.save(user);
        sessionRepository.save(session);
        return buildSessionResponse(session, 0, user);
    }

    @Transactional
    public BlackjackResponseDTO split(String uid) throws Exception {
        User user = userRepository.findByIdForUpdate(uid).orElseThrow();
        BlackjackSession session = sessionRepository.findById(user.getActiveGameId()).orElseThrow();

        if (session.getPlayerHands().size() > 1)
            throw new RuntimeException("Already split");

        PlayerHand originalHand = session.getPlayerHands().get(0);
        double bet = originalHand.getBet();

        if (originalHand.getCards().size() != 2)
            throw new RuntimeException("Can only split with 2 cards");

        String rank1 = originalHand.getCards().get(0).substring(0, originalHand.getCards().get(0).length() - 1);
        String rank2 = originalHand.getCards().get(1).substring(0, originalHand.getCards().get(1).length() - 1);

        if (!rank1.equals(rank2))
            throw new RuntimeException("Cards must be same rank");

        if (user.getBalance() < bet)
            throw new RuntimeException("Insufficient balance");

        // Deduct second bet
        double rakeEarned = bet * user.getRakebackRate();
        user.setBalance(user.getBalance() - bet);
        user.setTotalWagered(user.getTotalWagered() + bet);
        user.setRakebackAvailable(user.getRakebackAvailable() + rakeEarned);

        // Create two hands
        String card1 = originalHand.getCards().get(0);
        String card2 = originalHand.getCards().get(1);

        PlayerHand hand1 = new PlayerHand();
        hand1.setBet(bet);
        hand1.setCards(new ArrayList<>(List.of(card1)));

        PlayerHand hand2 = new PlayerHand();
        hand2.setBet(bet);
        hand2.setCards(new ArrayList<>(List.of(card2)));

        // Deal one card to each hand immediately
        hand1.getCards().add(session.getDeck().remove(0));
        hand2.getCards().add(session.getDeck().remove(0));

        session.getPlayerHands().clear();
        session.getPlayerHands().add(hand1);
        session.getPlayerHands().add(hand2);
        session.setActiveHandIndex(0);

        userRepository.save(user);
        sessionRepository.save(session);

        return buildSessionResponse(session, 0, user);
    }

    @Transactional
    public Map<String, Double> claimRakeback(String uid) throws Exception {
        // 🔥 FIXED: Changed return type in header from BlackjackResponseDTO to Map<String, Double>
        User user = userRepository.findByIdForUpdate(uid).orElseThrow();

        double amountToClaim = Math.floor(user.getRakebackAvailable());
        if (amountToClaim < 1.0) throw new RuntimeException("You need at least $1.00 to claim.");

        user.setBalance(user.getBalance() + amountToClaim);
        user.setRakebackAvailable(user.getRakebackAvailable() - amountToClaim);
        user.setRakebackClaimed(user.getRakebackClaimed() + amountToClaim);

        userRepository.save(user);
        return Map.of("claimed", amountToClaim);
    }

    @Transactional(readOnly = true)
    public Optional<BlackjackResponseDTO> getActiveSession(String uid) {
        User user = userRepository.findById(uid).orElseThrow();

        if (user.getActiveGameId() == null) {
            return Optional.empty();
        }

        String activeGameId = user.getActiveGameId();

        if (activeGameId == null) {
            throw new RuntimeException("No active game");
        }

        BlackjackSession session = sessionRepository
            .findById(user.getActiveGameId())
            .orElseThrow(() -> new RuntimeException("No active game"));

            return Optional.of(buildSessionResponse(session, user));
    }

    // Helper method to keep frontend mapping identical to Firestore output
    private BlackjackResponseDTO buildSessionResponse(
            BlackjackSession session,
            double payout,
            User user
    ) {

        var handDTOs = session.getPlayerHands()
                .stream()
                .map(h -> new PlayerHandDTO(
                        h.getCards(),
                        h.getBet(),
                        h.isDoubled()))
                .toList();

        return new BlackjackResponseDTO(
                session.getUid(),
                session.getBetAmount(),
                session.getDealerHand(),
                session.getActiveHandIndex(),
                session.getStatus(),
                handDTOs,
                payout,
                user.getBalance(),
                user.getRakebackAvailable()
        );
    }

    private BlackjackResponseDTO buildSessionResponse(
            BlackjackSession session,
            User user
    ) {
        return buildSessionResponse(session, 0, user);
    }
}




