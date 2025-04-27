import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConferenceParticipantionService {
  private apiUrl = 'http://localhost:8080/conference-participation/';
  constructor(private http: HttpClient) { }

  // Get all conference participations
  getAllConferences(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}all`);
  }

  // Update acceptance status of a conference participation
  updateAcceptanceStatus(id: number, accepted: boolean): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}update/${id}/acceptance?accepted=${accepted}`, {});
  }
}