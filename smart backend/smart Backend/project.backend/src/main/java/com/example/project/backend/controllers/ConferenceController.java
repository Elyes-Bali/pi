package com.example.project.backend.controllers;

import com.example.project.backend.entity.Conference;
import com.example.project.backend.entity.Session;
import com.example.project.backend.entity.User;
import com.example.project.backend.services.ConferenceSer.ConferenceServiceImpl;
import com.example.project.backend.services.auth.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/conferences")
@CrossOrigin(origins = "http://localhost:4200/")
public class ConferenceController {
    @Autowired
    private ConferenceServiceImpl conferenceService;

    @Autowired
    private AuthService authService;

    @PostMapping("/create")
    public Conference createConference(@RequestBody Conference conference, @RequestParam Long userId) {
        User owner = authService.getUserbyId(userId);

        if (owner == null) {
            throw new RuntimeException("User not found with ID: " + userId);
        }

        // Assign the existing user as the conference owner
        conference.setOwner(owner);

        return conferenceService.createConference(conference);
    }

    @PostMapping("add/{conferenceId}/add-sessions")
    public Conference addSessionsToConference(@PathVariable Long conferenceId, @RequestBody List<Session> sessions) {
        return conferenceService.addSessionsToConference(conferenceId, sessions);
    }

    @GetMapping("/allConf")
    public List<Conference> getConferences() {
        return conferenceService.getAllConferences();
    }

    // Get conference by ID
    @GetMapping("/confbyId/{id}")
    public Conference getConferenceById(@PathVariable Long id) {
        return conferenceService.getConferenceById(id);
    }

    @PostMapping("/participant/{conferenceId}/participate")
    public void participateInConference(@PathVariable Long conferenceId, @RequestParam Long userId) throws IOException {
        // Log the incoming User object
        System.out.println("Received user: " + userId);

        if (userId != null ) {
            conferenceService.addParticipantToConference(conferenceId, userId);
        } else {
            throw new IllegalArgumentException("Invalid user data.");
        }
    }

    @PutMapping("/update/{conferenceId}")
    public Conference updateConference(@PathVariable Long conferenceId, @RequestBody Conference updatedConference) {
        return conferenceService.updateConference(conferenceId, updatedConference);
    }

    // Delete Conference
    @DeleteMapping("/delete/{conferenceId}")
    public void deleteConference(@PathVariable Long conferenceId) {
        conferenceService.deleteConference(conferenceId);
    }

    @GetMapping("/recommendations/{userId}")
    public ResponseEntity<List<Conference>> getRecommendedConferences(@PathVariable Long userId) {
        List<Conference> recommended = conferenceService.getRecommendedConferencesForUser(userId);
        return ResponseEntity.ok(recommended);
    }

}
