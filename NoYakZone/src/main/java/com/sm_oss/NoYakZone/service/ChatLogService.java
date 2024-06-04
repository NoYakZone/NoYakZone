package com.sm_oss.NoYakZone.service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.time.LocalDateTime;
import com.sm_oss.NoYakZone.model.ChatLog;
import com.sm_oss.NoYakZone.repository.ChatLogRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Value;

@Service
@Component
public class ChatLogService {

    @Autowired
    private ChatLogRepository chatLogRepository;

    @Value("${openai.api.key}")
    private String apiKey;//안되요오오오오오오오

    private static List<String> conversationHistory = new ArrayList<>();

    public String getResponse(String id, String message) {// api호출 시 첫 실행
        List<ChatLog> recentLogs = findLatestChatLogs(id);//최신 대화내용 가져오기
        updateConversationHistory(recentLogs);//최신 대화내용 대화이력에 추가
        
        updateConversationHistory("user", message);
        insertChatLog(id, message, false);//테이블에 insert
        String res = callChatGPT(message);//gpt 응답 받아오기
        updateConversationHistory("system", res); // 시스템 응답을 대화 이력에 추가
        insertChatLog(id, res, true);//테이블에 insert
        return res;
    }

    private void updateConversationHistory(List<ChatLog> recentLogs) {
        conversationHistory.clear(); // 기존 대화 이력 초기화
        for (ChatLog log : recentLogs) {
            String role = log.isBot() ? "system" : "user";
            String content = log.getText();
            updateConversationHistory(role, content);
        }
    }

    private void updateConversationHistory(String role, String content) {// 리스트에 대화내용 추가
        // 대화 내용을 JSON 문자열로 변환
        String newEntry = "{\"role\": \"" + role + "\", \"content\": \"" + content.replace("\"", "\\\"") + "\"}";

        conversationHistory.add(newEntry);
    }

    private String callChatGPT(String prompt) {// 실제 gpt api 사용
        try {
            URL url = new URL("https://api.openai.com/v1/chat/completions");
            HttpURLConnection httpURLConnection = (HttpURLConnection) url.openConnection();
            httpURLConnection.setRequestMethod("POST");
            httpURLConnection.setRequestProperty("Content-Type", "application/json; utf-8");
            httpURLConnection.setRequestProperty("Authorization", "Bearer " + apiKey);
            httpURLConnection.setDoOutput(true);

            String messagesJson = String.join(",", conversationHistory);

            String input = "{" +
                    "\"model\": \"gpt-3.5-turbo\"," +
                    "\"messages\": [" +
                    "{\"role\": \"system\", \"content\": \"Write in korean\"}," +
                    "{\"role\": \"system\", \"content\": \"You are a drug treatment counselor.\"}," +
                    "{\"role\": \"system\", \"content\": \"You ask a variety of questions to get more information from what the patient says.\"},"
                    +
                    "{\"role\": \"system\", \"content\": \"Each conversation consists of no more than two sentences.\"},"
                    +
                    "{\"role\": \"system\", \"content\": \"The counselor states the conclusion he or she thinks.\"}," +
                    "{\"role\": \"system\", \"content\": \"If the counselor determines that the patient's condition is serious, he or she recommends an actual counselor or hospital.\"},"
                    +
                    messagesJson +
                    "]" +
                    "}";

            try (OutputStream os = httpURLConnection.getOutputStream()) {
                byte[] inputBytes = input.getBytes("utf-8");
                os.write(inputBytes, 0, inputBytes.length);
            }

            try (BufferedReader br = new BufferedReader(
                    new InputStreamReader(httpURLConnection.getInputStream(), "utf-8"))) {
                StringBuilder res = new StringBuilder();
                String resLine;

                while ((resLine = br.readLine()) != null) {
                    res.append(resLine.trim());
                }
                
                System.out.println(res.toString());
                String jsonResponse = res.toString();//응답 json에서 답변만 추출하기

                String contentKey = "\"content\":";
                int contentStart = jsonResponse.indexOf(contentKey);

                if (contentStart != -1) {
                int start = jsonResponse.indexOf("\"", contentStart + contentKey.length()) + 1;
                int end = jsonResponse.indexOf("\"", start);
        
                if (start != -1 && end != -1) {
                    return jsonResponse.substring(start, end);
                    }
                }
                return "Content not found";
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return "";
    }

    public List<ChatLog> findAllByUserId(String userId) {//사용자에 대한 모든 대화기록 불러오기
        return chatLogRepository.findByUserId(userId);
    }

    public ChatLog insertChatLog(String userId, String text, boolean bot) {//챗봇 대화내용 insert
        ChatLog newChatLog = new ChatLog();
        newChatLog.setUserId(userId); // userId 설정
        newChatLog.setDate(LocalDateTime.now()); // 현재 시간으로 date 설정
        newChatLog.setText(text); // text 설정
        newChatLog.setBot(bot); // bot 설정

        // chatLogRepository를 통해 데이터베이스에 저장
        return chatLogRepository.save(newChatLog);
    }

    public List<ChatLog> findLatestChatLogs(String userId) {//최신 대화기록 불러오기
        List<ChatLog> allLogs = chatLogRepository.findByUserId(userId);
        return allLogs.stream()
                .sorted((log1, log2) -> log2.getDate().compareTo(log1.getDate())) // 최신순으로 정렬
                .limit(10) // 최신 10개만 선택
                .collect(Collectors.toList());
    }

}
