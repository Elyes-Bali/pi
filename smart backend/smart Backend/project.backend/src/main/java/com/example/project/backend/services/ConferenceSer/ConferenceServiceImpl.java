package com.example.project.backend.services.ConferenceSer;

import com.example.project.backend.entity.Conference;
import com.example.project.backend.entity.ConferenceParticipation;
import com.example.project.backend.entity.Session;
import com.example.project.backend.entity.User;
import com.example.project.backend.repositories.ConferenceParticipationRepository;
import com.example.project.backend.repositories.ConferenceRepository;
import com.example.project.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ConferenceServiceImpl implements ConferenceService{
    @Autowired
    private ConferenceRepository conferenceRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ConferenceParticipationRepository conferenceParticipationRepository;

    public Conference createConference(Conference conference) {

        return conferenceRepository.save(conference);
    }

    public Conference addSessionsToConference(Long conferenceId, List<Session> sessions) {
        Conference conference = conferenceRepository.findById(conferenceId).orElseThrow(() -> new RuntimeException("Conference not found"));
        conference.setSessions(sessions);
        return conferenceRepository.save(conference);
    }

    // Get all conferences
    public List<Conference> getAllConferences() {
        return conferenceRepository.findAll();
    }

    // Get conference by ID
    public Conference getConferenceById(Long id) {
        Optional<Conference> conference = conferenceRepository.findById(id);
        return conference.orElse(null); // or throw an exception if not found
    }

    // Add participant to a conference
    public void addParticipantToConference(Long conferenceId, Long userId) throws IOException {
        // Find the conference by ID
        Optional<Conference> conferenceOptional = conferenceRepository.findById(conferenceId);
        if (conferenceOptional.isPresent()) {
            Conference conference = conferenceOptional.get();

            // Check if the user is already a participant in the conference
            boolean isAlreadyParticipant = conference.getParticipants().stream()
                    .anyMatch(participation -> participation.getUser().getId().equals(userId));

            if (isAlreadyParticipant) {
                throw new IOException("User is already a participant in this conference.");
            }


            // Fetch the user by userId
            Optional<User> userOptional = userRepository.findById(userId);
            if (userOptional.isPresent()) {
                User user = userOptional.get();

                // Check if the user has valid data
                if (user.getId() == null || user.getEmail() == null || user.getName() == null) {
                    throw new IllegalArgumentException("Invalid user data: " + user);
                }

                // Create a new ConferenceParticipation without removing the existing ones
                ConferenceParticipation participation = new ConferenceParticipation();
                participation.setConference(conference);
                participation.setUser(user);
                participation.setAccepted(false); // Set it to false initially or based on your logic

                // Save the participation to the repository
                conferenceParticipationRepository.save(participation);
            } else {
                throw new IllegalArgumentException("User not found with id: " + userId);
            }
        } else {
            throw new IllegalArgumentException("Conference not found with id: " + conferenceId);
        }
    }


    public Conference updateConference(Long conferenceId, Conference updatedConference) {
        Conference conference = conferenceRepository.findById(conferenceId)
                .orElseThrow(() -> new RuntimeException("Conference not found"));

        // Update the fields
        conference.setTopic(updatedConference.getTopic());
        conference.setLocation(updatedConference.getLocation());
        conference.setDeadline(updatedConference.getDeadline());
        conference.setSessions(updatedConference.getSessions());
        conference.setRessources(updatedConference.getRessources());
        conference.setOnlineMode(updatedConference.isOnlineMode());
        conference.setZoomLink(updatedConference.getZoomLink());
        return conferenceRepository.save(conference);
    }

    // Delete Conference
    public void deleteConference(Long conferenceId) {
        Conference conference = conferenceRepository.findById(conferenceId)
                .orElseThrow(() -> new RuntimeException("Conference not found"));

        // Optionally, remove associated participants, sessions, and resources before deleting the conference
        conferenceParticipationRepository.deleteById(conferenceId);

        conferenceRepository.delete(conference);
    }

    public List<Conference> getRecommendedConferencesForUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<String> followedCategories = user.getFollowedCategories();

        if (followedCategories == null || followedCategories.isEmpty()) {
            return new ArrayList<>(); // no recommendations if user doesn't follow anything
        }

        List<Conference> allConferences = conferenceRepository.findAll();

        return allConferences.stream()
                .filter(conf -> followedCategories.contains(conf.getCategory()))
                .collect(Collectors.toList());
    }

}
