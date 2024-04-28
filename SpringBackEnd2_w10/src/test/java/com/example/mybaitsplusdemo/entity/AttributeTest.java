package com.example.mybaitsplusdemo.entity;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;

class AttributeTest {

    private Attribute attribute;

    @BeforeEach
    public void setUp() {
        attribute = new Attribute();
    }

    @Test
    public void testDefaultConstructor() {
        assertEquals(0, attribute.getId());
        assertEquals(null, attribute.getName());
        assertEquals(0, attribute.getValue());
        assertEquals(null, attribute.getImage());
    }

    @Test
    public void testParametrizedConstructor() {
        Attribute paramAttribute = new Attribute("TestName", 123, "TestImage.png");
        assertEquals("TestName", paramAttribute.getName());
        assertEquals(123, paramAttribute.getValue());
        assertEquals("TestImage.png", paramAttribute.getImage());
    }

    @Test
    public void testGettersAndSetters() {
        attribute.setId(42);
        attribute.setName("AttributeName");
        attribute.setValue(100);
        attribute.setImage("Image.png");

        assertEquals(42, attribute.getId());
        assertEquals("AttributeName", attribute.getName());
        assertEquals(100, attribute.getValue());
        assertEquals("Image.png", attribute.getImage());
    }

    @Test
    public void testToString() {
        attribute.setId(10);
        attribute.setName("Test");
        attribute.setValue(5);
        attribute.setImage("test.png");

        String expected = "Attribute{id=10, name='Test', value=5, image='test.png'}";
        assertEquals(expected, attribute.toString());
    }

}