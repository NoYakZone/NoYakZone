package com.sm_oss.NoYakZone.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.sm_oss.NoYakZone.model.dao.UserDao;
import com.sm_oss.NoYakZone.model.dto.UserDto;

@Service
public class UserService {

    @Autowired
    private UserDao userDao;

    public void registerUser(UserDto user) {
        userDao.insertUser(user);
    }
}
