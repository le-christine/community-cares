package com.communitycares.userapi.service;

import com.communitycares.userapi.model.Resources;
import org.springframework.stereotype.Service;

@Service
public interface ResourceService {
    public Resources addResource(Resources newResource);

    public Iterable<Resources> listAllResources();
}
