package com.communitycares.userapi.model;


import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "resource_query")
public class ResourceQuery {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name="query_id")
    private Long id;

    @Column(name="api_name")
    private String apiName;

    @Column(name="api_resource_json")
    private String apiResourceJson;

    @Column(name="unique_id_number")
    private String uniqueIdNumber;

    @Column(name="age_group")
    private String ageGroup;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getApiName() {
        return apiName;
    }

    public void setApiName(String apiName) {
        this.apiName = apiName;
    }

    public String getApiResourceJson() {
        return apiResourceJson;
    }

    public void setApiResourceJson(String apiResourceJson) {
        this.apiResourceJson = apiResourceJson;
    }

    public String getUniqueIdNumber() {
        return uniqueIdNumber;
    }

    public void setUniqueIdNumber(String uniqueIdNumber) {
        this.uniqueIdNumber = uniqueIdNumber;
    }

    public String getAgeGroup() {
        return ageGroup;
    }

    public void setAgeGroup(String ageGroup) {
        this.ageGroup = ageGroup;
    }
}
