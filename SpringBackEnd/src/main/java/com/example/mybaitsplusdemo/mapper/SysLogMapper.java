package com.example.mybaitsplusdemo.mapper;

import com.example.mybaitsplusdemo.entity.SysLog;
import com.example.mybaitsplusdemo.entity.Users;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface SysLogMapper {

    @Insert("INSERT INTO sys_log (userid, content, createtime) VALUES (#{userid}, #{content}, #{createtime})")
    void addLog(SysLog sysLog);

    @Select("SELECT s.*, u.username FROM  sys_log s  left JOIN users u on s.userid = u.id")
    List<SysLog> getAllLogs();
}
