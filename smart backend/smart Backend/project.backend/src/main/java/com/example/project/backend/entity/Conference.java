package com.example.project.backend.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table( name = "Conference")
public class Conference implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank
    private String topic;
    @NotBlank
    private String location;

    @JsonFormat(pattern = "dd-MM-yyyy")
    private Date deadline;


    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "owner_id", nullable = false)
    private User owner; // The owner of the conference

    @ManyToMany
    @JoinTable(
            name = "conference_sessions",
            joinColumns = @JoinColumn(name = "conference_id"),
            inverseJoinColumns = @JoinColumn(name = "session_id")
    )
    private List<Session> sessions; // Sessions associated with the conference

    @ManyToMany
    @JoinTable(
            name = "conference_ressources",
            joinColumns = @JoinColumn(name = "conference_id"),
            inverseJoinColumns = @JoinColumn(name = "ressource_id")
    )
    private List<Ressource> ressources; // Ressources for the conference

    @OneToMany(mappedBy = "conference", cascade = CascadeType.ALL)
    private List<ConferenceParticipation> participants; // Users participating in the conference

    public List<ConferenceParticipation> getParticipants() {
        return participants;
    }

    private String category;

    private boolean onlineMode = false; // Default to false
    private String zoomLink; // Will contain the zoom link if onlineMode is true

}
