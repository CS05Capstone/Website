package com.example.mybaitsplusdemo.mapper;

import com.example.mybaitsplusdemo.entity.Avatar;
import org.apache.ibatis.annotations.*;
import java.util.List;

@Mapper
public interface AvatarMapper {

    @Select("SELECT * FROM Avatar WHERE id = #{id}")
    Avatar findById(@Param("id") int id);

    @Insert("INSERT INTO Avatar (LArm, RArm, RLeg, LLeg, Body, FHead, BHead) " +
            "VALUES (#{LArm}, #{RArm}, #{RLeg}, #{LLeg}, #{Body}, #{FHead}, #{BHead})")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    void insert(Avatar avatar);

    // other query and operation methods
}