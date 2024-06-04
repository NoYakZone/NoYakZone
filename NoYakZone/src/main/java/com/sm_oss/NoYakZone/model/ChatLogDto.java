package com.sm_oss.NoYakZone.model;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "\"chatlog\"")
@Data

public class ChatLogDto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // PostgreSQL의 SERIAL을 위한 설정
    private Long index; // SERIAL 타입에 맞게 Long 타입을 사용

    @Column(name = "user_id") // 필드 이름과 DB 컬럼 이름이 다를 경우 @Column 어노테이션을 이용해 매핑
    private String userId;

    private LocalDateTime date; // TIMESTAMP에 맞게 LocalDateTime 사용

    private String text;

    private boolean bot;
}