package com.jobstream.backend.controller;


import com.jobstream.backend.dto.response.UserWithAddressDto;
import com.jobstream.backend.entity.User;
import com.jobstream.backend.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Author: ABEL
 * Created: 2025-08-06
 */
@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/users")
public class UserController {

    private UserService userService;
    private final Logger logger = LoggerFactory.getLogger(UserController.class);

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // Get all users
    @GetMapping("/all-users")
    public List<User> getAllUsers(){
       return userService.getUsers();
    }

    // Save user info from JWT to database
    @PostMapping("save-user")
    public void saveUser(@AuthenticationPrincipal Jwt jwt) {
        userService.saveUser(jwt.getClaims());
    }

    // Get single user with address
    @GetMapping("single-user")
    public UserWithAddressDto getUserWithAddress(@AuthenticationPrincipal Jwt jwt){
        String email = jwt.getClaim("sub");
        return userService.getUserByEmail(email);
    }

    }


