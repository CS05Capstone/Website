package com.example.mybaitsplusdemo.entity;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.sql.Timestamp;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class PlayingCardTest {

    private PlayingCard playingCard;

    @BeforeEach
    public void setUp() {
        playingCard = new PlayingCard();
    }

    @Test
    public void testGetSetUserId() {
        Long userId = 1L;
        playingCard.setUserId(userId);

        assertEquals(userId, playingCard.getUserId());
    }

    @Test
    public void testGetSetAttributes1() {
        int attributes1 = 42;
        playingCard.setAttributes1(attributes1);

        assertEquals(attributes1, playingCard.getAttributes1());
    }

    @Test
    public void testGetSetAttributes2() {
        int attributes2 = 99;
        playingCard.setAttributes2(attributes2);

        assertEquals(attributes2, playingCard.getAttributes2());
    }

    @Test
    public void testGetSetAvatarPath() {
        String avatarPath = "/path/to/avatar.png";
        playingCard.setAvatarPath(avatarPath);

        assertEquals(avatarPath, playingCard.getAvatarPath());
    }

    @Test
    public void testGetSetCreatedAt() {
        Timestamp createdAt = new Timestamp(System.currentTimeMillis());
        playingCard.setCreatedAt(createdAt);

        assertEquals(createdAt, playingCard.getCreatedAt());
    }

    @Test
    public void testGetSetUpdatedAt() {
        Timestamp updatedAt = new Timestamp(System.currentTimeMillis());
        playingCard.setUpdatedAt(updatedAt);

        assertEquals(updatedAt, playingCard.getUpdatedAt());
    }

    @Test
    public void testToString() {
        Long userId = 1L;
        int attributes1 = 42;
        int attributes2 = 99;
        String avatarPath = "/path/to/avatar.png";
        Timestamp createdAt = new Timestamp(System.currentTimeMillis());
        Timestamp updatedAt = new Timestamp(System.currentTimeMillis());

        playingCard.setUserId(userId);
        playingCard.setAttributes1(attributes1);
        playingCard.setAttributes2(attributes2);
        playingCard.setAvatarPath(avatarPath);
        playingCard.setCreatedAt(createdAt);
        playingCard.setUpdatedAt(updatedAt);

        String expectedToString = "PlayingCard{" +
                "id=null, " +
                "userId=1, " +
                "attributes1=42, " +
                "attributes2=99, " +
                "avatarPath='/path/to/avatar.png', " +
                "createdAt=" + createdAt.toString() + ", " +
                "updatedAt=" + updatedAt.toString() +
                "}";

        assertEquals(expectedToString, playingCard.toString());
    }
}
