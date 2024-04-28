package com.example.mybaitsplusdemo.RequestBody;

import com.example.mybaitsplusdemo.entity.Attribute;

import java.util.List;

public class UserWithAttributesDTO {
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public List<Attribute> getAttributes() {
        return attributes;
    }

    public void setAttributes(List<Attribute> attributes) {
        this.attributes = attributes;
    }

    private String username;
    private List<Attribute> attributes;

}