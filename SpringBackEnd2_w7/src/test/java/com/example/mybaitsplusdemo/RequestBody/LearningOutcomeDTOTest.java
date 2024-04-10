package com.example.mybaitsplusdemo.RequestBody;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class LearningOutcomeDTOTest {

    private LearningOutcomeDTO dto;

    @BeforeEach
    public void setUp() {
        dto = new LearningOutcomeDTO();
    }

    @Test
    public void testContent() {
        String expectedContent = "Expected learning outcome content.";
        dto.setContent(expectedContent);
        assertEquals(expectedContent, dto.getContent());
    }

    @Test
    public void testActivityId() {
        Long expectedActivityId = 123L;
        dto.setActivityId(expectedActivityId);
        assertEquals(expectedActivityId, dto.getActivityId());
    }
}
