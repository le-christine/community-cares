package com.communitycares.userapi.controller;

import com.communitycares.userapi.model.JwtResponse;
import com.communitycares.userapi.model.ResourceQuery;
import com.communitycares.userapi.model.User;
import com.communitycares.userapi.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/user")
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

//    @PutMapping("/add/resource")
//    public Iterable<ResourceQuery> addResourceQuery(@RequestBody ResourceQuery newResourceQuery) {
//        return userService.addResourceQuery(newResourceQuery.getUniqueIdNumber(), newResourceQuery.getAgeGroup());
//    }
//
//    @DeleteMapping("/delete/resource")
//    public Iterable<ResourceQuery> deleteResourceQuery(@RequestBody ResourceQuery resourceQuery) {
//        return userService.deleteResourceQuery(resourceQuery.getUniqueIdNumber(), resourceQuery.getAgeGroup());
//    }

    @PutMapping("/add/{query_id}")
    public Iterable<ResourceQuery> addResourceQuery(@PathVariable Long query_id) {
    return userService.addResourceQuery(query_id);
    }

    @DeleteMapping("/delete/{query_id}")
    public Iterable<ResourceQuery> deleteResourceQuery(@PathVariable Long query_id) {
        return userService.deleteResourceQuery(query_id);
    }
}
