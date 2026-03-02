package com.cnx.onyxbackend.controller;

import com.cnx.onyxbackend.dto.LuckyCardResponseDTO;
import com.cnx.onyxbackend.service.LuckyCardService;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/luckycard")
public class LuckyCardController {

    private final LuckyCardService luckyCardService;

    public LuckyCardController(LuckyCardService luckyCardService) {
        this.luckyCardService = luckyCardService;
    }

    @PostMapping("/start")
    public LuckyCardResponseDTO start(
            @AuthenticationPrincipal String uid,
            @RequestBody Map<String, Double> body
    ) {
        return luckyCardService.start(uid, body.get("bet"));
    }

    @PostMapping("/pick")
    public LuckyCardResponseDTO pick(
            @AuthenticationPrincipal String uid,
            @RequestBody Map<String, Integer> body
    ) {
        return luckyCardService.pick(uid, body.get("index"));
    }
}