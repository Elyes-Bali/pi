package com.example.project.backend.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Data

@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Reservation")
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @JsonFormat(pattern = "dd-MM-yyyy")
    private LocalDate reservationDate;
    @JsonFormat(pattern = "HH:mm:ss")
    private LocalDateTime startTime;
    @JsonFormat(pattern = "HH:mm:ss")
    private LocalDateTime endTime;

}
