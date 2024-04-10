package com.example.mybaitsplusdemo.entity;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class TokenResponseTest {

    @Test
    void getToken() {
        String token = "token";
        TokenResponse tr = new TokenResponse(token);
        assertEquals(token, tr.getToken());
    }
}