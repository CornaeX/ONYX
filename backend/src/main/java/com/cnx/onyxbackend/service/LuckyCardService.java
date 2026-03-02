package com.cnx.onyxbackend.service;

import com.cnx.onyxbackend.dto.LuckyCardResponseDTO;
import com.cnx.onyxbackend.model.LuckyCardSession;
import com.cnx.onyxbackend.model.User;
import com.cnx.onyxbackend.repository.LuckyCardSessionRepository;
import com.cnx.onyxbackend.repository.UserRepository;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class LuckyCardService {

    private final UserRepository userRepository;
    private final LuckyCardSessionRepository sessionRepository;

    private final List<Double> BASE_MULTIPLIERS = List.of(0.0, 0.5, 1.0, 2.0, 3.0, 5.0);

    public LuckyCardService(UserRepository userRepository,
                            LuckyCardSessionRepository sessionRepository) {
        this.userRepository = userRepository;
        this.sessionRepository = sessionRepository;
    }

    @Transactional
    public LuckyCardResponseDTO start(String uid, double bet) {

        User user = userRepository.findByIdForUpdate(uid)
                .orElseThrow();

        if (user.getBalance() < bet)
            throw new RuntimeException("Insufficient balance");

        user.setBalance(user.getBalance() - bet);

        List<Double> shuffled = new ArrayList<>(BASE_MULTIPLIERS);
        Collections.shuffle(shuffled);

        LuckyCardSession session = new LuckyCardSession();
        session.setId(UUID.randomUUID().toString());
        session.setUid(uid);
        session.setBetAmount(bet);
        session.setMultipliers(shuffled);
        session.setStatus("PLAYING");

        sessionRepository.save(session);
        userRepository.save(user);

        return new LuckyCardResponseDTO(
                uid,
                bet,
                shuffled,
                "PLAYING",
                0,
                user.getBalance()
        );
    }

    @Transactional
    public LuckyCardResponseDTO pick(String uid, int index) {

        User user = userRepository.findByIdForUpdate(uid).orElseThrow();

        LuckyCardSession session = sessionRepository.findAll()
                .stream()
                .filter(s -> s.getUid().equals(uid))
                .findFirst()
                .orElseThrow();

        double multiplier = session.getMultipliers().get(index);
        double payout = session.getBetAmount() * multiplier;

        user.setBalance(user.getBalance() + payout);

        session.setStatus("FINISHED");
        session.setSelectedIndex(index);
        session.setPayout(payout);

        userRepository.save(user);
        sessionRepository.delete(session);

        return new LuckyCardResponseDTO(
                uid,
                session.getBetAmount(),
                session.getMultipliers(),
                "FINISHED",
                payout,
                user.getBalance()
        );
    }
}