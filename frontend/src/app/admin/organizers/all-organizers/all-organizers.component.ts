import { Component } from '@angular/core';
import { UserDetails } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';
@Component({
  selector: 'app-all-organizers',
  templateUrl: './all-organizers.component.html',
  styleUrls: ['./all-organizers.component.css']
})
export class AllOrganizersComponent {
  doctors: UserDetails[] = [];
  searchTerm: string = ''; 
  filtereddocs: UserDetails[] = [];
  pageSize = 10; 
  currentPage = 1; // Current page
  totalPages = 0; // Total number of pages
  pages: number[] = []; // Array of page numbers
  pagedocs: UserDetails[] = [];

 constructor(
   private authService: AuthService
 ) {}

  ngOnInit() {
 
     this.getAllDoctors(); 
   }


   getAllDoctors(): void {
     this.authService.getAllOrganizers().subscribe(
       (data) => {
         this.doctors = data;
         console.log(this.doctors); // Debugging to check if doctors are fetched
         this.filterDocs(); // Ensure filtering and pagination happen after data is fetched
       },
       (error: any) => {
         console.error('Failed to retrieve doctors:', error);
       }
     );
   }
   

   filterDocs(): void {
     if (!this.searchTerm.trim()) {
       this.filtereddocs = [...this.doctors]; // Use spread operator to avoid reference issues
     } else {
       this.filtereddocs = this.doctors.filter(
         (docs) =>
           docs?.email?.toLowerCase().includes(this.searchTerm.toLowerCase().trim()) 
           
       );
     }
   
     this.updatePagination(); // Call pagination update function
   }
   
 
 
   updatePagination(): void {
     this.totalPages = Math.ceil(this.filtereddocs.length / this.pageSize);
 
     this.pages = [];
     for (let i = 1; i <= this.totalPages; i++) {
       this.pages.push(i);
     }
 
     this.goToPage(1);
   }
 
   goToPage(page: number): void {
     this.currentPage = page;
 
     const startIndex = (page - 1) * this.pageSize;
 
     this.pagedocs = this.filtereddocs.slice(
       startIndex,
       startIndex + this.pageSize
     );
   }
 
   previousPage(): void {
     if (this.currentPage > 1) {
       this.goToPage(this.currentPage - 1);
     }
   }
 
   nextPage(): void {
     if (this.currentPage < this.totalPages) {
       this.goToPage(this.currentPage + 1);
     }
 }


 toggleVerificationStatus(doctor: UserDetails): void {
   const newVerificationStatus = !doctor.verified;
 
   // Pass the correct parameters, including the name, verified status, and other relevant fields.
   this.authService.updateUser(
     doctor.id,
     doctor.name,  // Ensure name is passed correctly
     doctor.email,  // Pass email correctly
     doctor.matricule,  // Assuming you have this in the UserDetails model
     newVerificationStatus,  // Set the new verification status here
     null  // Assuming no image is passed for this operation
   ).subscribe(
     (response) => {
       doctor.verified = newVerificationStatus; // Update the local status
       console.log('Doctor verification status updated:', response);
     },
     (error) => {
       console.error('Error updating verification status:', error);
     }
   );
 }
 

 
}

