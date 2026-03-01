package com.cnx.onyxbackend.controller;

import java.util.Map;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cnx.onyxbackend.service.BlackjackService;

@RestController
@RequestMapping("/api/blackjack")
public class BlackjackController {

    private final BlackjackService blackjackService;

    public BlackjackController(BlackjackService blackjackService) {
        this.blackjackService = blackjackService;
    }

    // 1️⃣ START GAME
    @PostMapping("/start")
    public Map<String, Object> startGame(
            @AuthenticationPrincipal String uid,
            @RequestBody Map<String, Double> request
    ) throws Exception {

        double bet = request.get("bet");

        return blackjackService.startGame(uid, bet);
    }

    // 2️⃣ HIT
    @PostMapping("/hit")
    public Map<String, Object> hit(
            @AuthenticationPrincipal String uid
    ) throws Exception {

        return blackjackService.hit(uid);
    }

    // 3️⃣ STAND
    @PostMapping("/stand")
    public Map<String, Object> stand(
            @AuthenticationPrincipal String uid
    ) throws Exception {

        return blackjackService.stand(uid);
    }

    // 4️⃣ SPLIT
    @PostMapping("/split")
    public Map<String, Object> split(
            @AuthenticationPrincipal String uid
    ) throws Exception {

        return blackjackService.split(uid);
    }

    // 5️⃣ DOUBLE
    @PostMapping("/double")
    public Map<String, Object> doubleDown(
            @AuthenticationPrincipal String uid
    ) throws Exception {

        return blackjackService.doubleDown(uid);
    }

    @PostMapping("/claim-rakeback")
    public Map<String, Object> claimRakeback(
            @AuthenticationPrincipal String uid
    ) throws Exception {

        return blackjackService.claimRakeback(uid);
    }
}