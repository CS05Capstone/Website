package com.example.mybaitsplusdemo.controller;


import com.example.mybaitsplusdemo.RequestBody.RegisterRequest;
import com.example.mybaitsplusdemo.Service.AdminService;
import com.example.mybaitsplusdemo.Service.SysLogService;
import com.example.mybaitsplusdemo.Service.UserService;
import com.example.mybaitsplusdemo.entity.SysLog;
import com.example.mybaitsplusdemo.entity.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.mybaitsplusdemo.entity.TokenResponse;
import com.example.mybaitsplusdemo.utils.JwtUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin
public class AdminController {

    @Autowired
    private AdminService adminService = new AdminService();

    @Autowired
    private SysLogService sysLogService = new SysLogService();

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

    @CrossOrigin(origins = "http://localhost:7070")
    @PostMapping("/addMember")
    public ResponseEntity<?> addMember(@RequestParam("currentUserId") String currentUserId,@RequestBody RegisterRequest registerRequest) {
        Users existingUser = adminService.findByUsername(registerRequest.getUsername());

        if (existingUser != null) {
            return ResponseEntity.ok("Username is already taken");
        }

        Users newUser = new Users();
        newUser.setUsername(registerRequest.getUsername());
        newUser.setPassword(registerRequest.getPassword());
        newUser.setRole(registerRequest.getRole());
        adminService.addUser(newUser);

        LocalDateTime nowDateTime = LocalDateTime.now();
        DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

        SysLog sysLog = new SysLog();
        String content = "added the role of " + registerRequest.getRole()+", this name is "+registerRequest.getUsername() +" at "+dateTimeFormatter.format(nowDateTime);
        sysLog.setContent(content);
        sysLog.setUserid(Integer.parseInt(currentUserId));
        sysLog.setCreatetime(dateTimeFormatter.format(nowDateTime));
        sysLogService.addLog(sysLog);

        return ResponseEntity.ok(newUser);
    }

    @CrossOrigin(origins = "http://localhost:7070")
    @PostMapping("/updateMember")
    public ResponseEntity<?> updateMember(@RequestParam("currentUserId") String currentUserId,@RequestBody RegisterRequest registerRequest) {
        Users existingUser = adminService.findByUsername(registerRequest.getUsername());

        if (existingUser != null) {

            Users beforUser = adminService.findById(registerRequest.getId());
            if(beforUser.getUsername().equals(registerRequest.getUsername())){
                beforUser.setPassword(registerRequest.getPassword());
                beforUser.setRole(registerRequest.getRole());
                adminService.updateUser(beforUser);

                LocalDateTime nowDateTime = LocalDateTime.now();
                DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
                SysLog sysLog = new SysLog();
                String content = "modified the user whose " + registerRequest.getId()+", at "+dateTimeFormatter.format(nowDateTime);
                sysLog.setContent(content);
                sysLog.setUserid(Integer.parseInt(currentUserId));
                sysLog.setCreatetime(dateTimeFormatter.format(nowDateTime));
                sysLogService.addLog(sysLog);
            }else{
                return ResponseEntity.ok("Username is already");
            }
        }else{
            Users newUser = new Users();
            newUser.setUsername(registerRequest.getUsername());
            newUser.setPassword(registerRequest.getPassword());
            newUser.setRole(registerRequest.getRole());
            newUser.setId(registerRequest.getId());
            adminService.updateUser(newUser);


            LocalDateTime nowDateTime = LocalDateTime.now();
            DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
            SysLog sysLog = new SysLog();
            String content = "modified the user whose " + registerRequest.getId()+", at "+dateTimeFormatter.format(nowDateTime);
            sysLog.setContent(content);
            sysLog.setUserid(Integer.parseInt(currentUserId));
            sysLog.setCreatetime(dateTimeFormatter.format(nowDateTime));
            sysLogService.addLog(sysLog);
        }


        return ResponseEntity.ok("Update sucess");
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

    @DeleteMapping("/deleteMember/{userId}/{currentUserId}")
    public ResponseEntity<String> deleteMember(@PathVariable int userId,@PathVariable int currentUserId) {
        adminService.deleteUser(userId);

        LocalDateTime nowDateTime = LocalDateTime.now();
        DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        SysLog sysLog = new SysLog();
        String content = "deletes user " + userId+", at "+dateTimeFormatter.format(nowDateTime);
        sysLog.setContent(content);
        sysLog.setUserid(currentUserId);
        sysLog.setCreatetime(dateTimeFormatter.format(nowDateTime));
        sysLogService.addLog(sysLog);
        return ResponseEntity.ok("user deleted successfully.");
    }

    @GetMapping("/getAllLogs")
    public ResponseEntity<List<SysLog>> getAllLogs() {
        List<SysLog> sysLogServiceAllLogs = sysLogService.getAllLogs();
        List<SysLog> result = new ArrayList<>();
        for(int i = 0;i<sysLogServiceAllLogs.size();i++){
            SysLog sysLog = sysLogServiceAllLogs.get(i);
            sysLog.setContent(sysLog.getUsername()+" "+sysLog.getContent());
            result.add(sysLog);
        }
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
