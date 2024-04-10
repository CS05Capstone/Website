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

    public Users findByUsername(String username) {
        return adminMapper.findByUsername(username);
    }

    public List<Users> findAllUsers() {
        return adminMapper.findAllUsers();
    }

    public void deleteUser(int userId) {
        adminMapper.deleteUser(userId);
    }
}
