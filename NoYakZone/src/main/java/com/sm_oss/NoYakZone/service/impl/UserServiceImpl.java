package com.sm_oss.NoYakZone.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sm_oss.NoYakZone.model.dao.UserDao;
import com.sm_oss.NoYakZone.model.dto.UserDto;
import com.sm_oss.NoYakZone.service.UserService;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserDao userDao;

    @Override
    public int register(UserDto userDto) {
        return userDao.register(userDto);
    }
}
