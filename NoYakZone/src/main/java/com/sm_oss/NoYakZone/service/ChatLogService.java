package com.sm_oss.NoYakZone.service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.time.LocalDateTime;
import com.sm_oss.NoYakZone.model.ChatLogDto;
import com.sm_oss.NoYakZone.model.ChatLogRepository;
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
    private static String apiKey;//안되요오오오오오오오

    private static List<String> conversationHistory = new ArrayList<>();

    public String getResponse(String id, String message) {// api호출 시 첫 실행
        updateConversationHistory("user", message);
        insertChatLog(id, message, false);//테이블에 insert
        String res = callChatGPT(message);//gpt 응답 받아오기
        updateConversationHistory("system", res); // 시스템 응답을 대화 이력에 추가
        insertChatLog(id, res, true);//테이블에 insert
        return res;
    }

    private void updateConversationHistory(String role, String content) {// 리스트에 대화내용 추가
        // 대화 내용을 JSON 문자열로 변환
        String newEntry = "{\"role\": \"" + role + "\", \"content\": \"" + content.replace("\"", "\\\"") + "\"}";

        // 대화를 추가하기 전에 토큰 수를 체크
        while (!isTokenLimitSafe(newEntry)) {
            // 토큰 수가 안전한 상태가 될 때까지 이전 대화를 제거
            if (!conversationHistory.isEmpty()) {
                conversationHistory.remove(0); // 리스트의 첫 번째 항목을 제거
            } else {
                break; // 대화 기록이 비어있으면 중단
            }
        }

        // 대화 기록에 새 대화 추가
        conversationHistory.add(newEntry);
    }

    private boolean isTokenLimitSafe(String newEntry) {// 대략적인 토큰 수 체크를 위한 메서드
        // 새로운 항목을 추가했을 때의 대략적인 문자 수
        int estimatedSize = newEntry.length();
        for (String entry : conversationHistory) {
            estimatedSize += entry.length();
        }

        // 여기서는 단순화를 위해 한 토큰을 4글자로 가정
        // 한글 : 한글자당 1토큰
        // 영어 : 한 단어당 1토큰
        // 따라서 영어가 유리
        int estimatedTokens = estimatedSize / 4;

        // 10K 토큰보다 적으면 안전하다고 가정
        return estimatedTokens < 10000;
    }

    private static String callChatGPT(String prompt) {// 실제 gpt api 사용
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

    public List<ChatLogDto> findAllByUserId(String userId) {//사용자에 대한 모든 대화기록 불러오기
        return chatLogRepository.findByUserId(userId);
    }

    public ChatLogDto insertChatLog(String userId, String text, boolean bot) {
        // 새로운 ChatLogDto 객체 생성
        ChatLogDto newChatLog = new ChatLogDto();
        newChatLog.setUserId(userId); // userId 설정
        newChatLog.setDate(LocalDateTime.now()); // 현재 시간으로 date 설정
        newChatLog.setText(text); // text 설정
        newChatLog.setBot(bot); // bot 설정

        // chatLogRepository를 통해 데이터베이스에 저장
        return chatLogRepository.save(newChatLog);
    }

}
