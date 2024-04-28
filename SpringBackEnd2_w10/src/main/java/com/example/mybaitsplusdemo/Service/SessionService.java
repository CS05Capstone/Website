package com.example.mybaitsplusdemo.Service;

import com.example.mybaitsplusdemo.RequestBody.SessionDTO;
import com.example.mybaitsplusdemo.RequestBody.SessionOutcomeDTO;
import com.example.mybaitsplusdemo.RequestBody.SessionRequestDTO;
import com.example.mybaitsplusdemo.entity.LearningOutcome;
import com.example.mybaitsplusdemo.entity.Session;
import com.example.mybaitsplusdemo.entity.Module;
import com.example.mybaitsplusdemo.entity.Activity;
import com.example.mybaitsplusdemo.mapper.ActivityMapper;
import com.example.mybaitsplusdemo.mapper.LearningOutcomeMapper;
import com.example.mybaitsplusdemo.mapper.SessionMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class SessionService {

    private final SessionMapper sessionMapper;
    private final ActivityMapper activityMapper;
    private final LearningOutcomeMapper learningOutcomeMapper;

    @Autowired
    public SessionService(SessionMapper sessionMapper, ActivityMapper activityMapper, LearningOutcomeMapper learningOutcomeMapper) {
        this.sessionMapper = sessionMapper;
        this.activityMapper = activityMapper;
        this.learningOutcomeMapper = learningOutcomeMapper;
    }

    @Transactional
    public int createSession(SessionDTO sessionDTO) {
        Session session = sessionDTO.getSession();
        sessionMapper.insertSession(session);

        List<Activity> activities = new ArrayList<>();
        List<Module> modules = new ArrayList<>();

        for (Map<String, Object> item : sessionDTO.getCascaderData()) {
            Module module = new Module();
            Object value = item.get("value");
            if (value instanceof Integer) {
                module.setId(((Integer) value).longValue());

                module.setName((String) item.get("label"));
            } else if (value instanceof Long) {
                module.setId((Long) value);
                module.setName((String) item.get("label"));
            }
            modules.add(module);

            List<Map<String, Object>> children = (List<Map<String, Object>>) item.get("children");
            if (children != null) {
                for (Map<String, Object> child : children) {
                    Activity activity = new Activity();
                    activity.setId(((Number) child.get("value")).longValue());
                    activity.setName((String) child.get("label"));
                    activities.add(activity);
                }
            }
        }

        if (!activities.isEmpty()) {
            sessionMapper.insertActivitiesForSession(session.getId(), activities);
        }

        if (!modules.isEmpty()) {
            sessionMapper.insertModulesForSession(session.getId(), modules);
        }
        List<Long> learningOutcomeIds = sessionDTO.getLearningOutcomes();
        List<LearningOutcome> learningOutcomes = new ArrayList<>();
        for (Long id : learningOutcomeIds) {
            LearningOutcome outcome = learningOutcomeMapper.findById(id);
            learningOutcomes.add(outcome);
        }

        if (!learningOutcomes.isEmpty()) {
            sessionMapper.insertOutcomesForSession(session.getId(), learningOutcomes);
        }
        return session.getId().intValue();
    }

    @Transactional
    public void updateSession(SessionDTO sessionDTO) {
        // ...
        //
        // ...
    }

    public Session getSessionById(Long id) {
        Session session = sessionMapper.findSessionById(id);
        return session;
    }

    public List<Session> getAllSessions() {
        return sessionMapper.findAllSessions();
    }

    public void deleteSession(Long id) {
//        sessionMapper.deleteActivitiesForSession(id);
//        sessionMapper.deleteModulesForSession(id); // Assuming this mapper method exists
        sessionMapper.deleteSession(id);
    }

    public List<Session> getSessionsByCaseworkerId(Long createdByCaseworkerId) {
        return sessionMapper.findSessionsByCaseworkerId(createdByCaseworkerId);
    }

    public List<Session> getSessionsByTeenagerName(String name) {
        return sessionMapper.findSessionsByTeenagerName(name);
    }

    public Map<String, Object> getSessionDetailsById(Long id) {
        Session session = sessionMapper.findSessionById(id);
        if (session == null) {
            return null;
        }

        List<Long> activityIds = sessionMapper.findActivityIdsBySessionId(id);


        List<Activity> activities = new ArrayList<>();
        for (Long activityId : activityIds) {
            Activity activity = activityMapper.findById(activityId);
            activities.add(activity);
        }

        Map<String, Object> details = new HashMap<>();
        details.put("session", session);
        details.put("activities", activities);

        return details;
    }

    // create session for mobile
    @Transactional
    public int createSessionFromRequest(SessionRequestDTO dto) {
        Session session = new Session();
        session.setSessionName(dto.getSessionName());
        session.setSessionDate(LocalDate.parse(dto.getSessionDate()));
        session.setStartTime(LocalTime.parse(dto.getStartTime()));
        session.setEndTime(LocalTime.parse(dto.getEndTime()));
        session.setLocation(dto.getLocation());
        session.setPassword(dto.getPassword());
        session.setServiceUser(dto.getServiceUser());
        session.setCreatedByCaseworkerId(Long.parseLong(dto.getCaseWorkerId()));

        // Insert session and get generated ID
        sessionMapper.insertSession(session);

        // Process activities and modules
        List<Activity> activities = dto.getActivities();
        List<Module> modules = new ArrayList<>();

        for (Activity activity : activities) {
            modules.add(activity.getModule());
        }

        // Insert activities and modules into their respective tables
        if (!activities.isEmpty()) {
            sessionMapper.insertActivitiesForSession(session.getId(), activities);
        }

        if (!modules.isEmpty()) {
            sessionMapper.insertModulesForSession(session.getId(), modules);
        }

        // Insert learning outcomes associated with the session
        if (dto.getLearningOutcomes() != null && !dto.getLearningOutcomes().isEmpty()) {
            sessionMapper.insertOutcomesForSession(session.getId(), dto.getLearningOutcomes());
        }

        return session.getId().intValue();
    }

    public List<Long> getLearningOutcomeIdsBySession(Long sessionId) {
        return sessionMapper.findLearningOutcomeIdsBySessionId(sessionId);
    }

    public List<SessionOutcomeDTO> getOutcomesBySessionId(Long sessionId) {
        return sessionMapper.getOutcomesBySessionId(sessionId);
    }
}
