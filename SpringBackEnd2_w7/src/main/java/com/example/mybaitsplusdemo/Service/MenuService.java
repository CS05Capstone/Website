package com.example.mybaitsplusdemo.Service;

import com.example.mybaitsplusdemo.entity.MenuAndRoute;
import com.example.mybaitsplusdemo.entity.Route1;
import com.example.mybaitsplusdemo.mapper.MenuMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.mybaitsplusdemo.entity.Menu;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;


@Service
public class MenuService {

    @Autowired
    private MenuMapper menuMapper;

    public MenuAndRoute findAll() {
        ArrayList<Menu> list = menuMapper.findAll();
        return menu2MenuAndRoute(list);
    }

    public MenuAndRoute findByUser(String username) {
        ArrayList<Menu> list = menuMapper.findByUser(username);
        return menu2MenuAndRoute(list);
    }

    private MenuAndRoute menu2MenuAndRoute(ArrayList<Menu> list) {
        Map<Integer, Menu> all = new HashMap<>();
        ArrayList<Menu> tree = new ArrayList<>();
        ArrayList<Route1> routes = new ArrayList<>();
        System.out.println(list);
        // 1. Categorization: Top-level menus and submenus; simultaneously generate a list of routes
        for (Menu menu : list) {
            if (menu.getPid() == 0) {
                tree.add(menu);
            }
            all.put(menu.getMenu_id(), menu);
            if (menu.getRoutePath() != null) {
                routes.add(new Route1(menu.getRoutePath(), menu.getRouteElement()));
            }
        }

        // 2. Assign child menus to the 'children' list of their parent menu based on the 'pid'
        for (Menu menu : list) {
            Menu parent = all.get(menu.getPid());
            System.out.println(parent);
            if (parent != null) {
                ArrayList<Menu> children = parent.getChildren();
                if (children == null) {
                    children = new ArrayList<>();
                    parent.setChildren(children);
                }
                children.add(menu);
            }
        }
        return new MenuAndRoute(routes, tree);
    }
}
