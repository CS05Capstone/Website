package com.example.mybaitsplusdemo.mapper;

import com.example.mybaitsplusdemo.entity.Activity;
import com.example.mybaitsplusdemo.entity.LearningOutcome;
import org.apache.ibatis.annotations.*;

import java.util.List;

public interface ActivityMapper {

    @Select("SELECT * FROM activities WHERE id = #{id}")
    Activity findById(@Param("id") Long id);

//    @Select("SELECT * FROM activities WHERE module_id = #{moduleId}")
//    List<Activity> findByModuleId(@Param("moduleId") Long moduleId);
@Select("SELECT a.id AS activityId, a.introduction AS introduction,a.name AS activityName, a.tips, a.outcome, m.id AS moduleId, m.name AS moduleName " +
        "FROM activities a " +
        "INNER JOIN modules m ON a.module_id = m.id " +
        "WHERE a.module_id = #{moduleId}")
@Results({
        @Result(property = "id", column = "activityId"),
        @Result(property = "name", column = "activityName"),
        @Result(property = "tips", column = "tips"),
        @Result(property = "outcome", column = "outcome"),
        @Result(property = "module.id", column = "moduleId"),
        @Result(property = "module.name", column = "moduleName"),
        @Result(property = "introduction", column = "introduction")
})
    List<Activity> findByModuleId(@Param("moduleId") Long moduleId);

    @Insert("INSERT INTO activities (name, module_id_1, tips, introduction,module_id) " +
            "VALUES (#{name}, #{module_id_1}, #{tips}, #{introduction}, #{module.id})")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    void insert(Activity activity);

    @Update("UPDATE activities SET name = #{name}, module_id = #{module.id} WHERE id = #{id}")
    void update(Activity activity);

    @Delete("DELETE FROM activities WHERE id = #{id}")
    void delete(@Param("id") Long id);

    @Select("SELECT module_id FROM activities WHERE id = #{id}")
    Long findModuleIdById(@Param("id") Long id);

    @Select("SELECT * FROM learning_outcomes WHERE activity_id = #{activityId}")
    List<LearningOutcome> findOutcomesByActivityId(Long activityId);

    @Select("Select content FROM tips WHERE activity_id = #{id}")
    List<String> findTipsById(@Param("id") Long id);


    @Update("UPDATE activities SET tips = #{newTips} WHERE id = #{id}")
    void updateTips(@Param("id") Long id, @Param("newTips") String newTips);

    @Update("UPDATE activities SET introduction = #{newIntroduction} WHERE id = #{id}")
    void updateIntroduction(@Param("id") Long id, @Param("newIntroduction") String newIntroduction);
}