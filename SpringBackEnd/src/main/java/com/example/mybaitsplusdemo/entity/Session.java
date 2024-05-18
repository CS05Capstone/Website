package com.example.mybaitsplusdemo.entity;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Date;
import java.util.List;
import com.example.mybaitsplusdemo.entity.Activity;

@Entity
@Table(name = "sessions")
public class Session {
@ManyToMany
@JoinTable(
        name = "session_activities",
        joinColumns = @JoinColumn(name = "session_id"),
        inverseJoinColumns = @JoinColumn(name = "activity_id")
)
    private List<Activity> activities;

    // Many-to-many relationship with Module
    @ManyToMany
    @JoinTable(
            name = "session_modules",
            joinColumns = @JoinColumn(name = "session_id"),
            inverseJoinColumns = @JoinColumn(name = "module_id")
    )
    private List<Module> modules;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private SessionStatus status; // Assuming you have an enum for this

    @ManyToMany
    @JoinTable(
            name = "session_learning_outcomes",
            joinColumns = @JoinColumn(name = "session_id"),
            inverseJoinColumns = @JoinColumn(name = "learning_outcome_id")
    )
    private List<LearningOutcome> learningOutcomes;
    public SessionStatus getStatus() {
        return status;
    }

    public void setStatus(SessionStatus status) {
        this.status = status;
    }

    public List<LearningOutcome> getLearningOutcomes() {
        return learningOutcomes;
    }

    public void setLearningOutcomes(List<LearningOutcome> learningOutcomes) {
        this.learningOutcomes = learningOutcomes;
    }

    public List<Activity> getActivities() {
        return activities;
    }

    public void setActivities(List<Activity> activities) {
        this.activities = activities;
    }

    public List<Module> getModules() {
        return modules;
    }

    public void setModules(List<Module> modules) {
        this.modules = modules;
    }

    private Long createdByCaseworkerId;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "location", nullable = false)
    private String location;
    @Column(name = "session_name", nullable = false)
    private String sessionName;

    @Column(name = "session_date", nullable = false)
    private LocalDate sessionDate;

    @Column(name = "start_time", nullable = false)
    private LocalTime startTime;

    @Column(name = "end_time", nullable = false)
    private LocalTime endTime;

    @Column(name = "service_user", nullable = false)
    private String serviceUser; // Assuming a String for now




    @Column(name = "password", nullable = false)
    private String password;


    @Column(name = "learning_outcome")
    private String learningOutcome;



    public Long getId() {
        return id;
    }

    public String getSessionName() {
        return sessionName;
    }

    public LocalDate getSessionDate() {
        return sessionDate;
    }

    public LocalTime getStartTime() {
        return startTime;
    }

    public LocalTime getEndTime() {
        return endTime;
    }

    public String getServiceUser() {
        return serviceUser;
    }


    public String getPassword() {
        return password;
    }

    // Setters
    public void setId(Long id) {
        this.id = id;
    }

    public void setSessionName(String sessionName) {
        this.sessionName = sessionName;
    }

    public void setSessionDate(LocalDate sessionDate) {
        this.sessionDate = sessionDate;
    }

    public void setStartTime(LocalTime startTime) {
        this.startTime = startTime;
    }
    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public void setEndTime(LocalTime endTime) {
        this.endTime = endTime;
    }

    public void setServiceUser(String serviceUser) {
        this.serviceUser = serviceUser;
    }


    public void setPassword(String password) {
        this.password = password;
    }



    // Getter
    public String getLearningOutcome() {
        return learningOutcome;
    }

    // Setter
    public void setLearningOutcome(String learningOutcome) {
        this.learningOutcome = learningOutcome;
    }


    public Long getCreatedByCaseworkerId() {
        return createdByCaseworkerId;
    }

    public void setCreatedByCaseworkerId(Long createdByCaseworkerId) {
        this.createdByCaseworkerId = createdByCaseworkerId;
    }
}

