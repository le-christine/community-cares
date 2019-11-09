package com.communitycares.userapi.service;

import com.communitycares.userapi.model.ResourceQuery;
import com.communitycares.userapi.repository.ResourceQueryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ResourceQueryServiceImp implements ResourceQueryService {

    @Autowired
    ResourceQueryRepository resourceQueryRepository;

    @Override
    public ResourceQuery addResource(ResourceQuery newResource) {
        return resourceQueryRepository.save(newResource);
    }

    @Override
    public Iterable<ResourceQuery> listAllResources() {
        return resourceQueryRepository.findAll();
    }

    @Override
    public ResourceQuery findByUniqueIdNumberAndProgramCategory(String uniqueIdNumber, String programCategory) {
        return resourceQueryRepository.findByUniqueIdNumberAndAndProgramCategory(uniqueIdNumber, programCategory);
    }

}
