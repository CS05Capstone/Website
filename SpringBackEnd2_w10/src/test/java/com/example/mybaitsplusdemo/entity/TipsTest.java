package com.example.mybaitsplusdemo.entity;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class TipsTest {

    private Tips tips;

    @BeforeEach
    public void setUp() {
        tips = new Tips();
    }

    @Test
    public void testId() {
        Long id = 123L;
        tips.setId(id);
        assertEquals(id, tips.getId());
    }

    @Test
    public void testActivityId() {
        Long activityId = 456L;
        tips.setActivityId(activityId);
        assertEquals(activityId, tips.getActivityId());
    }

    @Test
    public void testContent() {
        String content = "This is a tip!";
        tips.setContent(content);
        assertEquals(content, tips.getContent());
    }
}
