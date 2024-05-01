package com.example.mybaitsplusdemo.entity;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

public class UsersTest {

    private Users user;

    @BeforeEach
    public void setUp() {
        user = new Users();
    }

    @Test
    public void testGetSetId() {
        int id = 1;
        user.setId(id);

        assertEquals(id, user.getId());
    }

    @Test
    public void testGetSetUsername() {
        String username = "testuser";
        user.setUsername(username);

        assertEquals(username, user.getUsername());
    }

    @Test
    public void testGetSetPassword() {
        String password = "testpassword";
        user.setPassword(password);

        assertEquals(password, user.getPassword());
    }

//    @Test
//    public void testGetSetRole() {
//        String role = "user";
//        user.setRole(role);
//
//        assertEquals(role, user.getRole());
//    }

    @Test
    public void testGetSetOrders() {
        List<Order> orders = new ArrayList<>();
        Order order1 = new Order();
        Order order2 = new Order();
        orders.add(order1);
        orders.add(order2);

        user.setOrders(orders);

        assertEquals(orders, user.getOrders());
    }

    @Test
    public void testOrdersInitiallyNull() {
        assertNull(user.getOrders());
    }
}
