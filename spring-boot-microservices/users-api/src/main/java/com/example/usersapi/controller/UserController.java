package com.example.usersapi.controller;

import com.example.usersapi.model.JwtResponse;
import com.example.usersapi.model.User;
import com.example.usersapi.service.UserService;
import com.example.usersapi.config.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;


@RestController
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping("/hello")
    public String hello() {
        return "Hello World";
    }

    @PostMapping("/signup")
    public ResponseEntity<?> createUser(@RequestBody User newUser) {
        try{
            return ResponseEntity.ok(new JwtResponse(userService.createUser(newUser)));
        }
        catch (Exception exc){
            throw new ResponseStatusException(
                    HttpStatus.IM_USED, "Username already exists", exc);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User returningUser) {
        return ResponseEntity.ok(new JwtResponse(userService.login(returningUser)));
    }
}
