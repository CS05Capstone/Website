package com.example.mybaitsplusdemo.entity;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

public class MenuTest {

    private Menu menu;

    @BeforeEach
    public void setUp() {
        menu = new Menu();
    }

    @Test
    public void testGetSetMenuId() {
        int menuId = 1;
        menu.setMenu_id(menuId);

        assertEquals(menuId, menu.getMenu_id());
    }

    @Test
    public void testGetSetLabel() {
        String label = "Test Label";
        menu.setLabel(label);

        assertEquals(label, menu.getLabel());
    }

    @Test
    public void testGetSetPid() {
        int pid = 2;
        menu.setPid(pid);

        assertEquals(pid, menu.getPid());
    }

    @Test
    public void testGetSetIcon() {
        String icon = "test-icon.png";
        menu.setIcon(icon);

        assertEquals(icon, menu.getIcon());
    }

    @Test
    public void testGetSetRoutePath() {
        String routePath = "/test-route";
        menu.setRoutePath(routePath);

        assertEquals(routePath, menu.getRoutePath());
    }

    @Test
    public void testGetSetRouteElement() {
        String routeElement = "TestRouteComponent";
        menu.setRouteElement(routeElement);

        assertEquals(routeElement, menu.getRouteElement());
    }

    @Test
    public void testGetSetChildren() {
        ArrayList<Menu> children = new ArrayList<>();
        children.add(new Menu());
        menu.setChildren(children);

        assertEquals(children, menu.getChildren());
    }

    @Test
    public void testChildrenInitiallyNull() {
        assertNull(menu.getChildren());
    }
}
