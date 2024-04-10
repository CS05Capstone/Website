package com.example.mybaitsplusdemo.RequestBody;

import com.example.mybaitsplusdemo.entity.Session;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

public class SessionDTOTest {

    private SessionDTO sessionDTO;

    @BeforeEach
    public void setUp() {
        sessionDTO = new SessionDTO();
    }

    @Test
    public void testGetSetSession() {
        Session session = new Session();
        // Set session properties as needed for testing

        sessionDTO.setSession(session);

        assertEquals(session, sessionDTO.getSession());
    }

    @Test
    public void testGetSetCascaderData() {
        List<Map<String, Object>> cascaderData = new ArrayList<>();
        Map<String, Object> dataItem1 = new HashMap<>();
        dataItem1.put("key1", "value1");
        // Add more data items as needed

        cascaderData.add(dataItem1);

        sessionDTO.setCascaderData(cascaderData);

        assertEquals(cascaderData, sessionDTO.getCascaderData());
    }

    @Test
    public void testCascaderDataInitiallyNull() {
        assertNull(sessionDTO.getCascaderData());
    }
}
