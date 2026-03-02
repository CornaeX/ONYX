package com.cnx.onyxbackend.service;

import com.cnx.onyxbackend.dto.CrashResponseDTO;
import com.cnx.onyxbackend.model.CrashSession;
import com.cnx.onyxbackend.model.User;
import com.cnx.onyxbackend.repository.CrashSessionRepository;
import com.cnx.onyxbackend.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class CrashService {

    private final UserRepository userRepository;
    private final CrashSessionRepository crashRepository;
    private final Random random = new Random();

    public CrashService(UserRepository userRepository,
                        CrashSessionRepository crashRepository) {
        this.userRepository = userRepository;
        this.crashRepository = crashRepository;
    }

    private double generateCrashPoint() {
        double r = random.nextDouble();
        return Math.max(1.0, (1 / (1 - r)));
    }

    @Transactional
    public CrashResponseDTO startGame(String uid, double bet) {

        User user = userRepository.findByIdForUpdate(uid)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (user.getBalance() < bet)
            throw new RuntimeException("Insufficient balance");

        user.setBalance(user.getBalance() - bet);

        double rake = bet * 0.02;
        user.setRakebackAvailable(user.getRakebackAvailable() + rake);

        CrashSession session = new CrashSession();
        session.setUid(uid);
        session.setBetAmount(bet);
        session.setCrashPoint(generateCrashPoint());
        session.setStatus("ACTIVE");

        crashRepository.save(session);
        userRepository.save(user);

        return new CrashResponseDTO(
                1.0,
                false,
                0,
                user.getBalance(),
                user.getRakebackAvailable(),
                session.getId(),
                session.getCrashPoint()
        );
    }

    @Transactional
    public CrashResponseDTO cashOut(String uid, double multiplier) {

        CrashSession session = crashRepository
                .findTopByUidAndStatusOrderByCreatedAtDesc(uid, "ACTIVE")
                .orElseThrow(() -> new RuntimeException("No active crash game"));

        if (multiplier >= session.getCrashPoint()) {
            session.setStatus("CRASHED");
            crashRepository.save(session);
            throw new RuntimeException("Game already crashed");
        }

        User user = userRepository.findByIdForUpdate(uid)
                .orElseThrow(() -> new RuntimeException("User not found"));

        double payout = session.getBetAmount() * multiplier;

        user.setBalance(user.getBalance() + payout);

        session.setCashedOut(true);
        session.setCashoutMultiplier(multiplier);
        session.setStatus("CASHED_OUT");

        crashRepository.save(session);
        userRepository.save(user);

        return new CrashResponseDTO(
                multiplier,
                false,
                payout,
                user.getBalance(),
                user.getRakebackAvailable(),
                session.getId(),
                session.getCrashPoint()
        );
    }
}