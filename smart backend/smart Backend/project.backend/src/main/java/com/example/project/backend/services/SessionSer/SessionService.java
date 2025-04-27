package com.example.project.backend.services.SessionSer;

import com.example.project.backend.entity.Session;

import java.util.List;

public interface SessionService {
    Session addSession(Session session);
    List<Session> getAllSessions();
    Session getSessionById(Long id);
    void deleteSession(Long id);
}
