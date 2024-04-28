package com.example.mybaitsplusdemo.Service;

import com.example.mybaitsplusdemo.entity.Users;
import com.example.mybaitsplusdemo.mapper.AdminMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService {
    @Autowired
    private AdminMapper adminMapper;

    public void addUser(Users user) {
        adminMapper.add(user);
    }
    public void updateUser(Users user) {
        adminMapper.updateUser(user);
    }


    public Users findByUsername(String username) {
        return adminMapper.findByUsername(username);
    }
    public Users findById(Integer id) {
        return adminMapper.findById(id);
    }

    public List<Users> findAllUsers() {
        return adminMapper.findAllUsers();
    }

    public void deleteUser(int userId) {
        adminMapper.deleteUser(userId);
    }
}
