package com.example.mybaitsplusdemo.entity;

import com.baomidou.mybatisplus.annotation.TableField;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Date;

public class SysLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @TableField("content")
    private String content;

    @TableField("userid")
    private int userid;

    @TableField("createtime")
    private String createtime;

    @TableField("username")
    private String username;

    public SysLog() {
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public SysLog(int id, String content, int userid, String createtime, String username) {
        this.id = id;
        this.content = content;
        this.userid = userid;
        this.createtime = createtime;
        this.username = username;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public int getUserid() {
        return userid;
    }

    public void setUserid(int userid) {
        this.userid = userid;
    }

    public String getCreatetime() {
        return createtime;
    }

    public void setCreatetime(String createtime) {
        this.createtime = createtime;
    }
}
