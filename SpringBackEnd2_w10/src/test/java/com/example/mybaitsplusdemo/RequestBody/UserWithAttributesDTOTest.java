package com.example.mybaitsplusdemo.RequestBody;

import com.example.mybaitsplusdemo.entity.Attribute;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class UserWithAttributesDTOTest {

    private UserWithAttributesDTO userDto;

    @BeforeEach
    public void setUp() {
        userDto = new UserWithAttributesDTO();
    }

    @Test
    public void testGettersAndSetters() {
        userDto.setUsername("TestUser");

        Attribute attr1 = new Attribute("Attribute1", 10, "Image1.png");
        Attribute attr2 = new Attribute("Attribute2", 20, "Image2.png");
        List<Attribute> attributeList = Arrays.asList(attr1, attr2);

        userDto.setAttributes(attributeList);

        assertEquals("TestUser", userDto.getUsername());
        assertTrue(attributeList.equals(userDto.getAttributes()));
        assertEquals(2, userDto.getAttributes().size());
        assertEquals("Attribute1", userDto.getAttributes().get(0).getName());
        assertEquals("Attribute2", userDto.getAttributes().get(1).getName());
    }
}