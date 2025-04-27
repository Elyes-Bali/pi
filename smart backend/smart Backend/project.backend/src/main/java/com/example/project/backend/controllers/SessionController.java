package com.example.project.backend.controllers;

import com.example.project.backend.entity.Session;
import com.example.project.backend.services.SessionSer.SessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/sessions")
@CrossOrigin(origins = "http://localhost:4200/")
public class SessionController {
    @Autowired
    private SessionService sessionService;

    @PostMapping("/add")
    public ResponseEntity<Map<String, String>> createSession(@RequestBody Session session) {
        try {
            sessionService.addSession(session);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Session created successfully");
            return ResponseEntity.ok(response);
        } catch (IllegalStateException e) {
            throw new IllegalStateException("Room is already booked during this time");
        }
    }

    @GetMapping("/all-Session")
    public List<Session> getAllSessions() {
        return sessionService.getAllSessions();
    }

    @GetMapping("/session/{id}")
    public ResponseEntity<Session> getSessionById(@PathVariable Long id) {
        return ResponseEntity.ok(sessionService.getSessionById(id));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteSession(@PathVariable Long id) {
        sessionService.deleteSession(id);
        return ResponseEntity.noContent().build();
    }
}
