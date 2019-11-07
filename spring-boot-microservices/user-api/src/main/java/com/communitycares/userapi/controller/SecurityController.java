package com.communitycares.userapi.controller;

import com.communitycares.userapi.config.IAuthenticationFacade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

@Component
public class SecurityController {

    @Autowired
    private IAuthenticationFacade authenticationFacade;


    public String getCurrentUsername() {
        Authentication authentication = authenticationFacade.getAuthentication();
        return authentication.getName();
    }
}
