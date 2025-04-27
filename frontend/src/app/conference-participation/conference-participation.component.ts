import { Component, OnInit } from '@angular/core';
import { ConferenceParticipantionService } from '../services/participants/conference-participantion.service';
import { ConferenceService } from '../services/conference/conference.service';
import { UserStorageService } from '../services/storage/user-storage.service';

@Component({
  selector: 'app-conference-participation',
  templateUrl: './conference-participation.component.html',
  styleUrls: ['./conference-participation.component.css']
})
export class ConferenceParticipationComponent implements OnInit {
  userId: number | null = null;
  conferenceParticipations: any[] = [];
  isLoading = false;
  conferences: any[] = []; 
  constructor(private conferenceParticipationService: ConferenceParticipantionService,private conferenceService: ConferenceService, private userStorageService: UserStorageService) { }

  ngOnInit(): void {
    this.userStorageService.user$.subscribe((user) => {
      if (user && user.userId) {
        this.userId = user.userId; // Reactively update userId
        console.log('currents user Id:',this.userId)
        this.loadAllConferences();
      }
    });


  }

  // Load all conferences
  loadAllConferences() {
    this.isLoading = true;
  
    // Fetch all conferences first
    this.conferenceService.getConferences().subscribe(
      (conferenceData) => {
        this.conferences = conferenceData;
        console.log('All Conferences:', this.conferences);
  
        // **Check if conferences have owners and their IDs are set properly**
        const ownedConferences = this.conferences.filter(conf => {
          if (conf.owner && conf.owner.id === this.userId) {
            console.log('Conference owned by user:', conf); // Debugging owned conferences
            return true;
          } else {
            console.log('Conference not owned by user:', conf); // Debugging non-owned conferences
            return false;
          }
        });
  
        console.log('Owned Conferences:', ownedConferences); // Debugging owned conferences
  
        // If no owned conferences, stop further processing
        if (ownedConferences.length === 0) {
          console.log('User does not own any conferences.');
          this.conferenceParticipations = [];
          this.isLoading = false;
          return;
        }
  
        // Fetch all participation data
        this.conferenceParticipationService.getAllConferences().subscribe(
          (participationData) => {
            console.log('Participation Data:', participationData); // Debugging participation data
  
            // **Filter participations that belong to conferences owned by the user**
            this.conferenceParticipations = participationData.filter(participation => {
              console.log('Checking participation:', participation);
              // Find the conference based on conferenceId
              const conference = ownedConferences.find(conf => conf.id === participation.conferenceId);
              if (conference) {
                console.log('Matching conference:', conference); // Debugging matching conferences
              } else {
                console.log('No matching conference found for participation:', participation);
              }
              return conference !== undefined;
            });
  
            // **Assign conference titles**
            this.conferenceParticipations.forEach((participation) => {
              const conference = this.conferences.find(conf => conf.id === participation.conferenceId);
              participation.conferenceTitle = conference ? conference.topic : 'Unknown Conference';
            });
  
            this.isLoading = false;
            console.log('Filtered Participation Data:', this.conferenceParticipations);
          },
          (error) => {
            console.error('Error fetching conference participations', error);
            this.isLoading = false;
          }
        );
      },
      (error) => {
        console.error('Error fetching conferences', error);
        this.isLoading = false;
      }
    );
  }
  
  
  
  

  // Update acceptance status for a participant
  updateAcceptanceStatus(id: number, accepted: boolean) {
    this.conferenceParticipationService.updateAcceptanceStatus(id, accepted).subscribe(
      response => {
        console.log('Updated acceptance status:', response);
        this.loadAllConferences();  // Reload conferences after update
      },
      error => {
        console.error('Error updating acceptance status', error);
      }
    );
  }
}
