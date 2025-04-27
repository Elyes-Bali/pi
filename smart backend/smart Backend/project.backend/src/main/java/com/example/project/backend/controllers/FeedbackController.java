package com.example.project.backend.controllers;
import com.example.project.backend.entity.Feedback;
import com.example.project.backend.services.feedBackSer.FeedbackServiceImpl;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@AllArgsConstructor
@RequestMapping("/feedback")
@CrossOrigin(origins = "http://localhost:4200/")
public class FeedbackController {
    @Autowired
    private FeedbackServiceImpl feedbackService;

    // Add feedback for a conference
    @PostMapping("/add")
    public Feedback addFeedback(@RequestParam Long userId, @RequestParam Long conferenceId, @RequestBody Feedback feedback) {
        return feedbackService.addFeedback(userId, conferenceId, feedback);
    }

    // Get all feedback for a conference
    @GetMapping("/conference/{conferenceId}")
    public List<Feedback> getFeedbackForConference(@PathVariable Long conferenceId) {
        return feedbackService.getFeedbackForConference(conferenceId);
    }
}
