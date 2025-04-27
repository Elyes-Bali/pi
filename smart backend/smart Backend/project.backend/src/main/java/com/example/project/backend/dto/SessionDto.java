package com.example.project.backend.dto;

import lombok.Data;

import java.util.Date;
@Data
public class SessionDto {
    private Long id;
    private String topic;
    private Date startTime;
    private Date endTime;
    private Long roomId;

    public void SessionDTO(Long id, String topic, Date startTime, Date endTime, Long roomId) {
        this.id = id;
        this.topic = topic;
        this.startTime = startTime;
        this.endTime = endTime;
        this.roomId = roomId;
    }
}
