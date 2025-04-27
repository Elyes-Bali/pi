import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Session } from 'src/app/models/session.model';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private apiUrl = 'http://localhost:8080/sessions/';
  constructor(private http: HttpClient) {}

  getSessions(): Observable<Session[]> {
    return this.http.get<Session[]>(this.apiUrl+"all-Session");
  }

  getSessionById(id: number): Observable<Session> {
    return this.http.get<Session>(`${this.apiUrl}session/${id}`);
  }

  createSession(session: Session): Observable<Session> {
    return this.http.post<Session>(this.apiUrl+"add", session);
  }

  deleteSession(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}delete/${id}`);
  }
}
