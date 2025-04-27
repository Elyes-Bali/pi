package com.example.project.backend.services.feedBackSer;

import com.example.project.backend.entity.Conference;
import com.example.project.backend.entity.Feedback;
import com.example.project.backend.entity.User;
import com.example.project.backend.repositories.ConferenceRepository;
import com.example.project.backend.repositories.FeedbackRepository;
import com.example.project.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FeedbackServiceImpl {

    @Autowired
    private FeedbackRepository feedbackRepository;

    @Autowired
    private ConferenceRepository conferenceRepository;

    @Autowired
    private UserRepository userRepository;

    // Add feedback for a conference
    public Feedback addFeedback(Long userId, Long conferenceId, Feedback feedback) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Conference conference = conferenceRepository.findById(conferenceId).orElseThrow(() -> new RuntimeException("Conference not found"));

        feedback.setUser(user);
        feedback.setConference(conference);

        return feedbackRepository.save(feedback);
    }

    // Get all feedback for a conference
    public List<Feedback> getFeedbackForConference(Long conferenceId) {
        return feedbackRepository.findByConferenceId(conferenceId);
    }
}
