package com.example.project.backend.services.conferenceParticipationService;

import com.example.project.backend.entity.ConferenceParticipation;
import com.example.project.backend.repositories.ConferenceParticipationRepository;
import com.example.project.backend.services.mailing.MailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ConferenceParticipationService {

    @Autowired
    private ConferenceParticipationRepository conferenceParticipationRepository;
    @Autowired
    private MailService mailService;

    // Method to get all conference participations
    public List<ConferenceParticipation> getAllConferences() {
        return conferenceParticipationRepository.findAll();
    }

    // Method to update the acceptance status of a participant
//    public ConferenceParticipation updateAcceptanceStatus(Long id, boolean accepted) {
//        Optional<ConferenceParticipation> conferenceParticipationOptional = conferenceParticipationRepository.findById(id);
//
//        if (conferenceParticipationOptional.isPresent()) {
//            ConferenceParticipation conferenceParticipation = conferenceParticipationOptional.get();
//            conferenceParticipation.setAccepted(accepted);
//            return conferenceParticipationRepository.save(conferenceParticipation); // Save updated participation
//        } else {
//            throw new RuntimeException("ConferenceParticipation not found with id: " + id); // Can improve exception handling
//        }
//    }

    // Method to update the acceptance status of a participant
    public ConferenceParticipation updateAcceptanceStatus(Long id, boolean accepted) {
        Optional<ConferenceParticipation> conferenceParticipationOptional = conferenceParticipationRepository.findById(id);

        if (conferenceParticipationOptional.isPresent()) {
            ConferenceParticipation conferenceParticipation = conferenceParticipationOptional.get();
            conferenceParticipation.setAccepted(accepted);

            // Save the updated participation
            ConferenceParticipation updatedParticipation = conferenceParticipationRepository.save(conferenceParticipation);

            // Send email only if accepted
            if (accepted) {
                String enrolledEmail = updatedParticipation.getUser().getEmail(); // Get participant email
                String participantName = updatedParticipation.getUser().getName(); // Get participant name
                String ConferenceName = updatedParticipation.getConference().getTopic();
                mailService.sendConferenceVerificationEmail(enrolledEmail, participantName,ConferenceName);
            }

            return updatedParticipation;
        } else {
            throw new RuntimeException("ConferenceParticipation not found with id: " + id);
        }
    }

}
