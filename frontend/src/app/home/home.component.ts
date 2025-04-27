import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';
import { UserStorageService } from '../services/storage/user-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isParticipantLoggedIn : boolean = UserStorageService.isParticipantLoggedIn();
  isOrganizerLoggedIn : boolean = UserStorageService.isOrganizerLoggedIn();

  constructor(private router : Router) { }

  ngOnInit() {


    this.router.events.subscribe(event => {
      this.isParticipantLoggedIn = UserStorageService.isParticipantLoggedIn();
      this.isOrganizerLoggedIn = UserStorageService.isOrganizerLoggedIn();
    })
  }

}
