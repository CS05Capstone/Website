package com.example.mybaitsplusdemo.RequestBody;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class TipsUpdateDTOTest {

    private TipsUpdateDTO dto;

    @BeforeEach
    public void setUp() {
        dto = new TipsUpdateDTO();
    }

    @Test
    public void testContent() {
        String content = "Expected tips content.";
        dto.setContent(content);
        assertEquals(content, dto.getContent());
    }
}
