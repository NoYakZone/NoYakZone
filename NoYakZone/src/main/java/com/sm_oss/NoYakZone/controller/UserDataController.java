package com.sm_oss.NoYakZone.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.sm_oss.NoYakZone.model.UserDto;
import com.sm_oss.NoYakZone.service.UserService;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/userData")
public class UserDataController {

    @Autowired
    private UserService userService;

    @GetMapping
    public List<UserDto> getAllUsers() {
        return userService.getAllUsers();
    }

    @PostMapping
    public ResponseEntity<?> addUser(@RequestBody UserDto userDto) {
        if (userService.existsById(userDto.getId())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("이미 사용 중인 아이디");
        }
        UserDto savedUser = userService.addUser(userDto);
        return ResponseEntity.ok(savedUser);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteUser(@PathVariable String id) {
        boolean deleted = userService.deleteUserById(id);
        if (!deleted) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "존재하지 않는 아이디");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody UserDto userDto) {
        boolean authenticated = userService.authenticateUser(userDto.getId(), userDto.getPassword());
        if (authenticated) {
            UserDto authenticatedUser = userService.findById(userDto.getId());
            return ResponseEntity.ok()
                    .body("로그인 가능. 사용자 권한: " + (authenticatedUser.isOfficial() ? "수사자" : "일반 사용자"));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인 불가능");
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(@PathVariable String id, @RequestBody UserDto userDto) {
        if (!userService.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("존재하지 않는 아이디");
        }
        UserDto updatedUser = userService.updateUser(id, userDto);
        return ResponseEntity.ok(updatedUser);
    }
}

// userDto json 예시
// {
// "id": "tempId",
// "name": "tempName",
// "password": "tempPW",
// "birth": "010616",
// "phone": "01034445792",
// "email": "a@a.com",
// "address": "401",
// "official": false
// }
