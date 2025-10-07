package com.jobstream.backend.controller;

import com.jobstream.backend.dto.request.AdminMessageRequest;
import com.jobstream.backend.dto.request.MessageRequestDto;
import com.jobstream.backend.service.MessageService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

/**
 * Author: ABEL
 * Created: 2025-09-08
 */
@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/messages")
public class MessageController {

    private MessageService messageService;
    private final Logger logger = LoggerFactory.getLogger(MessageController.class);

    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    // Store user message
    @PostMapping("/store-message")
    public void storeMessage(@AuthenticationPrincipal Jwt jwt,
                             @RequestBody MessageRequestDto messageRequest) {
        String email = jwt.getClaim("sub");
        messageService.saveMessage(email, messageRequest);
    }

    // Store admin response to user message
    @PostMapping("/store-response/{messageId}")
    public void storeResponse(@AuthenticationPrincipal Jwt jwt,
                              @RequestBody AdminMessageRequest adminMessageRequest,
                              @PathVariable("messageId") String messageId){

        String email = jwt.getClaim("sub");
        messageService.saveAminResponse(email, adminMessageRequest, messageId);
    }
}
