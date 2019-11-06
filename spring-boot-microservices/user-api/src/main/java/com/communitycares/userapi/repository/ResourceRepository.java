package com.communitycares.userapi.repository;

import com.communitycares.userapi.model.Resources;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ResourceRepository extends CrudRepository<Resources, Long> {
}
