import { Component } from '@angular/core';
import { UserStorageService } from './services/storage/user-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { WebSocketService } from './services/webSocket/web-socket.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'frontend';
  isMenuOpen = false;
  userId: number | null = null;
  patientId: number;
  notifications: any[] = [];
  isParticipantLoggedIn: boolean = UserStorageService.isParticipantLoggedIn();
  isAdminLoggedIn: boolean = UserStorageService.isAdminLoggedIn();
  isOrganizerLoggedIn: boolean = UserStorageService.isOrganizerLoggedIn();
  constructor(
    private router: Router,
    private userStorageService: UserStorageService,
    private webSocketService: WebSocketService
 
  ) {}

  ngOnInit() {
    // Subscribe to user updates to get latest userId dynamically
    this.userStorageService.user$.subscribe((user) => {
      if (user && user.userId) {
        this.userId = user.userId; // Reactively update userId
        this.patientId = this.userId;
      }
    });

    this.router.events.subscribe((event) => {
      this.isParticipantLoggedIn = UserStorageService.isParticipantLoggedIn();
      this.isAdminLoggedIn = UserStorageService.isAdminLoggedIn();
      this.isOrganizerLoggedIn = UserStorageService.isOrganizerLoggedIn();
    });
   
    setTimeout(() => {
      this.webSocketService.subscribeToNotifications(this.userId!);
    }, 1000);

    this.webSocketService.getNotifications().subscribe((notification) => {
      console.log('Notification received:', notification);
      this.notifications.push(notification);
      console.log(this.notifications);
    });
  }

  navigateToUpdate() {
    if (this.userId !== null) {
      this.router.navigate(['/update-user', this.userId]);
    }
  }

  navigateToProfile() {
    if (this.userId !== null) {
      this.router.navigate(['/docprofile', this.userId]);
    }
  }

  navigateToAppointments() {
    if (this.userId !== null) {
      this.router.navigate(['/docs/allapointments', this.userId]);
    }
  }

  patientAppointments() {
    if (this.userId !== null) {
      this.router.navigate(['/patient/allapointments', this.userId]);
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout() {
    UserStorageService.signOut();
    this.router.navigate(['/login']);
  }
}
