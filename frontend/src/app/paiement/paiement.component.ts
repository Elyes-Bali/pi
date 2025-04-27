import { Component, OnInit } from '@angular/core';
import { PaiementService } from '../services/paiement/paiement.service';
import { Paiement } from '../models/paiement.model';
import { UserStorageService } from '../services/storage/user-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paiement',
  templateUrl: './paiement.component.html',
  styleUrls: ['./paiement.component.css']
})
export class PaiementComponent implements OnInit{
  paiements: Paiement[] = [];
  userId: number =0;
  newPaiement: Paiement = {
    participant: this.userId,
    amount: 15,
    cardnumber: 0,
    ccv: 0,
    holder: '',
    status: true,
  };
  isLoading = false;
  paymentSuccess = false;

  cardNumberPattern = "^[0-9]{16}$";  // Ensure 16 digits for card number
  ccvPattern = "^[0-9]{3}$";  // Ensure 3 digits for CCV
  constructor(private paiementService: PaiementService,private userStorageService: UserStorageService,private router:Router) {}

  ngOnInit(): void {
    this.userStorageService.user$.subscribe((user) => {
      console.log('Received user:', user);
      if (user && user.userId) {
        this.userId = user.userId;
        console.log("current id" , this.userId)
      }
    });
    this.loadPaiements();
  }

  loadPaiements(): void {
    this.isLoading = true;
    this.paiementService.getAllPaiements().subscribe((data) => {
      this.paiements = data;
      this.isLoading = false;
    });
  }

  addPaiement(): void {
    // Check if card number, CCV, and card holder are valid
    if (
      this.newPaiement.cardnumber.toString().length !== 16 || 
      this.newPaiement.ccv.toString().length !== 3 || 
      !this.newPaiement.holder.trim()
    ) {
      // If any validation fails, display an error message
      alert("Please ensure the card number is 16 digits, CCV is 3 digits, and Card Holder is not empty.");
      return; // Don't proceed with the payment
    }
  
    const paiementToSend: Paiement = {
      participant: this.userId,
      amount: 15,
      cardnumber: this.newPaiement.cardnumber,
      ccv: this.newPaiement.ccv,
      holder: this.newPaiement.holder,
      status: true
    };
  
    this.paiementService.createPaiement(paiementToSend).subscribe(() => {
      this.loadPaiements();
      this.newPaiement = { participant: this.userId, amount: 15, cardnumber: 0, ccv: 0, holder: '', status: true };
      setTimeout(() => {
        this.paymentSuccess = true;
        this.router.navigate(['/']); // Navigate to the root route after success
      }, 1000);
    });
  }
  
  
}
