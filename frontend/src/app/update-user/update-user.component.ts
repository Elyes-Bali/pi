import { Component } from '@angular/core';
import { UserDto, UserDetails } from '../models/user.model';
import { AuthService } from '../services/auth/auth.service';
import { ActivatedRoute } from '@angular/router';
import { UserStorageService } from '../services/storage/user-storage.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent {
  userId: number;
  userDetails: UserDetails = new UserDetails();
  image: File;
  imagePreview!: string | ArrayBuffer | null;
  isOrganizerLoggedIn : boolean = UserStorageService.isOrganizerLoggedIn();
  constructor(private userService: AuthService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = params['id'];  // Get the userId from the URL
      this.getUserDetails();
      this.isOrganizerLoggedIn = UserStorageService.isOrganizerLoggedIn();
    });
  }

  getUserDetails() {
    this.userService.getuserId(this.userId).subscribe(data => {
      this.userDetails = data;
      console.log(this.userDetails);

      // If there's an image URL, set it for preview
      if (this.userDetails.imgUrl) {
        this.imagePreview = this.userDetails.imgUrl;
      }
    });
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.image = file;

      // Preview the image
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreview = e.target?.result;
      };
      reader.readAsDataURL(file);
    }
  }

  updateUser() {
    this.userService.updateUser(
      this.userId,
      this.userDetails.name,
      this.userDetails.email,
      this.userDetails.matricule,
      this.userDetails.verified,
      this.image
    ).subscribe(
      (updatedUser) => {
        console.log('User updated successfully', updatedUser);
        alert('Profile updated successfully!');
      },
      (error) => {
        console.error('Error updating user', error);
        alert('An error occurred while updating your profile.');
      }
    );
  }
}
