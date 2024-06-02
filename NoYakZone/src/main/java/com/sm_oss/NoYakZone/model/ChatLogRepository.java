package com.sm_oss.NoYakZone.model;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatLogRepository extends JpaRepository<ChatLogDto, Long> { // <엔티티 타입, ID 타입>
    // 여기에 필요한 메소드를 추가할 수 있습니다.
    // 예를 들어, 특정 사용자의 채팅 로그를 찾는 메소드 등
}