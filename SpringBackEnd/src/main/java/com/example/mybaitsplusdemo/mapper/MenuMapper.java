package com.example.mybaitsplusdemo.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import com.example.mybaitsplusdemo.entity.Menu;
import java.awt.*;
import java.util.ArrayList;

@Mapper
public interface MenuMapper {

    @Select("SELECT * FROM Menu")
    ArrayList<Menu> findAll();

    @Select(" SELECT m.* FROM Menu m inner join Role_Menu rm ON m.menu_id = rm.menu_id  WHERE rm.role = (SELECT role FROM users WHERE username = #{username} )")
    ArrayList<Menu> findByUser(String username);
}
