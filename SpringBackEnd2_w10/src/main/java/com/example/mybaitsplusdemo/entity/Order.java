package com.example.mybaitsplusdemo.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;

@TableName("Orders")
public class Order {
    private int id;
    private int uid;
    private String order_time;
    private Double total;
    @TableField(exist = false)
    private Users user;

    public void setUser(Users user) {
        this.user = user;
    }

    public Users getUser() {
        return user;
    }

    public int getId() {
        return id;
    }

    public int getUid() {
        return uid;
    }

    public String getOrder_time() {
        return order_time;
    }

    public Double getTotal() {
        return total;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setUid(int uid) {
        this.uid = uid;
    }

    public void setOrder_time(String order_time) {
        this.order_time = order_time;
    }

    public void setTotal(Double total) {
        this.total = total;
    }

    @Override
    public String toString() {
        return "Order{" +
                "id=" + id +
                ", uid=" + uid +
                ", order_time='" + order_time + '\'' +
                ", total=" + total +
                ", user=" + user +
                '}';
    }
}
