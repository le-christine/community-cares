package com.example.usersapi.model;

import javax.persistence.*;

@Entity
@Table(name = "resources")
public class Resources {

    @Id
    @GeneratedValue
    @Column(name="resource_id")
    private Long id;

    @Column(name="program_name")
    private String programName;

    @Column(name="government_agency")
    private String governmentAgency;

    @Column(name="population_served")
    private String populationServed;

    @Column(name="age_group")
    private String ageGroup;

    @Column(name="plain_language_program_name")
    private String plainLanguageProgramName;

    @Column(name="program_description")
    private String programDescription;

    @Column(name="apply_online_call_to_action")
    private String applyOnlineCallToAction;

    @Column(name="get_help_online")
    private String getHelpOnline;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getProgramName() {
        return programName;
    }

    public void setProgramName(String programName) {
        this.programName = programName;
    }

    public String getGovernmentAgency() {
        return governmentAgency;
    }

    public void setGovernmentAgency(String governmentAgency) {
        this.governmentAgency = governmentAgency;
    }

    public String getPopulationServed() {
        return populationServed;
    }

    public void setPopulationServed(String populationServed) {
        this.populationServed = populationServed;
    }

    public String getAgeGroup() {
        return ageGroup;
    }

    public void setAgeGroup(String ageGroup) {
        this.ageGroup = ageGroup;
    }

    public String getPlainLanguageProgramName() {
        return plainLanguageProgramName;
    }

    public void setPlainLanguageProgramName(String plainLanguageProgramName) {
        this.plainLanguageProgramName = plainLanguageProgramName;
    }

    public String getProgramDescription() {
        return programDescription;
    }

    public void setProgramDescription(String programDescription) {
        this.programDescription = programDescription;
    }

    public String getApplyOnlineCallToAction() {
        return applyOnlineCallToAction;
    }

    public void setApplyOnlineCallToAction(String applyOnlineCallToAction) {
        this.applyOnlineCallToAction = applyOnlineCallToAction;
    }

    public String getGetHelpOnline() {
        return getHelpOnline;
    }

    public void setGetHelpOnline(String getHelpOnline) {
        this.getHelpOnline = getHelpOnline;
    }
}
