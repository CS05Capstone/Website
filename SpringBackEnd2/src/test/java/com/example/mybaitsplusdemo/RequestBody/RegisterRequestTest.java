package com.example.mybaitsplusdemo.RequestBody;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class RegisterRequestTest {

    private RegisterRequest registerRequest;

    @BeforeEach
    public void setUp() {
        registerRequest = new RegisterRequest();
    }

    @Test
    public void testGetSetUsername() {
        String username = "testuser";
        registerRequest.setUsername(username);

        assertEquals(username, registerRequest.getUsername());
    }

    @Test
    public void testGetSetPassword() {
        String password = "testpassword";
        registerRequest.setPassword(password);

        assertEquals(password, registerRequest.getPassword());
    }

    @Test
    public void testGetSetEmail() {
        String email = "test@example.com";
        registerRequest.setEmail(email);

        assertEquals(email, registerRequest.getEmail());
    }

    @Test
    public void testGetSetFullName() {
        String fullName = "John Doe";
        registerRequest.setFullName(fullName);

        assertEquals(fullName, registerRequest.getFullName());
    }

    @Test
    public void testGetSetPhoneNumber() {
        String phoneNumber = "123456789";
        registerRequest.setPhoneNumber(phoneNumber);

        assertEquals(phoneNumber, registerRequest.getPhoneNumber());
    }

    @Test
    public void testFullConstructor() {
        String username = "testuser";
        String password = "testpassword";
        String email = "test@example.com";
        String fullName = "John Doe";
        String phoneNumber = "123456789";

        RegisterRequest registerRequest = new RegisterRequest(username, password, email, fullName, phoneNumber);

        assertEquals(username, registerRequest.getUsername());
        assertEquals(password, registerRequest.getPassword());
        assertEquals(email, registerRequest.getEmail());
        assertEquals(fullName, registerRequest.getFullName());
        assertEquals(phoneNumber, registerRequest.getPhoneNumber());
    }
}
