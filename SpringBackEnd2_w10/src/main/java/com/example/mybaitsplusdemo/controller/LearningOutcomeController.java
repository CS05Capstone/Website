package com.example.mybaitsplusdemo.controller;

import com.example.mybaitsplusdemo.RequestBody.LearningOutcomeDTO;
import com.example.mybaitsplusdemo.RequestBody.LearningOutcomeUpdateDTO;
import com.example.mybaitsplusdemo.RequestBody.SessionOutcomeDTO;
import com.example.mybaitsplusdemo.Service.LearningOutcomeService;
import com.example.mybaitsplusdemo.entity.LearningOutcome;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//@RestController
//@RequestMapping("/api/learning-outcomes")
//@CrossOrigin
//public class LearningOutcomeController {
//
//    @Autowired
//    private LearningOutcomeService learningOutcomeService;
//
//
//    private WebSocketNotificationController webSocketNotificationController = new WebSocketNotificationController();
//    @GetMapping("/{id}")
//    public ResponseEntity<LearningOutcome> getLearningOutcomeById(@PathVariable Long id) {
//        LearningOutcome learningOutcome = learningOutcomeService.getLearningOutcomeById(id);
//        if(learningOutcome != null) {
//            return ResponseEntity.ok(learningOutcome);
//        } else {
//            return ResponseEntity.notFound().build();
//        }
//    }
//
//    @CrossOrigin(origins = "http://localhost:7070")
//    @PutMapping("/update/{sessionId}")
//    public ResponseEntity<?> updateOutcomes(@RequestBody List<SessionOutcomeDTO> outcomes,@PathVariable Long sessionId) {
//        learningOutcomeService.updateOutcomes(outcomes);
//        webSocketNotificationController.notifySessionUpdate(sessionId);
//        return ResponseEntity.ok().body("Outcomes updated successfully.");
//    }
//
//}
@RestController
@RequestMapping("/api/learning-outcomes")
@CrossOrigin
public class LearningOutcomeController {

    @Autowired
    private LearningOutcomeService learningOutcomeService;

    @Autowired
    private WebSocketNotificationController webSocketNotificationController;

    @GetMapping("/{id}")
    public ResponseEntity<LearningOutcome> getLearningOutcomeById(@PathVariable Long id) {
        LearningOutcome learningOutcome = learningOutcomeService.getLearningOutcomeById(id);
        if(learningOutcome != null) {
            return ResponseEntity.ok(learningOutcome);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @CrossOrigin(origins = "http://localhost:7070")
    @PutMapping("/update/{sessionId}")
    public ResponseEntity<?> updateOutcomes(@RequestBody List<SessionOutcomeDTO> outcomes,@PathVariable Long sessionId) {
        learningOutcomeService.updateOutcomes(outcomes);
        webSocketNotificationController.notifySessionUpdate(sessionId);
        return ResponseEntity.ok().body("Outcomes updated successfully.");
    }


    @PostMapping
    public ResponseEntity<String> createLearningOutcome(@RequestBody LearningOutcomeDTO learningOutcomeDTO) {
        try {
            learningOutcomeService.saveLearningOutcome(learningOutcomeDTO);
            return ResponseEntity.ok().body("Outcomes save successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error creating LearningOutcome");
        }
    }
    @PutMapping
    public ResponseEntity<String> updateContents(@RequestBody List<LearningOutcome> learningOutcomes) {
        learningOutcomeService.batchUpdateContents(learningOutcomes);
        return ResponseEntity.ok("Contents updated successfully.");
    }

    @PutMapping("/batch-update/{activityId}")
    public ResponseEntity<String> batchUpdateLearningOutcomes(
            @PathVariable("activityId") Long activityId,
            @RequestBody List<LearningOutcomeUpdateDTO> updateDTOList
    ) {
        learningOutcomeService.batchUpdateLearningOutcomes(activityId, updateDTOList);
        return ResponseEntity.ok("Learning outcomes batch updated successfully.");
    }



}
