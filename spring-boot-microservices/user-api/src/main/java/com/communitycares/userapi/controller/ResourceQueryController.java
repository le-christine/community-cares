package com.communitycares.userapi.controller;

import com.communitycares.userapi.model.ResourceQuery;
import com.communitycares.userapi.service.ResourceQueryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/resource")
public class ResourceQueryController {

    @Autowired
    ResourceQueryService resourceQueryService;

    @PostMapping("/add")
    public ResourceQuery addResourceQueryToDb(@RequestBody ResourceQuery newResource) {
        return resourceQueryService.addResource(newResource);
    }

    @GetMapping("/list")
    public Iterable<ResourceQuery> listAllQueries() {
        return resourceQueryService.listAllResources();
    }

}
