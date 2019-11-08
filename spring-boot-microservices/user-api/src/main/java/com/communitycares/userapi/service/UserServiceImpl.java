package com.communitycares.userapi.service;

import com.communitycares.userapi.config.JwtUtil;
import com.communitycares.userapi.controller.SecurityController;
import com.communitycares.userapi.model.ResourceQuery;
import com.communitycares.userapi.model.User;
import com.communitycares.userapi.repository.ResourceQueryRepository;
import com.communitycares.userapi.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
public class UserServiceImpl implements UserService {


    @Autowired
    UserRepository userRepository;

    @Autowired
    ResourceQueryRepository resourceQueryRepository;

    @Autowired
    JwtUtil jwtUtil;

    @Autowired
    SecurityController securityController;

    @Autowired
    @Qualifier("encoder")
    PasswordEncoder bCryptPasswordEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = getUser(username);

        if (user == null)
            throw new UsernameNotFoundException("User null");

        return new org.springframework.security.core.userdetails.User(user.getUsername(), bCryptPasswordEncoder.encode(user.getPassword()),
                true, true, true, true, getGrantedAuthorities(user));
    }


    private List<GrantedAuthority> getGrantedAuthorities(User user) {
        List<GrantedAuthority> authorities = new ArrayList<>();

        authorities.add(new SimpleGrantedAuthority("USER"));

        return authorities;
    }

    @Override
    public User getUser(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public String createUser(User newUser) throws Exception {
        //Encrypts the passed over password
        newUser.setPassword(bCryptPasswordEncoder.encode(newUser.getPassword()));
        if (userRepository.findByUsername(newUser.getUsername()) == null) {
            userRepository.save(newUser);
            UserDetails userDetails = loadUserByUsername(newUser.getUsername());
            return jwtUtil.generateToken(userDetails);
        }
        throw new Exception();
    }

    @Override
    public String login(User user) {
        User newUser = userRepository.findByUsername(user.getUsername());
        if (newUser != null && bCryptPasswordEncoder.matches(user.getPassword(), newUser.getPassword())) {
            UserDetails userDetails = loadUserByUsername(newUser.getUsername());
            return jwtUtil.generateToken(userDetails);
        }
        return null;
    }

    @Override
    public Iterable<ResourceQuery> addResourceQuery(ResourceQuery rq) {
        User user = userRepository.findByUsername((securityController.getCurrentUsername()));
        user.addResourcesToList(rq);

        userRepository.save(user);
        return user.getResources();
    }

    @Override
    public Iterable<ResourceQuery> deleteResourceQuery(ResourceQuery rq) {
        User user = userRepository.findByUsername((securityController.getCurrentUsername()));
        user.deleteResourcesFromList(rq);

        userRepository.save(user);
        return user.getResources();
    }

}