package com.example.mybaitsplusdemo.entity;

import java.io.Serializable;
import java.sql.Timestamp;

public class PlayingCard implements Serializable {

    private Long id;
    private Long userId;

    private int attributes1;
    private int attributes2;
    private String avatarPath;
    private Timestamp createdAt;
    private Timestamp updatedAt;


    public Long getUserId() {
        return userId;
    }

    public void setAvatarPath(String avatarPath) {
        this.avatarPath = avatarPath;
    }

    public String getAvatarPath() {return avatarPath;}
    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public int getAttributes1() {
        return attributes1;
    }

    public void setAttributes1(int attributes1) {
        this.attributes1 = attributes1;
    }

    public int getAttributes2() {
        return attributes2;
    }

    public void setAttributes2(int attributes2) {
        this.attributes2 = attributes2;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    public Timestamp getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Timestamp updatedAt) {
        this.updatedAt = updatedAt;
    }

    @Override
    public String toString() {
        return "PlayingCard{" +
                "id=" + id +
                ", userId=" + userId +
                ", attributes1=" + attributes1 +
                ", attributes2=" + attributes2 +
                ", avatarPath='" + avatarPath + '\'' +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                '}';
    }

}