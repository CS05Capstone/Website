package com.example.mybaitsplusdemo.mapper;

import com.example.mybaitsplusdemo.RequestBody.LearningOutcomeDTO;
import com.example.mybaitsplusdemo.RequestBody.SessionOutcomeDTO;
import com.example.mybaitsplusdemo.entity.LearningOutcome;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface LearningOutcomeMapper {

    @Select("SELECT * FROM learning_outcomes WHERE id = #{id}")
    LearningOutcome findById(Long id);

    @Update("UPDATE session_learning_outcomes SET content = #{outcome.content} WHERE id = #{outcome.id}")
    void updateOutcome(@Param("outcome") SessionOutcomeDTO outcome);


    @Insert("INSERT INTO learning_outcomes (content, activity_id) VALUES (#{content}, #{activityId})")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    void insertLearningOutcome(LearningOutcome outcome);

    @Update("UPDATE learning_outcomes SET content = #{newContent} WHERE id = #{id}")
    void updateContent(@Param("id") Long id, @Param("Content") String newContent);



    @Update("UPDATE learning_outcomes SET content = #{content} WHERE id = #{id} AND activity_id = #{activityId}")
    void updateContentByIdAndActivityId(@Param("id") Long id, @Param("activityId") Long activityId, @Param("content") String content);

    @Select("SELECT id FROM learning_outcomes WHERE activity_id = #{activityId}")
    List<Long> findOutcomeIdsByActivityId(@Param("activityId") Long activityId);

}