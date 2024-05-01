package com.example.mybaitsplusdemo.entity;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class ActivityTest {

    private Activity activity;

    @BeforeEach
    public void setUp() {
        activity = new Activity();
    }

    @Test
    public void testId() {
        Long id = 123L;
        activity.setId(id);
        assertEquals(id, activity.getId());
    }

    @Test
    public void testName() {
        String name = "Test Activity";
        activity.setName(name);
        assertEquals(name, activity.getName());
    }

    @Test
    public void testModule() {
        Module module = new Module("Test Module");
        activity.setModule(module);
        assertEquals(module, activity.getModule());
    }

    @Test
    public void testModuleId1() {
        Long moduleId1 = 456L;
        activity.setModuleId1(moduleId1);
        assertEquals(moduleId1, activity.getModule_id_1());
    }

    @Test
    public void testIntroduction() {
        String introduction = "This is an introduction to the activity.";
        activity.setIntroduction(introduction);
        assertEquals(introduction, activity.getIntroduction());
    }

    @Test
    public void testTips() {
        String tips = "Here are some tips.";
        activity.setTips(tips);
        assertEquals(tips, activity.getTips());
    }

    @Test
    public void testOutcome() {
        String outcome = "Expected outcome of the activity.";
        activity.setOutcome(outcome);
        assertEquals(outcome, activity.getOutcome());
    }

    @Test
    public void testContructor(){
        activity = new Activity("name", new Module());
    }
}
