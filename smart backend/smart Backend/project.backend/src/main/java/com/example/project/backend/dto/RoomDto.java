package com.example.project.backend.dto;

import lombok.Data;

@Data
public class RoomDto {
    private Long id;
    private int roomNumber;
    private String building;
    private String name;
    private int capacity;


    public RoomDto(Long id, int roomNumber, String building, String name, int capacity) {
        this.id = id;
        this.roomNumber = roomNumber;
        this.building = building;
        this.name = name;
        this.capacity = capacity;
    }
}
