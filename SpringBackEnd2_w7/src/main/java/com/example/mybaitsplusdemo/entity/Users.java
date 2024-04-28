package com.example.mybaitsplusdemo.entity;

import com.baomidou.mybatisplus.annotation.TableField;

import java.util.List;

//If the table name is not 'user', we need to explicitly specify it using @TableName("user")
public class Users {
    //@TableId(type = IdType.AUTO) explicitly informs the mapper that the id is of auto-increment type
    private int id;

    @TableField("username")//If the variable name and table name are different, you can use this.
    private String username;
    @TableField("password")
    private String password;

    public void setRole(String role) {
        this.role = role;
    }

    @TableField("role")
    private String role;

    public int getAvatarID() {
        return avatarID;
    }

    public void setAvatarID(int avatarID) {
        this.avatarID = avatarID;
    }

    private int avatarID;


    //Describe all of the user's orders
    @TableField(exist = false)//Without it, it will attempt to query the user table
    private List<Order> orders;

    public List<Order> getOrders() {
        return orders;
    }
    public void setOrders(List<Order> orders) {
        this.orders = orders;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                '}';
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }
    public int getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public String getRole(){
        return this.role;
    }
}
