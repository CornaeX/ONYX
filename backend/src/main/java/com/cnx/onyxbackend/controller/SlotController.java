package com.cnx.onyxbackend.controller;

import com.cnx.onyxbackend.dto.SlotResponseDTO;
import com.cnx.onyxbackend.service.SlotService;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/slot")
public class SlotController {

    private final SlotService slotService;

    public SlotController(SlotService slotService) {
        this.slotService = slotService;
    }

    @PostMapping("/spin")
    public SlotResponseDTO spin(
            @AuthenticationPrincipal String uid,
            @RequestBody Map<String, Double> body
    ) {
        return slotService.spin(uid, body.get("bet"));
    }
}