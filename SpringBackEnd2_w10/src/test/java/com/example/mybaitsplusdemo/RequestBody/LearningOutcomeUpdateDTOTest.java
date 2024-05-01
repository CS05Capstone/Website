package com.example.mybaitsplusdemo.RequestBody;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class LearningOutcomeUpdateDTOTest {

    private LearningOutcomeUpdateDTO dto;

    @BeforeEach
    public void setUp() {
        dto = new LearningOutcomeUpdateDTO();
    }

    @Test
    public void testContent() {
        String content = "Expected learning outcome content.";
        dto.setContent(content);
        assertEquals(content, dto.getContent());
    }
}
