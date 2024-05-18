package com.example.mybaitsplusdemo.entity;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

public class OrderTest {

    private Order order;

    @BeforeEach
    public void setUp() {
        order = new Order();
    }

    @Test
    public void testGetSetId() {
        int id = 1;
        order.setId(id);

        assertEquals(id, order.getId());
    }

    @Test
    public void testGetSetUid() {
        int uid = 2;
        order.setUid(uid);

        assertEquals(uid, order.getUid());
    }

    @Test
    public void testGetSetOrderTime() {
        String orderTime = "2023-09-03 14:30:00";
        order.setOrder_time(orderTime);

        assertEquals(orderTime, order.getOrder_time());
    }

    @Test
    public void testGetSetTotal() {
        Double total = 100.0;
        order.setTotal(total);

        assertEquals(total, order.getTotal());
    }

    @Test
    public void testGetSetUser() {
        Users user = new Users();
        order.setUser(user);

        assertEquals(user, order.getUser());
    }

    @Test
    public void testUserInitiallyNull() {
        assertNull(order.getUser());
    }

    @Test
    public void testToString() {
        int id = 1;
        int uid = 2;
        String orderTime = "2023-09-03 14:30:00";
        Double total = 100.0;
        Users user = new Users();
        user.setId(3);

        order.setId(id);
        order.setUid(uid);
        order.setOrder_time(orderTime);
        order.setTotal(total);
        order.setUser(user);

        String expectedToString = "Order{" +
                "id=" + id +
                ", uid=" + uid +
                ", order_time='" + orderTime + '\'' +
                ", total=" + total +
                ", user=" + user +
                '}';

        assertEquals(expectedToString, order.toString());
    }
}
