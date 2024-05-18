package com.example.mybaitsplusdemo.RequestBody;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class LoginRequestTest {

    private LoginRequest loginRequest;

    @BeforeEach
    public void setUp() {
        loginRequest = new LoginRequest();
    }

    @Test
    public void testGetSetUsername() {
        String username = "testuser";
        loginRequest.setUsername(username);

        assertEquals(username, loginRequest.getUsername());
    }

    @Test
    public void testGetSetPassword() {
        String password = "testpassword";
        loginRequest.setPassword(password);

        assertEquals(password, loginRequest.getPassword());
    }
}
