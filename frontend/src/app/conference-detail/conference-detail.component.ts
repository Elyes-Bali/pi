import { Component, OnInit } from '@angular/core';
import { ConferenceService } from '../services/conference/conference.service';
import { FeedbackService } from '../services/feedback/feedback.service';
import { Feedback } from '../models/feedback.model';
import { ActivatedRoute } from '@angular/router';
import { UserStorageService } from '../services/storage/user-storage.service';
import { Conference } from '../models/conference.model';

@Component({
  selector: 'app-conference-detail',
  templateUrl: './conference-detail.component.html',
  styleUrls: ['./conference-detail.component.css']
})
export class ConferenceDetailComponent implements OnInit {
  conference: Conference;
  conferenceId: number;
  feedbackContent: string;
  rating: number;
  feedbackList: Feedback[] = [];
  userId: number;
  username:string;
  constructor(
    private conferenceService: ConferenceService,
    private feedbackService: FeedbackService,
    private route: ActivatedRoute,
    private userStorageService: UserStorageService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.conferenceId = +params.get('id'); // Retrieve conference ID from route parameters
      this.getConferenceDetails(this.conferenceId); // Load conference details
    });
    this.route.params.subscribe(params => {
      this.conferenceId = params['id'];
      this.loadFeedback();
    });
    this.userStorageService.user$.subscribe((user) => {
      console.log('Received user:', user);
      if (user && user.userId) {
        this.userId = user.userId;
        this.username=user.name;
        console.log('current id', this.userId);
      }
    });
  }

  getConferenceDetails(id: number): void {
    this.conferenceService.getConferenceById(id).subscribe(
      (data) => {
        this.conference = data; // Assign the conference details
      },
      (error) => {
        console.error('Error fetching conference details:', error);
      }
    );
  }

  loadFeedback(): void {
    this.feedbackService.getFeedbackForConference(this.conferenceId).subscribe(
      (data: Feedback[]) => {
        this.feedbackList = data;
      }
    );
  }

  submitFeedback(): void {
    const feedback = { content: this.feedbackContent, rating: this.rating, user: { id: this.userId, name: this.username } }; 
  
    this.feedbackService.addFeedback(this.conferenceId, this.userId, feedback).subscribe(
      (data) => {
        this.loadFeedback(); 
      }
    );
  }
  
}
