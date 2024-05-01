package com.example.mybaitsplusdemo.Service;

import com.example.mybaitsplusdemo.entity.Activity;
import com.example.mybaitsplusdemo.entity.LearningOutcome;
import com.example.mybaitsplusdemo.mapper.ActivityMapper;
import com.example.mybaitsplusdemo.mapper.ModuleMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.mybaitsplusdemo.entity.Module;

import java.util.List;
import java.util.Optional;

@Service
public class ModuleService {

    @Autowired
    private ModuleMapper moduleMapper;

    @Autowired
    private ActivityMapper activityMapper;

    // Get all modules
    public List<Module> findAll() {
        return moduleMapper.findAllModules();
    }

    public Module findById(Long moduleId) {
        return moduleMapper.findById(moduleId);
    }

    // Get all activities based on the module ID.
    public List<Activity> findActivitiesByModuleId(Long moduleId) {

        List<Activity> activities = activityMapper.findByModuleId(moduleId);
        Module module = moduleMapper.findById(moduleId);
        System.out.println("Module is: " + module);

        for (Activity activity : activities){
            activity.setModule(module);  //using the previously obtained module object
        }
        return activities;
    }

    public List<LearningOutcome> getOutcomesById(Long activityId) {
        return activityMapper.findOutcomesByActivityId(activityId);
    }

    public List<String> getTipsById(Long activityId){

        List<String> outcomes = activityMapper.findTipsById(activityId);

        return outcomes;
    }


    public Activity getActivityById(Long activityId) {
        return activityMapper.findById(activityId);
    }
}