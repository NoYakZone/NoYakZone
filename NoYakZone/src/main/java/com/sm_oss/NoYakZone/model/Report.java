package com.sm_oss.NoYakZone.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import lombok.Data;

@Entity
@Table(name = "report")
@Data
public class Report {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int index;
    private String userId;
    private java.time.LocalDateTime date;
    private String title;
    private String text;
    private String link;
    private String picture;
}