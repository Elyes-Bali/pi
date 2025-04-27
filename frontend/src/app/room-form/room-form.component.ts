import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Room } from '../models/room.model';
import { RoomService } from '../services/room/room.service';

@Component({
  selector: 'app-room-form',
  templateUrl: './room-form.component.html',
  styleUrls: ['./room-form.component.css']
})
export class RoomFormComponent {
  room: Room = { roomNumber: 0, building: '', name: '', capacity: 0 };

  constructor(private roomService: RoomService) {}

  saveRoom(form: NgForm): void {
    if (form.invalid) {
      alert('Please fill out all required fields.');
      return;
    }

    this.roomService.createRoom(this.room).subscribe(() => {
      alert('Room added successfully');
      form.resetForm(); // Reset form after submission
    });
  }
}
