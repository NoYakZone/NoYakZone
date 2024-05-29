package com.sm_oss.NoYakZone.controller;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.sm_oss.NoYakZone.chatbot.Chatbot;

@RestController
@RequestMapping("/chatbot")
public class ChatbotController {

    private final Chatbot chatbot = new Chatbot();

    @GetMapping("/chat")
    //http://localhost:7890/chatbot/chat?message=나 집가고싶어!!! 
    public String chat(@RequestParam String message) {
        return chatbot.getResponse(message);
    }
}