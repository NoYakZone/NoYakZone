package com.sm_oss.NoYakZone.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sm_oss.NoYakZone.model.ChatLog;

import java.util.List;

@Repository
public interface ChatLogRepository extends JpaRepository<ChatLog, Long> {
    List<ChatLog> findByUserId(String userId);
}