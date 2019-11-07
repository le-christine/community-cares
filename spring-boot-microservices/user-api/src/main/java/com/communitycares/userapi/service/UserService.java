package com.communitycares.userapi.service;

import com.communitycares.userapi.model.ResourceQuery;
import com.communitycares.userapi.model.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

@Service
public interface UserService extends UserDetailsService {
    public User getUser(String username);

    public String createUser(User newUser) throws Exception;

    public String login(User user);

    public Iterable<ResourceQuery> addResourceQuery(Long query_id);

    public Iterable<ResourceQuery> deleteResourceQuery(Long query_id);

}
