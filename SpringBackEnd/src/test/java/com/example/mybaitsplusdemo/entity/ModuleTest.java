package com.example.mybaitsplusdemo.entity;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.HashSet;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

public class ModuleTest {

    private Module module;

    @BeforeEach
    public void setUp() {
        module = new Module();
    }

    @Test
    public void testId() {
        Long id = 123L;
        module.setId(id);
        assertEquals(id, module.getId());
    }

    @Test
    public void testName() {
        String name = "ModuleName";
        module.setName(name);
        assertEquals(name, module.getName());
    }

    @Test
    public void testActivities() {
        Set<Activity> activities = new HashSet<>();
        Activity activity1 = new Activity();
        activity1.setName("Activity1");
        Activity activity2 = new Activity();
        activity2.setName("Activity2");
        activities.add(activity1);
        activities.add(activity2);

        module.setActivities(activities);

        assertNotNull(module.getActivities());
        assertEquals(2, module.getActivities().size());
    }

    @Test
    public void testConstructor() {
        String name = "ModuleName";
        Module anotherModule = new Module(name);
        assertEquals(name, anotherModule.getName());
    }
}
