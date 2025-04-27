import { Component, OnInit } from '@angular/core';
import { Conference } from '../models/conference.model';
import { Session } from '../models/session.model';
import { Ressource } from '../models/ressouce.model';
import { ConferenceService } from '../services/conference/conference.service';
import { SessionService } from '../services/session/session.service';
import { RoomService } from '../services/room/room.service'; // Import RoomService to fetch ressources
import { RessourceService } from '../services/ressources/ressource.service';
import { UserStorageService } from '../services/storage/user-storage.service';

@Component({
  selector: 'app-conference-form',
  templateUrl: './conference-form.component.html',
  styleUrls: ['./conference-form.component.css']
})
export class ConferenceFormComponent implements OnInit {
  conference: Conference = {
    topic: '',
    location: '',
    deadline: '',
    owner: { id: 0 },
    sessions: [],
    ressources: [],
    participants: [],
    category: "",
    onlineMode: false, // Add the missing property
    zoomLink: '', // Add the missing zoomLink property
  };
  sessions: Session[] = [];
  ressources: Ressource[] = []; // Ressources will be populated from the RoomService
  userId: number ; // Assume userId is set after login

  constructor(
    private conferenceService: ConferenceService,
    private sessionService: SessionService,
    private roomService: RoomService,
    private ressourceService:RessourceService,
     private userStorageService: UserStorageService,
  ) {}

  ngOnInit(): void {
    this.userStorageService.user$.subscribe((user) => {
      if (user && user.userId) {
        this.userId = user.userId; 
    
      }
    });
    // Fetch sessions
    this.sessionService.getSessions().subscribe(sessions => {
      this.sessions = sessions;
    });

    // Fetch all resources from RoomService
    this.ressourceService.getAllResources().subscribe(ressources => {
      this.ressources = ressources; // Store fetched ressources
    });
  }

  // Create conference method
  createConference(): void {
    console.log('Submitting form');
    if (this.conference.topic && this.conference.location && this.conference.deadline) {
      console.log('All fields are filled');
      // Set the owner ID to the user ID
      this.conference.owner.id = this.userId;
  
      // Send the conference data to the backend
      this.conferenceService.createConference(this.conference, this.userId).subscribe({
        next: (response) => {
          alert('Conference created successfully');
        },
        error: (err) => {
          alert('Error creating conference');
        }
      });
    } else {
      alert('Please fill in all required fields');
    }
  }
  

  // Add session to conference
  addSessionToConference(session: Session): void {
    this.conference.sessions.push(session);
  }

  // Add resource to conference
  addRessourceToConference(ressource: Ressource): void {
    this.conference.ressources.push(ressource);
  }

  participateInConference(conferenceId: number): void {
    this.conferenceService.participateInConference(conferenceId, this.userId).subscribe({
      next: (response) => {
        alert('Participation request submitted');
      },
      error: (err) => {
        alert('Error participating in conference');
      }
    });
  }

  acceptParticipant(conferenceId: number, userId: number): void {
    this.conferenceService.acceptUserParticipation(conferenceId, userId).subscribe({
      next: (response) => {
        alert('User accepted');
      },
      error: (err) => {
        alert('Error accepting user');
      }
    });
  }

  declineParticipant(conferenceId: number, userId: number): void {
    this.conferenceService.declineUserParticipation(conferenceId, userId).subscribe({
      next: (response) => {
        alert('User declined');
      },
      error: (err) => {
        alert('Error declining user');
      }
    });
  }
}
