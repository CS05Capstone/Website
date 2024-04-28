package com.example.mybaitsplusdemo.controller;


import com.example.mybaitsplusdemo.RequestBody.TipsUpdateDTO;
import com.example.mybaitsplusdemo.Service.TipsService;
import com.example.mybaitsplusdemo.entity.Tips;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin
@RestController
@RequestMapping("/tips")
public class TipsController {
    private final TipsService tipsService;

    @Autowired
    public TipsController(TipsService tipsService) {
        this.tipsService = tipsService;
    }

    @PostMapping("/create")
    public Tips createTips(@RequestBody Tips tips) {
        return tipsService.createTips(tips);
    }

    @CrossOrigin(origins = "http://localhost:7070")
    @PutMapping("/batch-update/{activityId}")
    public ResponseEntity<String> batchUpdateTips(
            @PathVariable("activityId") Long activityId,
            @RequestBody List<TipsUpdateDTO> tipsUpdateDTOS
    ) {
        tipsService.batchUpdateTips(activityId, tipsUpdateDTOS);
        return ResponseEntity.ok("Tips batch updated successfully.");
    }
}