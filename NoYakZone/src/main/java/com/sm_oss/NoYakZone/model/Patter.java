package com.sm_oss.NoYakZone.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import lombok.Data;

@Entity
@Table(name = "\"patter\"")
@Data
public class Patter {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int index;

    private String word;
    private String detail;
    private Integer count;
}