package com.example.mybaitsplusdemo.RequestBody;

import com.example.mybaitsplusdemo.entity.LearningOutcome;
import com.example.mybaitsplusdemo.entity.Session;

import java.util.List;
import java.util.Map;

public class SessionDTO {
    private Session session;
    private List<Map<String, Object>> cascaderData;

    private List<Long> learningOutcomes;

    // Getters and setters
    public Session getSession() {
        return session;
    }

    public void setSession(Session session) {
        this.session = session;
    }

    public List<Map<String, Object>> getCascaderData() {
        return cascaderData;
    }

    public void setCascaderData(List<Map<String, Object>> cascaderData) {
        this.cascaderData = cascaderData;
    }

    public List<Long> getLearningOutcomes() {
        return learningOutcomes;
    }

    public void setLearningOutcomes(List<Long> learningOutcomes) {
        this.learningOutcomes = learningOutcomes;
    }
}