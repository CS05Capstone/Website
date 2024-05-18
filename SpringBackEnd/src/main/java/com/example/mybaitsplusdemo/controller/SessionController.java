package com.example.mybaitsplusdemo.controller;



import com.example.mybaitsplusdemo.RequestBody.SessionDTO;
import com.example.mybaitsplusdemo.RequestBody.SessionOutcomeDTO;
import com.example.mybaitsplusdemo.RequestBody.SessionRequestDTO;
import com.example.mybaitsplusdemo.entity.Session;
import com.example.mybaitsplusdemo.Service.SessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/sessions")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class SessionController {
    @Autowired
    private final SessionService sessionService;

    @Autowired
    public SessionController(SessionService sessionService) {
        this.sessionService = sessionService;
    }

    //create new session
    @PostMapping
    public ResponseEntity<Long> createSession(@RequestBody SessionDTO sessionDTO) {
        int sessionId = sessionService.createSession(sessionDTO);
        return new ResponseEntity<>(Long.valueOf(sessionId), HttpStatus.CREATED);
    }

    // get session by id
    @GetMapping("/{id}")
    public
    ResponseEntity<Session> getSessionById(@PathVariable Long id) {
        Session session = sessionService.getSessionById(id);
        return new ResponseEntity<>(session, HttpStatus.OK);
    }

    // get all sessions
    @GetMapping
    public ResponseEntity<List<Session>> getAllSessions() {
        List<Session> sessions = sessionService.getAllSessions();
        return new ResponseEntity<>(sessions, HttpStatus.OK);
    }

    // update sessions by id
    @PutMapping("/{id}")
    public ResponseEntity<Void> updateSession(@PathVariable Long id, @RequestBody SessionDTO sessionDTO) {
        Session session = sessionDTO.getSession();
        if (!id.equals(session.getId())) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        sessionService.updateSession(sessionDTO); // Notice this has been changed to accepting the SessionDTO

        return new ResponseEntity<>(HttpStatus.OK);
    }

    // delete session by id
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSession(@PathVariable Long id) {
        sessionService.deleteSession(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    @CrossOrigin(origins = "http://localhost:7070")
    @GetMapping("/{id}/details")
    public ResponseEntity<Map<String, Object>> getSessionDetails(@PathVariable Long id) {
        Map<String, Object> details = sessionService.getSessionDetailsById(id);
        if (details == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(details, HttpStatus.OK);
    }

    @GetMapping("/byCaseworker/{caseworkerId}")
    public ResponseEntity<List<Session>> getSessionsByCaseworkerId(@PathVariable Long caseworkerId) {
        List<Session> sessions = sessionService.getSessionsByCaseworkerId(caseworkerId);
        return new ResponseEntity<>(sessions, HttpStatus.OK);
    }

    @GetMapping("/byTeenager/{name}")
    public ResponseEntity<List<Session>> getSessionsByTeenagerName(@PathVariable String name) {
        List<Session> sessions = sessionService.getSessionsByTeenagerName(name);
        return new ResponseEntity<>(sessions, HttpStatus.OK);
    }

    @PostMapping("/mobile")
    public ResponseEntity<Integer> createSessionForMobileEnd(@RequestBody SessionRequestDTO dto) {
        int sessionId = sessionService.createSessionFromRequest(dto);
        return new ResponseEntity<>(sessionId, HttpStatus.CREATED);
    }

//    @GetMapping("/{sessionId}/learning-outcomes")
//    public ResponseEntity<List<Long>> getLearningOutcomesBySession(@PathVariable Long sessionId) {
//        List<Long> learningOutcomeIds = sessionService.getLearningOutcomeIdsBySession(sessionId);
//        return ResponseEntity.ok(learningOutcomeIds);
//    }


    @GetMapping("/{sessionId}/learning-outcomes")
    public ResponseEntity<List<SessionOutcomeDTO>> getOutcomesBySessionId(@PathVariable Long sessionId) {
        List<SessionOutcomeDTO> outcomes = sessionService.getOutcomesBySessionId(sessionId);
        return ResponseEntity.ok(outcomes);
    }
}
