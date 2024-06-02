package com.sm_oss.NoYakZone.service;

import com.sm_oss.NoYakZone.model.ChatLogDto;
import com.sm_oss.NoYakZone.model.ChatLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ChatLogService {

    @Autowired
    private ChatLogRepository chatLogRepository;
    
}
