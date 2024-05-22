package com.sm_oss.NoYakZone.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.sm_oss.NoYakZone.model.dto.*;
import com.sm_oss.NoYakZone.service.UserService;

@RestController
public class DataController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public String register(@RequestBody UserDto user) {
        userService.register(user);
        return "User registered successfully";
    }
}
