import { Component, OnInit } from '@angular/core';
import { Ressource, RessourceType } from '../models/ressouce.model';
import { RessourceService } from '../services/ressources/ressource.service';

@Component({
  selector: 'app-ressource',
  templateUrl: './ressource.component.html',
  styleUrls: ['./ressource.component.css']
})
export class RessourceComponent implements OnInit{
  resources: Ressource[] = [];
  newRessource: Ressource = {
    name: '',
    type: RessourceType.DATASHOW, // Default to DATASHOW type
    location: '',
    description: '',
    capacity: '',
  };

  ressouceTypes = Object.values(RessourceType); // For dropdown selection

  constructor(private ressourceService: RessourceService) {}

  ngOnInit(): void {
    this.fetchResources(); // Fetch resources on initialization
  }

  // Fetch all resources from the backend
  fetchResources(): void {
    this.ressourceService.getAllResources().subscribe((data) => {
      this.resources = data;
    });
  }

  // Create a new resource by calling the service method
  createRessource(): void {
    this.ressourceService.createRessource(this.newRessource).subscribe((resource) => {
      this.resources.push(resource); // Add the newly created resource to the list
      this.resetForm(); // Reset the form fields
    });
  }

  // Reset form fields after resource creation
  resetForm(): void {
    this.newRessource = {
      name: '',
      type: RessourceType.DATASHOW,
      location: '',
      description: '',
      capacity: '',
    };
  }
}
