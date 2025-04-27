import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Conference } from 'src/app/models/conference.model';
import { Session } from 'src/app/models/session.model';

@Injectable({
  providedIn: 'root'
})
export class ConferenceService {
  private apiUrl = 'http://localhost:8080/conferences/';

  constructor(private http: HttpClient) {}

  createConference(conference: Conference, userId: number): Observable<Conference> {
    return this.http.post<Conference>(`${this.apiUrl}create?userId=${userId}`, conference);
  }

  addSessionsToConference(conferenceId: number, sessions: Session[]): Observable<Conference> {
    return this.http.post<Conference>(`${this.apiUrl}${conferenceId}/add-sessions`, sessions);
  }

  getConferences(): Observable<Conference[]> {
    return this.http.get<Conference[]>(this.apiUrl+"allConf");
  }

  getConferenceById(id: number): Observable<Conference> {
    return this.http.get<Conference>(`${this.apiUrl}confbyId/${id}`);
  }

  participateInConference(conferenceId: number, userId: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}participant/${conferenceId}/participate?userId=${userId}`, {});
  }
  
  
  
  acceptUserParticipation(conferenceId: number, userId: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}accept/${conferenceId}/accept/${userId}`, {});
  }
  

  declineUserParticipation(conferenceId: number, userId: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}decline/${conferenceId}/decline/${userId}`, {});
  }


  updateConference(conferenceId: number, updatedConference: Conference): Observable<Conference> {
    return this.http.put<Conference>(`${this.apiUrl}update/${conferenceId}`, updatedConference);
  }

  deleteConference(conferenceId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}delete/${conferenceId}`);
  }

  getRecommendedConferences(userId: number): Observable<Conference[]> {
    return this.http.get<Conference[]>(`${this.apiUrl}recommendations/${userId}`);
  }
  
}
