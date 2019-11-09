package com.communitycares.userapi.service;

import com.communitycares.userapi.model.ResourceQuery;
import org.springframework.stereotype.Service;

@Service
public interface ResourceQueryService {
    public ResourceQuery addResource(ResourceQuery newResource);

    public Iterable<ResourceQuery> listAllResources();

    public ResourceQuery findByUniqueIdNumberAndProgramCategory(String uniqueIdNumber, String programCategory);
}
