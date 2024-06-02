package com.sm_oss.NoYakZone.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "board")
@Data
public class BoardDto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int index;
    private LocalDateTime date;
    private String text;
    private String place;
    private String url;
    private String id;
    private String web;
    private String picture;
}
