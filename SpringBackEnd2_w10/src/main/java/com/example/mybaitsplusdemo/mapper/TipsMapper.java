
package com.example.mybaitsplusdemo.mapper;

import com.example.mybaitsplusdemo.entity.Tips;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface TipsMapper {

    @Insert("INSERT INTO tips (activity_id, content) VALUES (#{activityId}, #{content})")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    void insert(Tips tips);


    @Update("UPDATE tips SET content = #{content} WHERE id = #{id} AND activity_id = #{activityId}")
    void updateContentByIdAndActivityId(@Param("id") Long id, @Param("activityId") Long activityId, @Param("content") String content);

    // Retrieve associated hint IDs based on the activity ID
    @Select("SELECT id FROM tips WHERE activity_id = #{activityId}")
    List<Long> findTipIdsByActivityId(@Param("activityId") Long activityId);
}