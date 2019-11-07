package com.communitycares.userapi.service;

import com.communitycares.userapi.model.Resources;
import com.communitycares.userapi.repository.ResourceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ResourceServiceImp implements ResourceService {

    @Autowired
    ResourceRepository resourceRepository;

    @Override
    public Resources addResource(Resources newResource) {
        return resourceRepository.save(newResource);
    }

    @Override
    public Iterable<Resources> listAllResources() {
        return resourceRepository.findAll();
    }
}
