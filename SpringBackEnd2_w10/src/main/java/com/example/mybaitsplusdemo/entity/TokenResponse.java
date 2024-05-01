package com.example.mybaitsplusdemo.entity;

public class TokenResponse {
    private String token;

    public TokenResponse(String token) {
        this.token = token;
    }


    public String getToken(){
        return this.token;
    }
}