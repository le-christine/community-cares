package com.communitycares.userapi.controller;

import com.communitycares.userapi.model.JwtResponse;
import com.communitycares.userapi.model.ResourceQuery;
import com.communitycares.userapi.model.User;
import com.communitycares.userapi.service.ResourceQueryService;
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

    @Autowired
    ResourceQueryService resourceQueryService;

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

    @PutMapping("/add")
    public Iterable<ResourceQuery> addResourceQuery(@RequestBody ResourceQuery rq) {
       String uniqueIdNumber = rq.getUniqueIdNumber();
       String programCategory = rq.getProgramCategory();
       return userService.addResourceQuery(resourceQueryService.findByUniqueIdNumberAndProgramCategory(uniqueIdNumber, programCategory));
    }

    @DeleteMapping("/delete")
    public Iterable<ResourceQuery> deleteResourceQuery(@RequestBody ResourceQuery rq) {
        String uniqueIdNumber = rq.getUniqueIdNumber();
        String programCategory = rq.getProgramCategory();
        return userService.deleteResourceQuery(resourceQueryService.findByUniqueIdNumberAndProgramCategory(uniqueIdNumber, programCategory));
    }

    @GetMapping("/resources/list")
    public Iterable<ResourceQuery> getUserSavedResources() {
        return userService.getUserSavedResources();
    }
}
