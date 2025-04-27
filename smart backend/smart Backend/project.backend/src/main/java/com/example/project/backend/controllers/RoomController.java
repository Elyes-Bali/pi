package com.example.project.backend.controllers;

import com.example.project.backend.dto.RoomDto;
import com.example.project.backend.entity.Room;
import com.example.project.backend.services.RoomSer.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/rooms")
@CrossOrigin(origins = "http://localhost:4200/")
public class RoomController {
    @Autowired
    private RoomService roomService;

    @PostMapping("/add")
    public ResponseEntity<Room> createRoom(@RequestBody Room room) {
        return ResponseEntity.ok(roomService.addRoom(room));
    }

    @GetMapping("/all-rooms")
    public List<RoomDto> getAllRooms() {
        List<Room> rooms = roomService.getAllRooms();
        List<RoomDto> roomDTOs = rooms.stream()
                .map(room -> new RoomDto(room.getId(), room.getRoomNumber(), room.getBuilding(), room.getName(), room.getCapacity()))
                .collect(Collectors.toList());
        return roomDTOs;
    }

    @GetMapping("/room/{id}")
    public ResponseEntity<Room> getRoomById(@PathVariable Long id) {
        return ResponseEntity.ok(roomService.getRoomById(id));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteRoom(@PathVariable Long id) {
        roomService.deleteRoom(id);
        return ResponseEntity.noContent().build();
    }
}
