package com.example.mybaitsplusdemo.entity;

import javax.persistence.*;

@Entity
@Table(name = "learning_outcomes")
public class LearningOutcome {
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "activity_id", nullable = false)
    private Long ActivityId;
    public String getContent() {
        return content;
    }

    public void setContent(String outcome) {
        this.content = outcome;
    }


    @Column(name = "content", nullable = false)
    private String content;

    public Long getActivityId() {
        return ActivityId;
    }

    public void setActivityId(Long activityId) {
        ActivityId = activityId;
    }

//    @ManyToOne
//    @JoinColumn(name = "activity_id")
//    private Activity activity; // Assuming you have an Activity entity

//    public Activity getActivity() {
//        return activity;
//    }
//
//    public void setActivity(Activity activity) {
//        this.activity = activity;
//    }
}
