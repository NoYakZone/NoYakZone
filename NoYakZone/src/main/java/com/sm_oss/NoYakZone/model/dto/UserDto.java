package com.sm_oss.NoYakZone.model.dto;

import lombok.Data;

@Data
public class UserDto {
    private String id;
    private String name;
    private String password;
    private String birth;
    private String phone;
    private String email;
    private String address;
    private boolean official;
}
