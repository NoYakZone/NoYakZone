package com.sm_oss.NoYakZone.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.sm_oss.NoYakZone.model.UserDto;
import com.sm_oss.NoYakZone.model.UserRepository;
import com.sm_oss.NoYakZone.service.UserService;

import java.util.List;

@RestController
@RequestMapping("/userData")
public class UserDataController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public List<UserDto> getAllUsers() { // 모든 유저 가져옴
        return userService.getAllUsers();
    }

    @PostMapping
    public UserDto addUser(@RequestBody UserDto userDto) { // 유저 추가 (회원가입)
        return userService.addUser(userDto);
    }

    @GetMapping("/isEmpty")
    public boolean isUserTableEmpty() {
        List<UserDto> users = userRepository.findAll();
        return users.isEmpty();
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteUser(@PathVariable String id) { // 유저 삭제
        boolean deleted = userService.deleteUserById(id);
        if (!deleted) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }
    }
}