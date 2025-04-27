import { Component } from '@angular/core';
import { UserDetails } from '../models/user.model';
import { UserStorageService } from '../services/storage/user-storage.service';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.css'],
})
export class RecommendationsComponent {
  categories: string[] = [
    'Technology',
    'Medicine',
    'Engineering',
    'Business',
    'Environment',
    'Education',
    'Art',
  ]; // Add your categories
  userDetails: UserDetails = new UserDetails();
  selectedCategories: string[] = []; // To track selected categories
  userId: number;
  matricule: string;

  constructor(
    private userStorageService: UserStorageService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userStorageService.user$.subscribe((user) => {
      console.log('Received user:', user);
      if (user && user.userId) {
        this.userId = user.userId;
        this.matricule = user.matricule;
        console.log('current id', this.matricule);
      }
    });

    this.getUserDetails(); // Fetch user details
  }

  getUserDetails() {
    this.authService.getuserId(this.userId).subscribe((data) => {
      this.userDetails = data;
      console.log('this is the current logged in user ', this.userDetails);
      if (this.userDetails.followedCategories) {
        this.selectedCategories = [...this.userDetails.followedCategories];
      }
    });
  }

  followCategory(category: string) {
    this.authService.followCategory(this.userId, category).subscribe({
      next: () => console.log(`Followed category: ${category}`),
      error: (error) => console.error(`Error following category: ${error}`),
    });
  }

  unfollowCategory(category: string) {
    this.authService.unfollowCategory(this.userId, category).subscribe({
      next: () => console.log(`Unfollowed category: ${category}`),
      error: (error) => console.error(`Error unfollowing category: ${error}`),
    });
  }

  onCategoryChange(event: any, category: string) {
    if (event.target.checked) {
      this.selectedCategories.push(category);
      this.followCategory(category);
    } else {
      this.selectedCategories = this.selectedCategories.filter(
        (c) => c !== category
      );
      this.unfollowCategory(category);
    }
  }
}
