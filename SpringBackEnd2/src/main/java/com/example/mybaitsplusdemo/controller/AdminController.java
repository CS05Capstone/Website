package com.example.mybaitsplusdemo.controller;


import com.example.mybaitsplusdemo.Service.AdminService;
import com.example.mybaitsplusdemo.Service.UserService;
import com.example.mybaitsplusdemo.entity.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.mybaitsplusdemo.entity.TokenResponse;
import com.example.mybaitsplusdemo.utils.JwtUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin
public class AdminController {

    @Autowired
    private AdminService adminService = new AdminService();

    @PostMapping("/addUser")
    public ResponseEntity<?> addUser(@RequestBody Users user) {

        Users existingUser = adminService.findByUsername(user.getUsername());

        if (existingUser != null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Username is already taken");
        }

        JwtUtil jwtUtil = new JwtUtil();
        String token = jwtUtil.generateToken(user);
        adminService.addUser(user);
        return ResponseEntity.ok(new TokenResponse(token));
    }

    @GetMapping("/getAllUsers")
    public ResponseEntity<List<Users>> listAllModules() {
        List<Users> users = adminService.findAllUsers();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @DeleteMapping("/deleteUser/{userId}")
    public ResponseEntity<String> deleteUser(@PathVariable int userId) {
        adminService.deleteUser(userId);
        return ResponseEntity.ok("user deleted successfully.");
    }
}
