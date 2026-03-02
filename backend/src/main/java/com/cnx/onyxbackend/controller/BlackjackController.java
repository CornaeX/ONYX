package com.cnx.onyxbackend.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cnx.onyxbackend.dto.BlackjackResponseDTO;
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
    public BlackjackResponseDTO startGame(
            @AuthenticationPrincipal String uid,
            @RequestBody Map<String, Double> request
    ) throws Exception {

        double bet = request.get("bet");

        return blackjackService.startGame(uid, bet);
    }

    // 2️⃣ HIT
    @PostMapping("/hit")
    public BlackjackResponseDTO hit(
            @AuthenticationPrincipal String uid
    ) throws Exception {

        return blackjackService.hit(uid);
    }

    // 3️⃣ STAND
    @PostMapping("/stand")
    public BlackjackResponseDTO stand(
            @AuthenticationPrincipal String uid
    ) throws Exception {

        return blackjackService.stand(uid);
    }

    // 4️⃣ SPLIT
    @PostMapping("/split")
    public BlackjackResponseDTO split(
            @AuthenticationPrincipal String uid
    ) throws Exception {

        return blackjackService.split(uid);
    }

    // 5️⃣ DOUBLE
    @PostMapping("/double")
    public BlackjackResponseDTO doubleDown(
            @AuthenticationPrincipal String uid
    ) throws Exception {

        return blackjackService.doubleDown(uid);
    }

    @GetMapping("/session")
    public ResponseEntity<?> getActiveSession(Authentication auth) {
        String uid = auth.getName();

        var sessionOpt = blackjackService.getActiveSession(uid);

        if (sessionOpt.isEmpty()) {
            return ResponseEntity.ok(Map.of("active", false));
        }

        return ResponseEntity.ok(
            Map.of(
                "active", true,
                "data", sessionOpt.get()
            )
        );
    }
}