package com.example.project.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "ConferenceParticipation")
public class ConferenceParticipation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "conference_id", nullable = false, insertable = false, updatable = false)
    private Conference conference; // The conference the user is participating in

    private boolean accepted; // The owner can accept or decline the user

    @Column(name = "conference_id", nullable = false)
    private Long conferenceId;

    public void setConference(Conference conference) {
        this.conference = conference;
        this.conferenceId = (conference != null) ? conference.getId() : null;
    }
}
