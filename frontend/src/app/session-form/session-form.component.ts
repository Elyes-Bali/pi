import { Component, OnInit } from '@angular/core';
import { Session } from '../models/session.model';
import { Room } from '../models/room.model';
import { SessionService } from '../services/session/session.service';
import { RoomService } from '../services/room/room.service';

@Component({
  selector: 'app-session-form',
  templateUrl: './session-form.component.html',
  styleUrls: ['./session-form.component.css']
})
export class SessionFormComponent implements OnInit {
  session: Session = { topic: '', startTime: '', endTime: '', room: { roomNumber: 0, building: '', name: '', capacity: 0 } };
  rooms: Room[] = [];
  errorMessage: string = ''; // Store error message

  constructor(private sessionService: SessionService, private roomService: RoomService) {}

  ngOnInit(): void {
    this.roomService.getRooms().subscribe(rooms => this.rooms = rooms);
  }

  saveSession(): void {
    this.sessionService.createSession(this.session).subscribe({
      next: () => {
        alert('Session added successfully');
      },
      error: (err) => {
        console.error('Error response:', err); // Log the full error object
        // Check for specific error status and message
        if (err.status === 403 || err.error === 'Room is already booked during this time.') {
          this.errorMessage = 'The room is already booked for the selected time. Please choose another time or room.';
        } else {
          this.errorMessage = 'An error occurred while saving the session. Please try again later.';
        }
      }
    });
  }
  
}
