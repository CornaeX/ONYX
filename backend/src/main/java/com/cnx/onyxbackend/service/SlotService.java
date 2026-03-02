package com.cnx.onyxbackend.service;

import com.cnx.onyxbackend.dto.SlotResponseDTO;
import com.cnx.onyxbackend.model.User;
import com.cnx.onyxbackend.repository.UserRepository;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class SlotService {

    private final UserRepository userRepository;

    private final Map<String, Integer> weights = Map.of(
        "🍒", 40,
        "🍋", 30,
        "🔔", 15,
        "💎", 10,
        "7️⃣", 5
    );

    public SlotService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Transactional
    public SlotResponseDTO spin(String uid, double bet) {

        User user = userRepository.findByIdForUpdate(uid).orElseThrow();

        if (user.getBalance() < bet)
            throw new RuntimeException("Insufficient balance");

        user.setBalance(user.getBalance() - bet);

        // Rakeback
        double rakeEarned = bet * user.getRakebackRate();
        user.setTotalWagered(user.getTotalWagered() + bet);
        user.setRakebackAvailable(user.getRakebackAvailable() + rakeEarned);

        List<String> result = List.of(
            weightedRandom(),
            weightedRandom(),
            weightedRandom()
        );

        double payout = calculatePayout(result, bet);

        user.setBalance(user.getBalance() + payout);

        userRepository.save(user);

        return new SlotResponseDTO(
            result,
            payout,
            user.getBalance(),
            user.getRakebackAvailable() // 🔥 ADD THIS
        );
    }

    private String weightedRandom() {
        int totalWeight = weights.values().stream().mapToInt(i -> i).sum();
        int r = new Random().nextInt(totalWeight);

        int cumulative = 0;
        for (Map.Entry<String, Integer> entry : weights.entrySet()) {
            cumulative += entry.getValue();
            if (r < cumulative)
                return entry.getKey();
        }
        return "🍒";
    }

    private double calculatePayout(List<String> result, double bet) {
        if (result.get(0).equals(result.get(1)) &&
            result.get(1).equals(result.get(2))) {

            switch (result.get(0)) {
                case "🍒": return bet * 2;
                case "🍋": return bet * 3;
                case "🔔": return bet * 5;
                case "💎": return bet * 10;
                case "7️⃣": return bet * 25;
            }
        }
        return 0;
    }
}