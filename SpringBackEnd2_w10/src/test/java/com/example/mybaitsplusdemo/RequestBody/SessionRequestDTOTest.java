package com.example.mybaitsplusdemo.RequestBody;

import com.example.mybaitsplusdemo.entity.Activity;
import com.example.mybaitsplusdemo.entity.LearningOutcome;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

public class SessionRequestDTOTest {

    private SessionRequestDTO sessionRequestDTO;

    @BeforeEach
    public void setUp() {
        sessionRequestDTO = new SessionRequestDTO();
    }

    @Test
    public void testGetAndSetStartTime() {
        String startTime = "09:00";
        sessionRequestDTO.setStartTime(startTime);
        assertEquals(startTime, sessionRequestDTO.getStartTime());
    }

    @Test
    public void testGetAndSetEndTime() {
        String endTime = "17:00";
        sessionRequestDTO.setEndTime(endTime);
        assertEquals(endTime, sessionRequestDTO.getEndTime());
    }

    // Similarly, write tests for other string properties

    @Test
    public void testGetAndSetActivities() {
        List<Activity> activities = Arrays.asList(new Activity(), new Activity());
        sessionRequestDTO.setActivities(activities);
        assertEquals(activities, sessionRequestDTO.getActivities());
    }

    @Test
    public void testGetAndSetLearningOutcomes() {
        List<LearningOutcome> outcomes = Arrays.asList(new LearningOutcome(), new LearningOutcome());
        sessionRequestDTO.setLearningOutcomes(outcomes);
        assertEquals(outcomes, sessionRequestDTO.getLearningOutcomes());
    }

    @Test
    public void testGetAndSetSessionDate() {
        String sessionDate = "2023-10-04";
        sessionRequestDTO.setSessionDate(sessionDate);
        assertEquals(sessionDate, sessionRequestDTO.getSessionDate());
    }

    @Test
    public void testGetAndSetSessionName() {
        String sessionName = "MySession";
        sessionRequestDTO.setSessionName(sessionName);
        assertEquals(sessionName, sessionRequestDTO.getSessionName());
    }

    @Test
    public void testGetAndSetLocation() {
        String location = "Room 101";
        sessionRequestDTO.setLocation(location);
        assertEquals(location, sessionRequestDTO.getLocation());
    }

    @Test
    public void testGetAndSetPassword() {
        String password = "SecurePassword123";
        sessionRequestDTO.setPassword(password);
        assertEquals(password, sessionRequestDTO.getPassword());
    }

    @Test
    public void testGetAndSetServiceUser() {
        String serviceUser = "ServiceUser123";
        sessionRequestDTO.setServiceUser(serviceUser);
        assertEquals(serviceUser, sessionRequestDTO.getServiceUser());
    }

    @Test
    public void testGetAndSetCaseWorkerId() {
        String caseWorkerId = "CaseWorker789";
        sessionRequestDTO.setCaseWorkerId(caseWorkerId);
        assertEquals(caseWorkerId, sessionRequestDTO.getCaseWorkerId());
    }

}

