package com.sm_oss.NoYakZone.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "\"users\"")
@Data
public class UserDto {
    @Id
    private String id;
    private String name;
    private String password;
    private String birth;
    private String phone;
    private String email;
    private String address;
    private boolean official;
}