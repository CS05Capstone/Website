

package com.example.mybaitsplusdemo.Service;

import com.example.mybaitsplusdemo.entity.Activity;
import com.example.mybaitsplusdemo.mapper.ActivityMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ActivityService {

    @Autowired
    private ActivityMapper activityMapper;

    public void createActivity(Activity activity) {
        activityMapper.insert(activity);
    }


    public void updateTips(Long id, String newTips) {
        activityMapper.updateTips(id, newTips);
    }

    public void updateIntroduction(Long id, String newIntroduction) {
        activityMapper.updateIntroduction(id, newIntroduction);
    }

}