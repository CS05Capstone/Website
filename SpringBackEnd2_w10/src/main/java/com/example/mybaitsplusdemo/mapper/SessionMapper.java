package com.example.mybaitsplusdemo.mapper;

import com.example.mybaitsplusdemo.RequestBody.SessionOutcomeDTO;
import com.example.mybaitsplusdemo.entity.*;
import com.example.mybaitsplusdemo.entity.Activity;
import com.example.mybaitsplusdemo.entity.Module;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface SessionMapper {



    @Insert("INSERT INTO sessions (session_name, session_date, start_time, end_time, service_user, password, location,  created_by_caseworker_id) VALUES (#{sessionName}, #{sessionDate}, #{startTime}, #{endTime}, #{serviceUser}, #{password}, #{location},  #{createdByCaseworkerId})")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    Long insertSession(Session session);

    @Select("SELECT * FROM sessions WHERE id = #{id}")
    Session findSessionById(Long id);

    @Select("SELECT * FROM sessions")
    List<Session> findAllSessions();

    @Update("UPDATE sessions SET session_name = #{sessionName}, session_date = #{sessionDate}, start_time = #{startTime}, end_time = #{endTime}, service_user = #{serviceUser}, password = #{password}, status = #{status} WHERE id = #{id}")
    void updateSession(Session session);

    @Delete("DELETE FROM sessions WHERE id = #{id}")
    void deleteSession(Long id);

    @Select("SELECT * FROM session_modules WHERE session_id = #{id}")
    List<Module> findModulesBySessionId(Long id);

    @Select("SELECT * FROM session_activities WHERE session_id = #{id}")
    List<Activity> findActivitiesBySessionId(Long id);


    @Delete("DELETE FROM session_activities WHERE session_id = #{id}")
    void deleteActivitiesForSession(Long id);

    @Select("SELECT * FROM sessions WHERE created_by_caseworker_id = #{createdByCaseworkerId}")
    List<Session> findSessionsByCaseworkerId(Long createdByCaseworkerId);

    @Select("SELECT * FROM sessions WHERE service_user = #{name}")
    List<Session> findSessionsByTeenagerName(String name);

    @Insert("<script> INSERT INTO session_activities (session_id, activity_id, activity_name) VALUES " +
            "<foreach item='item' collection='sessionActivities' separator=','> " +
            "(#{id}, #{item.id},#{item.name} ) " +
            "</foreach> </script>")
    void insertActivitiesForSession(@Param("id") Long sessionId, @Param("sessionActivities") List<Activity> sessionActivities);

    @Insert("<script> INSERT INTO session_modules (session_id, module_id, module_name) VALUES " +
            "<foreach item='item' collection='Modules' separator=','> " +
            "(#{id}, #{item.id}, #{item.name}) " +
            "</foreach> </script>")
    void insertModulesForSession(@Param("id") Long sessionId, @Param("Modules") List<Module> sessionModules);
    @Insert("<script> INSERT INTO session_learning_outcomes (session_id, learning_outcome_id, content) VALUES " +
            "<foreach item='item' collection='outcomes' separator=','> " +
            "(#{id}, #{item.id},#{item.content}  ) " +
            "</foreach> </script>")
    void insertOutcomesForSession(@Param("id") Long sessionId, @Param("outcomes") List<LearningOutcome> learningOutcomes);
    @Delete("DELETE FROM session_modules WHERE session_id = #{id}")
    void deleteModulesForSession(Long id);

    @Select("SELECT activity_id FROM session_activities WHERE session_id = #{id}")
    List<Long> findActivityIdsBySessionId(Long id);

    @Select("SELECT learning_outcome_id FROM session_learning_outcomes WHERE session_id = #{sessionId}")
    List<Long> findLearningOutcomeIdsBySessionId(Long sessionId);


    @Select("SELECT id, content FROM session_learning_outcomes WHERE session_id = #{sessionId}")
    List<SessionOutcomeDTO> getOutcomesBySessionId(@Param("sessionId") Long sessionId);
}
