import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Conference } from 'src/app/models/conference.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ConferenceService } from 'src/app/services/conference/conference.service';
import { UserStorageService } from 'src/app/services/storage/user-storage.service';

@Component({
  selector: 'app-my-conferences',
  templateUrl: './my-conferences.component.html',
  styleUrls: ['./my-conferences.component.css']
})
export class MyConferencesComponent implements OnInit {
  conferences: Conference[] = [];
  userId: number;
  myConferences: Conference[] = [];

  constructor(
    private conferenceService: ConferenceService,
    private userStorageService: UserStorageService,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.userStorageService.user$.subscribe((user) => {
      if (user && user.userId) {
        this.userId = user.userId;
        console.log('Received user Id:', this.userId);
      }
    });
    this.getConferences();
  }

  getConferences(): void {
    this.conferenceService.getConferences().subscribe(
      (data: Conference[]) => {
        this.conferences = data;
        console.log('All Conferences:', this.conferences);
        this.filterUserConferences();
      },
      error => {
        console.error('Error fetching conferences:', error);
      }
    );
  }

  filterUserConferences(): void {
    this.myConferences = this.conferences.filter(conference => conference.owner.id === this.userId);
  }

  // Method to update conference
  updateConference(conferenceId: number): void {
    const updatedConference = { ...this.myConferences.find(conf => conf.id === conferenceId) };
    // Here, you can modify the updatedConference object with the new details
    this.conferenceService.updateConference(conferenceId, updatedConference).subscribe(
      (updatedConf) => {
        console.log('Conference updated:', updatedConf);
        this.getConferences(); // Refresh the list
      },
      (error) => {
        console.error('Error updating conference:', error);
      }
    );
  }

  // Method to delete conference
  deleteConference(conferenceId: number): void {
    this.conferenceService.deleteConference(conferenceId).subscribe(
      () => {
        console.log('Conference deleted');
        this.getConferences(); // Refresh the list
      },
      (error) => {
        console.error('Error deleting conference:', error);
      }
    );
  }

  navigateToUpdate(conferenceId: number): void {
  this.router.navigate([`/update-conference/${conferenceId}`]);
}
}
