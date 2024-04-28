package com.example.mybaitsplusdemo.controller;

import com.example.mybaitsplusdemo.Service.ModuleService;
import com.example.mybaitsplusdemo.entity.Activity;
import com.example.mybaitsplusdemo.entity.LearningOutcome;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.mybaitsplusdemo.entity.Module;
import java.util.List;

@RestController
@RequestMapping("/api/modules")
@CrossOrigin
public class ModuleController {

    @Autowired
    private ModuleService moduleService;

    @GetMapping
    public ResponseEntity<List<Module>> listAllModules() {
        List<Module> modules = moduleService.findAll();
        return new ResponseEntity<>(modules, HttpStatus.OK);
    }
    @GetMapping("/{moduleId}")
    public ResponseEntity<Module> getModuleById(@PathVariable Long moduleId) {
        Module module = moduleService.findById(moduleId);
        if (module != null) {
            return new ResponseEntity<>(module, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{moduleId}/activities")
    public ResponseEntity<List<Activity>> listActivitiesOfModule(@PathVariable Long moduleId) {
        List<Activity> activities = moduleService.findActivitiesByModuleId(moduleId);
        if (activities != null && !activities.isEmpty()) {
            return new ResponseEntity<>(activities, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    @GetMapping("/{moduleId}/activities/{activityID}")
    public ResponseEntity<Activity> getActivityByModuleAndActivityId(@PathVariable Long moduleId, @PathVariable Long activityID) {
        Activity activity = null;
        List<Activity> activities = moduleService.findActivitiesByModuleId(moduleId);
        for (Activity activity1: activities) {
            if(activity1.getId() == activityID){
                activity = activity1;
            }
        }
        if(activity != null) {
            return ResponseEntity.ok(activity);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @CrossOrigin(origins = "http://localhost:7070")
    @GetMapping("/outcome/{activityID}")
    public ResponseEntity<List<LearningOutcome>> getOutcomesById(@PathVariable Long activityID) {
        List<LearningOutcome> outcomes = moduleService.getOutcomesById(activityID);

        if(outcomes != null) {
            return ResponseEntity.ok(outcomes);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @CrossOrigin(origins = "http://localhost:7070")
    @GetMapping("/tips/{activityID}")
    public ResponseEntity<List<String>> getTipsById(@PathVariable Long activityID) {
        List<String> outcomes = moduleService.getTipsById(activityID);

        if(outcomes != null) {
            return ResponseEntity.ok(outcomes);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}