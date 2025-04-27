package com.example.project.backend.services.SessionSer;
import com.example.project.backend.entity.Room;
import com.example.project.backend.entity.Session;
import com.example.project.backend.repositories.RoomRepository;
import com.example.project.backend.repositories.SessionRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.Date;
import java.util.List;

@Service
public class SessionServiceImpl implements SessionService{
    @Autowired
    private SessionRepository sessionRepository;
    @Autowired
    private  RoomRepository roomRepository;

    @ResponseStatus(HttpStatus.BAD_REQUEST) // Return 400 status for client error
    public class RoomAlreadyBookedException extends RuntimeException {
        public RoomAlreadyBookedException(String message) {
            super(message);
        }
    }

    @Transactional
    public Session addSession(Session session) {
        if (!isRoomAvailable(session.getRoom(), session.getStartTime(), session.getEndTime())) {
            throw new RoomAlreadyBookedException("Room is already booked during this time.");
        }
        return sessionRepository.save(session);
    }

    @Override
    public List<Session> getAllSessions() {
        return sessionRepository.findAll();
    }

    @Override
    public Session getSessionById(Long id) {
        return sessionRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Session not found"));
    }

    @Override
    public void deleteSession(Long id) {
        sessionRepository.deleteById(id);
    }

    public boolean isRoomAvailable(Room room, Date startTime, Date endTime) {
        List<Session> overlappingSessions = sessionRepository.findOverlappingSessions(room.getId(), startTime, endTime);
        return overlappingSessions.isEmpty();
    }
}
