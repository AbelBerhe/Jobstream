package com.jobstream.backend.service;

import com.jobstream.backend.dao.UserRepository;
import com.jobstream.backend.entity.User;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Author: ABEL
 * Created: 2025-08-06
 */
@Service
public class UserService {

    private UserRepository userRepository;


    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getUsers(){
      return   userRepository.findAll();
    }
}
