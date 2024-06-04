package com.sm_oss.NoYakZone.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sm_oss.NoYakZone.model.ChatLog;

import java.util.List;

@Repository
public interface ChatLogRepository extends JpaRepository<ChatLog, Long> { // <엔티티 타입, ID 타입>
    List<ChatLog> findByUserId(String userId);
}