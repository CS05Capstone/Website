package com.example.mybaitsplusdemo.RequestBody;

public class LearningOutcomeDTO {
    private String content;
    private Long activityId; // newly added field


    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Long getActivityId() {
        return activityId;
    }

    public void setActivityId(Long activityId) {
        this.activityId = activityId;
    }
}
