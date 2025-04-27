package com.example.project.backend.repositories;
import com.example.project.backend.entity.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FeedbackRepository extends JpaRepository<Feedback, Long>{
    List<Feedback> findByConferenceId(Long conferenceId);
}
