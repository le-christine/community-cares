package com.communitycares.userapi.repository;

import com.communitycares.userapi.model.Resources;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ResourceRepository extends CrudRepository<Resources, Long> {
    @Query("FROM resource_query rq WHERE rq.unique_id_number = ?1 AND rq.age_group = ?2")
    public Resources findByAgeGroupAndUniqueIdNumber(String uniqueIdNum, String ageGroup);
}
