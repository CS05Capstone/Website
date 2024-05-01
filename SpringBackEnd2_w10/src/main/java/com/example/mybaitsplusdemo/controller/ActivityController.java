package com.example.mybaitsplusdemo.controller;

import com.example.mybaitsplusdemo.entity.Activity;
import com.example.mybaitsplusdemo.Service.ActivityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api/activities")
public class ActivityController {

    @Autowired
    private ActivityService activityService;
    @CrossOrigin(origins = "http://localhost:7070")
    @PostMapping("/create")
    public ResponseEntity<String> createActivity(@RequestBody Activity activity) {
        try {
            activityService.createActivity(activity);
            return ResponseEntity.ok().body("Activity created successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error creating Activity");
        }
    }

    @CrossOrigin(origins = "http://localhost:7070")
    @PutMapping("/{id}/updateTips")
    public ResponseEntity<String> updateTips(@PathVariable Long id, @RequestBody String newTips) {
        activityService.updateTips(id, newTips);
        return ResponseEntity.ok("Tips updated successfully.");
    }

    @CrossOrigin(origins = "http://localhost:7070")
    @PutMapping("/{id}/updateIntroduction")
    public ResponseEntity<String> updateIntroduction(@PathVariable Long id, @RequestBody String newIntroduction) {
        activityService.updateIntroduction(id, newIntroduction);
        return ResponseEntity.ok("Introduction updated successfully.");
    }
}
