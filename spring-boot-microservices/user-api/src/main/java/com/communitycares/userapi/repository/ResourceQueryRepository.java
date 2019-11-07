package com.communitycares.userapi.repository;

import com.communitycares.userapi.model.ResourceQuery;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ResourceQueryRepository extends CrudRepository<ResourceQuery, Long> {
}
