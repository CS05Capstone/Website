package com.example.mybaitsplusdemo.Service;

import com.example.mybaitsplusdemo.entity.SysLog;
import com.example.mybaitsplusdemo.entity.Users;
import com.example.mybaitsplusdemo.mapper.AdminMapper;
import com.example.mybaitsplusdemo.mapper.SysLogMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SysLogService {
    @Autowired
    private SysLogMapper sysLogMapper;


    public void addLog(SysLog sysLog) {
         sysLogMapper.addLog(sysLog);
    }

    public List<SysLog> getAllLogs() {
        return sysLogMapper.getAllLogs();
    }
}
