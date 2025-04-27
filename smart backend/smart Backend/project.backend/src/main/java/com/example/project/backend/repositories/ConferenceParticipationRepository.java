package com.example.project.backend.repositories;

import com.example.project.backend.entity.Conference;
import com.example.project.backend.entity.ConferenceParticipation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ConferenceParticipationRepository extends JpaRepository<ConferenceParticipation, Long> {
    List<ConferenceParticipation> findByConference(Conference conference);

    List<ConferenceParticipation> findByUserId(Long userId);

    // Custom method to find all conferences for a particular conference
    List<ConferenceParticipation> findByConferenceId(Long conferenceId);
}
