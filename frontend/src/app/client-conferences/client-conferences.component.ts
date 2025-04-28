import { Component, OnInit } from '@angular/core';
import { Conference } from '../models/conference.model';
import { ConferenceService } from '../services/conference/conference.service';
import { UserStorageService } from '../services/storage/user-storage.service';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import { UserDetails } from '../models/user.model';

@Component({
  selector: 'app-client-conferences',
  templateUrl: './client-conferences.component.html',
  styleUrls: ['./client-conferences.component.css']
})
export class ClientConferencesComponent implements OnInit {
  conferences: Conference[] = [];
  userId: number;
userDetails: UserDetails = new UserDetails();
    constructor(
      private conferenceService: ConferenceService,
      private userStorageService: UserStorageService,
      private authService: AuthService,

      private router: Router,
  
    ) {}
  
    ngOnInit(): void {
      this.userStorageService.user$.subscribe((user) => {
        console.log('Received user:', user);
        if (user && user.userId) {
          this.userId = user.userId;
        }
      });
      this.getConferences();
      this.getUserDetails(); // Fetch user details
  
    }
    getUserDetails() {
      this.authService.getuserId(this.userId).subscribe(data => {
        this.userDetails = data;
        console.log("this is the current logged in user ",this.userDetails);
      });
    }

    getConferences(): void {
      this.conferenceService.getConferences().subscribe(
        (data: Conference[]) => {
          // Wait for the userId to be set
          this.userStorageService.user$.subscribe((user) => {
            if (user && user.userId) {
              this.userId = user.userId;
    
              // Filter conferences where the participant user id matches current user id
              this.conferences = data.filter(conference =>
                conference.participants.some((participant: any) => participant.user?.id === this.userId)
              );
              
              
    
              console.log("Filtered conferences:", this.conferences);
            }
          });
        }
      );
    }
    shouldDisplayZoomLink(conference: any): boolean {
      // Check if the conference is online or if at least one participant has accepted
      return conference.onlineMode && conference.participants.some(p => p.accepted === true);
    }
    
}
