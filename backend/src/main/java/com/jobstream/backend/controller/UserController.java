package com.jobstream.backend.controller;

import com.jobstream.backend.entity.User;
import com.jobstream.backend.service.UserService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Author: ABEL
 * Created: 2025-08-06
 */
@CrossOrigin("https://localhost:3000")
@RestController
@RequestMapping("/api/user")
public class UserController {

    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/users")
    public List<User> getAllUsers(){
       return userService.getUsers();
    }
}
