package com.cnx.onyxbackend.controller;

import com.cnx.onyxbackend.dto.SpinQuestResponseDTO;
import com.cnx.onyxbackend.service.SpinQuestService;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/SpinQuest")
public class SpinQuestController {

    private final SpinQuestService spinQuestService;

    public SpinQuestController(SpinQuestService spinQuestService) {
        this.spinQuestService = spinQuestService;
    }

    @PostMapping("/spin")
    public SpinQuestResponseDTO spin(
            @AuthenticationPrincipal String uid,
            @RequestBody Map<String, Double> body
    ) {
        return spinQuestService.spin(uid, body.get("bet"));
    }
}