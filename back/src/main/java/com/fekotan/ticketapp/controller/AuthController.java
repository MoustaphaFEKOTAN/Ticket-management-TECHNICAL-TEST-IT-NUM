package com.fekotan.ticketapp.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fekotan.ticketapp.dto.RegisterRequest;
import com.fekotan.ticketapp.entity.User;
import com.fekotan.ticketapp.service.UserService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController // This means that this class is a Controller
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<User> register(@Valid @RequestBody RegisterRequest request) {
        User user = userService.register(request);
        return ResponseEntity.ok(user);
    }
}
