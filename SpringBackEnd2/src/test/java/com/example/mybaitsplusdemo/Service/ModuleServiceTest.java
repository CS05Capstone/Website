package com.example.mybaitsplusdemo.Service;

import com.example.mybaitsplusdemo.entity.Activity;
import com.example.mybaitsplusdemo.entity.LearningOutcome;
import com.example.mybaitsplusdemo.entity.Module;
import com.example.mybaitsplusdemo.mapper.ActivityMapper;
import com.example.mybaitsplusdemo.mapper.ModuleMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ModuleServiceTest {

    @InjectMocks
    private ModuleService moduleService;

    @Mock
    private ModuleMapper moduleMapper;

    @Mock
    private ActivityMapper activityMapper;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void findAllModules() {
        Module module = new Module();
        when(moduleMapper.findAllModules()).thenReturn(Collections.singletonList(module));

        List<Module> result = moduleService.findAll();

        assertEquals(1, result.size());
        verify(moduleMapper, times(1)).findAllModules();
    }

    @Test
    void findByIdTest() {
        Module module = new Module();
        Long moduleId = 1L;
        when(moduleMapper.findById(moduleId)).thenReturn(module);

        Module result = moduleService.findById(moduleId);

        assertEquals(module, result);
        verify(moduleMapper, times(1)).findById(moduleId);
    }

    @Test
    void findActivitiesByModuleIdTest() {
        Activity activity = new Activity();
        Long moduleId = 1L;
        when(activityMapper.findByModuleId(moduleId)).thenReturn(Collections.singletonList(activity));
        when(moduleMapper.findById(moduleId)).thenReturn(new Module());

        List<Activity> activities = moduleService.findActivitiesByModuleId(moduleId);

        assertFalse(activities.isEmpty());
        assertEquals(1, activities.size());
        verify(activityMapper, times(1)).findByModuleId(moduleId);
        verify(moduleMapper, times(1)).findById(moduleId);
    }

    @Test
    void getOutcomesByIdTest() {
        Long activityId = 1L;
        when(activityMapper.findOutcomesByActivityId(activityId)).thenReturn(Collections.emptyList());

        List<LearningOutcome> outcomes = moduleService.getOutcomesById(activityId);

        assertTrue(outcomes.isEmpty());
        verify(activityMapper, times(1)).findOutcomesByActivityId(activityId);
    }

    @Test
    void getTipsByIdTest() {
        Long activityId = 1L;
        when(activityMapper.findTipsById(activityId)).thenReturn(Collections.singletonList("Test Tip"));

        List<String> tips = moduleService.getTipsById(activityId);

        assertFalse(tips.isEmpty());
        assertEquals("Test Tip", tips.get(0));
        verify(activityMapper, times(1)).findTipsById(activityId);
    }

    @Test
    void getActivityByIdTest() {
        Activity activity = new Activity();
        Long activityId = 1L;
        when(activityMapper.findById(activityId)).thenReturn(activity);

        Activity result = moduleService.getActivityById(activityId);

        assertEquals(activity, result);
        verify(activityMapper, times(1)).findById(activityId);
    }
}
