package com.sm_oss.NoYakZone.model;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ChatLogRepository extends JpaRepository<ChatLogDto, Long> { // <엔티티 타입, ID 타입>
    List<ChatLogDto> findByUserId(String userId);
}