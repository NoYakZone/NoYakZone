package com.sm_oss.NoYakZone.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.sm_oss.NoYakZone.model.ChatLogDto;
import com.sm_oss.NoYakZone.service.ChatLogService;

class ChatRequest {//입력 폼
    private String id;
    private String message;

    // 기본 생성자 추가 (JSON -> Java 객체 변환을 위해 필요)
    public ChatRequest() {
    }

    // getters and setters
    public String getId() {
        return id;
    }

    public String getMessage() {
        return message;
    }
}

@RestController
@RequestMapping("/chatbot")
public class ChatbotController {

    @Autowired
    private ChatLogService chatLogService;

    @PostMapping("/chat")//봇에게 메세지 보내기
    public String chat(@RequestBody ChatRequest chatRequest) {
        return chatLogService.getResponse(chatRequest.getId(), chatRequest.getMessage());
    }
    /*
    http://localhost:7890/chatbot/chat
     {
        "id":"qwer",
        "message":"안녕하세요. 상담하러 왔어요"
    }
     */

     @GetMapping //사용자의 모든 대화 기록 가져오기
     public List<ChatLogDto> getMessageHistory(@RequestParam String id){
        return chatLogService.findAllByUserId(id);
     }//예시 : http://localhost:7890/chatbot?id=qwer
}