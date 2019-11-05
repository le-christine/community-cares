package com.example.usersapi.service;

import com.example.usersapi.config.JwtUtil;
import com.example.usersapi.model.User;
import com.example.usersapi.repository.UserRepository;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.ArrayList;
import java.util.List;


@Service
public class UserServiceImpl implements UserService {


    @Autowired
    UserRepository userRepository;

    @Autowired
    JwtUtil jwtUtil;

    @Autowired
    @Qualifier("encoder")
    PasswordEncoder bCryptPasswordEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = getUser(username);

        if(user==null)
            throw new UsernameNotFoundException("User null");

        return new org.springframework.security.core.userdetails.User(user.getUsername(), bCryptPasswordEncoder.encode(user.getPassword()),
                true, true, true, true, getGrantedAuthorities(user));
    }


    private List<GrantedAuthority> getGrantedAuthorities(User user){
        List<GrantedAuthority> authorities = new ArrayList<>();

        authorities.add(new SimpleGrantedAuthority("USER"));

        return authorities;
    }

    @Override
    public User getUser(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public String createUser(User newUser) throws Exception{
        //Encrypts the passed over password
        newUser.setPassword(bCryptPasswordEncoder.encode(newUser.getPassword()));
        if(userRepository.findByUsername(newUser.getUsername()) == null){
            userRepository.save(newUser);
            UserDetails userDetails = loadUserByUsername(newUser.getUsername());
            return jwtUtil.generateToken(userDetails);
        }
        throw new Exception();
    }
    @Override
    public String login(User user) {
        User newUser = userRepository.findByUsername(user.getUsername());
        if(newUser != null && bCryptPasswordEncoder.matches(user.getPassword(), newUser.getPassword())){
            UserDetails userDetails = loadUserByUsername(newUser.getUsername());
            return jwtUtil.generateToken(userDetails);
        }
        return null;
    }
}
