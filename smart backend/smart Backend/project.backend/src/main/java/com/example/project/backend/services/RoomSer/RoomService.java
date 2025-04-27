package com.example.project.backend.services.RoomSer;

import com.example.project.backend.entity.Room;

import java.util.List;

public interface RoomService {
    Room addRoom(Room room);
    List<Room> getAllRooms();
    Room getRoomById(Long id);
    void deleteRoom(Long id);
}
