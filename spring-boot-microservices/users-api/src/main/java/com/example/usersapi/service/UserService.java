package com.example.usersapi.service;

import com.example.usersapi.model.User;
import org.hibernate.dialect.PostgreSQL9Dialect;

import javax.xml.stream.events.Comment;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

@Service
public interface UserService extends UserDetailsService {
    public User getUser(String username);

    public String createUser(User newUser) throws Exception;

    public String login(User user);

}
