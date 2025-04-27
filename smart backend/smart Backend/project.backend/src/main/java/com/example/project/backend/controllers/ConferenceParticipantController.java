package com.example.project.backend.controllers;

import com.example.project.backend.entity.ConferenceParticipation;
import com.example.project.backend.services.conferenceParticipationService.ConferenceParticipationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/conference-participation")
@CrossOrigin(origins = "http://localhost:4200/")
public class ConferenceParticipantController {
    private final ConferenceParticipationService conferenceParticipationService;

    private final SimpMessagingTemplate messagingTemplate;


    // Constructor Injection
    public ConferenceParticipantController(ConferenceParticipationService conferenceParticipationService, SimpMessagingTemplate messagingTemplate) {
        this.conferenceParticipationService = conferenceParticipationService;
        this.messagingTemplate = messagingTemplate;
    }

    // Endpoint to get all conference participations
    @GetMapping("/all")
    public List<ConferenceParticipation> getAllConferences() {
        return conferenceParticipationService.getAllConferences();
    }

    // Endpoint to update acceptance status
    @PutMapping("/update/{id}/acceptance")
    public ResponseEntity<Map<String, Object>> updateAcceptanceStatus(@PathVariable Long id, @RequestParam boolean accepted) {
        try {
            ConferenceParticipation updatedParticipation = conferenceParticipationService.updateAcceptanceStatus(id, accepted);

            // Prepare response JSON object
            Map<String, Object> response = new HashMap<>();
            response.put("status", "success");
            response.put("message", accepted ? "Participation accepted" : "Participation rejected");
            response.put("updatedAcceptance", accepted);

            // Notification message
            Map<String, String> notification = new HashMap<>();
            notification.put("message", accepted ? "You have been accepted to the conference!" : "Your participation was rejected.");
            notification.put("conferenceId", updatedParticipation.getConferenceId().toString());
            notification.put("participantId", updatedParticipation.getUser().getId().toString());

            // Send real-time notification to the participant
            Long userId = updatedParticipation.getUser().getId();
            messagingTemplate.convertAndSend("/topic/user-" + userId, notification);

            System.out.println("Sending notification to: /topic/user-" + userId);
            System.out.println("Message: " + notification);

            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // Return 404 if not found
        }
    }

}
