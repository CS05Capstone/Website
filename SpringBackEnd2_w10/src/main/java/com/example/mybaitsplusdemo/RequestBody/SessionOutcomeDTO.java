package com.example.mybaitsplusdemo.RequestBody;

public class SessionOutcomeDTO {
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    private Long id;
    private String content;


}