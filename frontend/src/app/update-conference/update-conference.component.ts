import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Conference } from 'src/app/models/conference.model';
import { ConferenceService } from 'src/app/services/conference/conference.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-conference',
  templateUrl: './update-conference.component.html',
  styleUrls: ['./update-conference.component.css']
})
export class UpdateConferenceComponent implements OnInit {
  conferenceId: number;
  conferenceForm: FormGroup;
  conference: Conference;

  constructor(
    private route: ActivatedRoute,
    private conferenceService: ConferenceService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.conferenceId = +this.route.snapshot.paramMap.get('id'); // Get the conference ID from the route parameter
    this.loadConferenceDetails();
    this.initForm();
  }

  // Initialize form with validation
  initForm(): void {
    this.conferenceForm = this.fb.group({
      topic: [this.conference?.topic, [Validators.required]],
      location: [this.conference?.location, [Validators.required]],
      deadline: [this.conference?.deadline, [Validators.required]],
      onlineMode: [this.conference?.onlineMode || false], // NEW
      zoomLink: [this.conference?.zoomLink || '']          // NEW
    });
  }

  // Load the current details of the conference
  loadConferenceDetails(): void {
    this.conferenceService.getConferenceById(this.conferenceId).subscribe(
      (conference: Conference) => {
        this.conference = conference;
        this.initForm(); // Reinitialize the form after loading the conference
      },
      (error) => {
        console.error('Error loading conference:', error);
      }
    );
  }

  // Handle form submission
  onSubmit(): void {
    if (this.conferenceForm.invalid) {
      return;
    }

    const updatedConference: Conference = {
      ...this.conference,
      ...this.conferenceForm.value // Merge updated values from the form
    };

    this.conferenceService.updateConference(this.conferenceId, updatedConference).subscribe(
      (updatedConf) => {
        console.log('Conference updated:', updatedConf);
        this.router.navigate(['/myconferences']); // Navigate back to the list of conferences
      },
      (error) => {
        console.error('Error updating conference:', error);
      }
    );
  }
}
