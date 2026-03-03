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

import com.cnx.onyxbackend.dto.TwentyOneChallengeResponseDTO;
import com.cnx.onyxbackend.service.TwentyOneChallengeService;

@RestController
@RequestMapping("/api/TwentyOneChallenge")
public class TwentyOneChallengeController {

    private final TwentyOneChallengeService twentyOneChallengeService;

    public TwentyOneChallengeController(TwentyOneChallengeService twentyOneChallengeService) {
        this.twentyOneChallengeService = twentyOneChallengeService;
    }

    // 1️⃣ START GAME
    @PostMapping("/start")
    public TwentyOneChallengeResponseDTO startGame(
            @AuthenticationPrincipal String uid,
            @RequestBody Map<String, Double> request
    ) throws Exception {

        double bet = request.get("bet");

        return twentyOneChallengeService.startGame(uid, bet);
    }

    // 2️⃣ HIT
    @PostMapping("/hit")
    public TwentyOneChallengeResponseDTO hit(
            @AuthenticationPrincipal String uid
    ) throws Exception {

        return twentyOneChallengeService.hit(uid);
    }

    // 3️⃣ STAND
    @PostMapping("/stand")
    public TwentyOneChallengeResponseDTO stand(
            @AuthenticationPrincipal String uid
    ) throws Exception {

        return twentyOneChallengeService.stand(uid);
    }

    // 4️⃣ SPLIT
    @PostMapping("/split")
    public TwentyOneChallengeResponseDTO split(
            @AuthenticationPrincipal String uid
    ) throws Exception {

        return twentyOneChallengeService.split(uid);
    }

    // 5️⃣ DOUBLE
    @PostMapping("/double")
    public TwentyOneChallengeResponseDTO doubleDown(
            @AuthenticationPrincipal String uid
    ) throws Exception {

        return twentyOneChallengeService.doubleDown(uid);
    }

    @GetMapping("/session")
    public ResponseEntity<?> getActiveSession(Authentication auth) {
        String uid = auth.getName();

        var sessionOpt = twentyOneChallengeService.getActiveSession(uid);

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