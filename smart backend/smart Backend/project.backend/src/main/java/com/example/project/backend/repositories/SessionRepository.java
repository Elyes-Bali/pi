package com.example.project.backend.repositories;

import com.example.project.backend.entity.Session;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface SessionRepository extends JpaRepository<Session, Long> {
    @Query("SELECT s FROM Session s WHERE s.room.id = :roomId AND "
            + "(s.startTime < :endTime AND s.endTime > :startTime)")
    List<Session> findOverlappingSessions(Long roomId, Date startTime, Date endTime);
}
