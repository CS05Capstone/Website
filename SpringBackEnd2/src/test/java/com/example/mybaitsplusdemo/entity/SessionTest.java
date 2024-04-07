package com.example.mybaitsplusdemo.entity;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Arrays;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

public class SessionTest {

    private Session session;

    @BeforeEach
    public void setup() {
        session = new Session();
    }

    @Test
    public void testSessionId() {
        session.setId(1L);
        assertEquals(1L, session.getId());
    }

    @Test
    public void testSessionName() {
        session.setSessionName("Test Session");
        assertEquals("Test Session", session.getSessionName());
    }

    @Test
    public void testSessionDate() {
        LocalDate date = LocalDate.now();
        session.setSessionDate(date);
        assertEquals(date, session.getSessionDate());
    }

    @Test
    public void testSessionStartTime() {
        LocalTime time = LocalTime.now();
        session.setStartTime(time);
        assertEquals(time, session.getStartTime());
    }

    @Test
    public void testSessionEndTime() {
        LocalTime time = LocalTime.now().plusHours(1);
        session.setEndTime(time);
        assertEquals(time, session.getEndTime());
    }

    @Test
    public void testActivities() {
        Activity activity = new Activity();
        session.setActivities(Arrays.asList(activity));
        assertNotNull(session.getActivities());
        assertEquals(activity, session.getActivities().get(0));
    }

    @Test
    public void testLocation() {
        session.setLocation("Test Location");
        assertEquals("Test Location", session.getLocation());
    }

    @Test
    public void testServiceUser() {
        session.setServiceUser("Test User");
        assertEquals("Test User", session.getServiceUser());
    }

    @Test
    public void testPassword() {
        session.setPassword("TestPassword123");
        assertEquals("TestPassword123", session.getPassword());
    }

    @Test
    public void testLearningOutcome() {
        session.setLearningOutcome("Test Outcome");
        assertEquals("Test Outcome", session.getLearningOutcome());
    }

    @Test
    public void testCreatedByCaseworkerId() {
        session.setCreatedByCaseworkerId(123L);
        assertEquals(123L, session.getCreatedByCaseworkerId());
    }

    @Test
    public void testModules() {
        Module module = new Module(); // Assuming you have a default constructor for Module
        session.setModules(Arrays.asList(module));
        assertNotNull(session.getModules());
        assertEquals(module, session.getModules().get(0));
    }

    @Test
    public void testLearningOutcomesList() {
        LearningOutcome learningOutcome = new LearningOutcome(); // Assuming you have a default constructor for LearningOutcome
        session.setLearningOutcomes(Arrays.asList(learningOutcome));
        assertNotNull(session.getLearningOutcomes());
        assertEquals(learningOutcome, session.getLearningOutcomes().get(0));
    }

    @Test
    public void testStatus() {
        SessionStatus status = SessionStatus.finished; // Replace ACTIVE with one of your enum values
        session.setStatus(status);
        assertEquals(status, session.getStatus());

        status = SessionStatus.unfinished;
        session.setStatus(status);
        assertEquals(status, session.getStatus());
    }

}

