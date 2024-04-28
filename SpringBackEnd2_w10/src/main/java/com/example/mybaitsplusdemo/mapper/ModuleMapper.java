package com.example.mybaitsplusdemo.mapper;



import com.example.mybaitsplusdemo.entity.Activity;
import com.example.mybaitsplusdemo.entity.Module;
import org.apache.ibatis.annotations.*;

import java.util.List;
@Mapper
public interface ModuleMapper {

    @Select("SELECT * FROM modules WHERE id = #{id}")
    Module findById(@Param("id") Long id);


    @Select("SELECT * FROM modules")
    List<Module> findAllModules();

    @Select("SELECT * FROM activities WHERE module_id = #{moduleId}")
    List<Activity> findActivitiesByModuleId(Long moduleId);

    @Insert("INSERT INTO modules (name) VALUES (#{name})")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    void insert(Module module);

    @Update("UPDATE modules SET name = #{name} WHERE id = #{id}")
    void update(Module module);

    @Delete("DELETE FROM modules WHERE id = #{id}")
    void delete(@Param("id") Long id);
}
