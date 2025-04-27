import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Feedback } from 'src/app/models/feedback.model';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private apiUrl = 'http://localhost:8080/feedback/';

  constructor(private http: HttpClient) {}

  getFeedbackForConference(conferenceId: number): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(`${this.apiUrl}conference/${conferenceId}`);
  }

  addFeedback(conferenceId: number, userId: number, feedback: Feedback) {
    return this.http.post<Feedback>(`${this.apiUrl}add?userId=${userId}&conferenceId=${conferenceId}`, feedback);
  }
  
}
