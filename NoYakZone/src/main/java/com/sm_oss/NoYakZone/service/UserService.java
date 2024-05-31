package com.sm_oss.NoYakZone.service;

import com.sm_oss.NoYakZone.model.UserDto;
import com.sm_oss.NoYakZone.model.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<UserDto> getAllUsers() {
        return userRepository.findAll();
    }

    public UserDto addUser(UserDto user) {
        return userRepository.save(user);
    }

    public boolean deleteUserById(String id) {
        try {
            userRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public boolean authenticateUser(String id, String password) {
        Optional<UserDto> user = userRepository.findById(id);
        if (user.isPresent() && user.get().getPassword().equals(password)) {
            return true;
        }
        return false;
    }

    public boolean existsById(String id) {
        return userRepository.existsById(id);
    }
}


/*
userDto json 예시
{
    "id": "tempId",
    "name": "tempName",
    "password": "tempPW",
    "birth": "010101",
    "phone": "01000000000",
    "email": "a@a.com",
    "address": "home sweet home",
    "official": true
}
 */