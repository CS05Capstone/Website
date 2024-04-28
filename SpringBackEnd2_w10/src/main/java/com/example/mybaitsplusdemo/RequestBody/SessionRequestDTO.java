package com.example.mybaitsplusdemo.RequestBody;

import com.example.mybaitsplusdemo.entity.Activity;
import com.example.mybaitsplusdemo.entity.LearningOutcome;

import java.util.List;

public class SessionRequestDTO {
    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public String getEndTime() {
        return endTime;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }

    public String getSessionDate() {
        return sessionDate;
    }

    public void setSessionDate(String sessionDate) {
        this.sessionDate = sessionDate;
    }

    public String getSessionName() {
        return sessionName;
    }

    public void setSessionName(String sessionName) {
        this.sessionName = sessionName;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getServiceUser() {
        return serviceUser;
    }

    public void setServiceUser(String serviceUser) {
        this.serviceUser = serviceUser;
    }

    public String getCaseWorkerId() {
        return caseWorkerId;
    }

    public void setCaseWorkerId(String caseWorkerId) {
        this.caseWorkerId = caseWorkerId;
    }

    public List<Activity> getActivities() {
        return activities;
    }

    public void setActivities(List<Activity> activities) {
        this.activities = activities;
    }

    private String startTime;
    private String endTime;
    private String sessionDate;
    private String sessionName;
    private String location;
    private String password;
    private String serviceUser;

    public List<LearningOutcome> getLearningOutcomes() {
        return learningOutcomes;
    }

    public void setLearningOutcomes(List<LearningOutcome> learningOutcomes) {
        this.learningOutcomes = learningOutcomes;
    }

    private List<LearningOutcome> learningOutcomes;
    private String caseWorkerId;
    private List<Activity> activities;

}