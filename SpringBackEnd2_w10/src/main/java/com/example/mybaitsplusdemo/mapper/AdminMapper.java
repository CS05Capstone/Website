package com.example.mybaitsplusdemo.mapper;

import com.example.mybaitsplusdemo.entity.Users;
import org.apache.ibatis.annotations.*;
import java.util.List;

@Mapper
public interface AdminMapper {
    @Select("INSERT INTO users (username, password, role, avatarID) VALUES (#{username}, #{password}, #{role},0)")
    public void add(Users user);

    @Select("SELECT * FROM users WHERE username = #{username}")
    Users findByUsername(String username);

    @Select("SELECT * FROM users WHERE id = #{id}")
    Users findById(Integer id);



    @Select("SELECT * FROM users")
    List<Users> findAllUsers();

    @Delete("DELETE FROM users WHERE id = #{userId}")
    void deleteUser(int userId);

    @Update("UPDATE users SET username = #{user.username} , role = #{user.role},password = #{user.password} WHERE id = #{user.id}")
    public void updateUser(@Param("user")Users user);

}
