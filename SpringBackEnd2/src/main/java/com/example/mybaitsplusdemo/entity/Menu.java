package com.example.mybaitsplusdemo.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import java.util.ArrayList;
import java.util.List;
//@JsonIdentityInfo(
//        generator = ObjectIdGenerators.PropertyGenerator.class,
//        property = "menu_id"
//)

public class Menu {

    private int menuID;          // primary key
    private String label;         // Text displayed in the menu item
    private int pid;              // ID of the parent menu item, which is 0 if there is no parent menu
    private String icon;          // menu icon
    private String routePath;     // route path
    private String routeElement;  // route component name





    // Submenu List
    private ArrayList<Menu> children;


    public int getMenu_id() {
        return menuID;
    }

    public void setMenu_id(int menu_id) {
        this.menuID = menu_id;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public int getPid() {
        return pid;
    }

    public void setPid(int pid) {
        this.pid = pid;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public String getRoutePath() {
        return routePath;
    }

    public void setRoutePath(String routePath) {
        this.routePath = routePath;
    }

    public String getRouteElement() {
        return routeElement;
    }

    public void setRouteElement(String routeElement) {
        this.routeElement = routeElement;
    }

    public ArrayList<Menu> getChildren() {
        return children;
    }

    public void setChildren(ArrayList<Menu> children) {
        this.children = children;
    }


}

