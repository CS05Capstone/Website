package com.example.mybaitsplusdemo.entity;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class AvatarTest {

    private Avatar avatar;

    @BeforeEach
    public void setUp() {
        avatar = new Avatar();
    }

    @Test
    public void testId() {
        int id = 123;
        avatar.setId(id);
        assertEquals(id, avatar.getId());
    }

    @Test
    public void testLArm() {
        String lArm = "leftArmValue";
        avatar.setlArm(lArm);
        assertEquals(lArm, avatar.getlArm());
    }

    @Test
    public void testRArm() {
        String rArm = "rightArmValue";
        avatar.setrArm(rArm);
        assertEquals(rArm, avatar.getrArm());
    }

    @Test
    public void testLLeg() {
        String lLeg = "leftLegValue";
        avatar.setlLeg(lLeg);
        assertEquals(lLeg, avatar.getlLeg());
    }

    @Test
    public void testRLeg() {
        String rLeg = "rightLegValue";
        avatar.setrLeg(rLeg);
        assertEquals(rLeg, avatar.getrLeg());
    }

    @Test
    public void testBody() {
        String body = "bodyValue";
        avatar.setBody(body);
        assertEquals(body, avatar.getBody());
    }

    @Test
    public void testFHead() {
        String fHead = "frontHeadValue";
        avatar.setfHead(fHead);
        assertEquals(fHead, avatar.getfHead());
    }

    @Test
    public void testBHead() {
        String bHead = "backHeadValue";
        avatar.setbHead(bHead);
        assertEquals(bHead, avatar.getbHead());
    }

    @Test
    public void testConstructor() {
        Avatar anotherAvatar = new Avatar("lArmValue", "rArmValue", "rLegValue", "lLegValue", "bodyValue", "fHeadValue", "bHeadValue");
        assertEquals("lArmValue", anotherAvatar.getlArm());
        assertEquals("rArmValue", anotherAvatar.getrArm());
        assertEquals("rLegValue", anotherAvatar.getrLeg());
        assertEquals("lLegValue", anotherAvatar.getlLeg());
        assertEquals("bodyValue", anotherAvatar.getBody());
        assertEquals("fHeadValue", anotherAvatar.getfHead());
        assertEquals("bHeadValue", anotherAvatar.getbHead());
    }
}
