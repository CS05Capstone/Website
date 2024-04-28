package com.example.mybaitsplusdemo.entity;

import javax.persistence.*;

@Entity
@Table(name = "Avatar")
public class Avatar {
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "LArm")
    private String lArm;

    @Column(name = "RArm")
    private String rArm;

    @Column(name = "RLeg")
    private String rLeg;

    @Column(name = "LLeg")
    private String lLeg;

    @Column(name = "Body")
    private String body;

    @Column(name = "FHead")
    private String fHead;

    @Column(name = "BHead")
    private String bHead;

    // Constructor, getter, and setter methods
    public Avatar() {
    }

    public Avatar(String lArm, String rArm, String rLeg, String lLeg, String body, String fHead, String bHead) {
        this.lArm = lArm;
        this.rArm = rArm;
        this.rLeg = rLeg;
        this.lLeg = lLeg;
        this.body = body;
        this.fHead = fHead;
        this.bHead = bHead;
    }



    public String getlArm() {
        return lArm;
    }

    public void setlArm(String lArm) {
        this.lArm = lArm;
    }

    public String getrArm() {
        return rArm;
    }

    public void setrArm(String rArm) {
        this.rArm = rArm;
    }

    public String getrLeg() {
        return rLeg;
    }

    public void setrLeg(String rLeg) {
        this.rLeg = rLeg;
    }

    public String getlLeg() {
        return lLeg;
    }

    public void setlLeg(String lLeg) {
        this.lLeg = lLeg;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public String getfHead() {
        return fHead;
    }

    public void setfHead(String fHead) {
        this.fHead = fHead;
    }

    public String getbHead() {
        return bHead;
    }

    public void setbHead(String bHead) {
        this.bHead = bHead;
    }
}
