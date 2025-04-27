package com.example.project.backend.entity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "Feedback")
public class Feedback {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank
    private String content; // Content of the feedback

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user; // The user who provided the feedback

    @ManyToOne
    @JoinColumn(name = "conference_id", nullable = false)
    private Conference conference; // The conference for which the feedback is given

    private int rating;
}
