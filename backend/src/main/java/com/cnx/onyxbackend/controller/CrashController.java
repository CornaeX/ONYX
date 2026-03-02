package com.cnx.onyxbackend.controller;

import com.cnx.onyxbackend.dto.CrashResponseDTO;
import com.cnx.onyxbackend.model.User;
import com.cnx.onyxbackend.service.CrashService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

import org.springframework.security.core.annotation.AuthenticationPrincipal;

@RestController
@RequestMapping("/api/crash")
public class CrashController {

    private final CrashService crashService;

    public CrashController(CrashService crashService) {
        this.crashService = crashService;
    }

    @PostMapping("/start")
    public CrashResponseDTO start(
            @AuthenticationPrincipal String uid,
            @RequestBody double bet
    ) {
        return crashService.startGame(uid, bet);
    }

    @PostMapping("/cashout")
    public CrashResponseDTO cashout(
            @AuthenticationPrincipal String uid,
            @RequestBody double multiplier
    ) {
        return crashService.cashOut(uid, multiplier);
    }
}