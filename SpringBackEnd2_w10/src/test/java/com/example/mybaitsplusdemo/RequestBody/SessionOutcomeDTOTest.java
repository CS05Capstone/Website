package com.example.mybaitsplusdemo.RequestBody;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class SessionOutcomeDTOTest {

    private SessionOutcomeDTO dto;

    @BeforeEach
    public void setUp() {
        dto = new SessionOutcomeDTO();
    }

    @Test
    public void testGettersAndSetters() {
        dto.setId(12345L);
        dto.setContent("TestContent");

        assertEquals(12345L, dto.getId());
        assertEquals("TestContent", dto.getContent());
    }
}