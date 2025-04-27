import { Component, OnInit } from '@angular/core';
import { Session } from '../models/session.model';
import { SessionService } from '../services/session/session.service';

@Component({
  selector: 'app-session-list',
  templateUrl: './session-list.component.html',
  styleUrls: ['./session-list.component.css']
})
export class SessionListComponent implements OnInit{
  sessions: Session[] = [];

  constructor(private sessionService: SessionService) {}

  ngOnInit(): void {
    this.loadSessions();
  }

  loadSessions(): void {
    this.sessionService.getSessions().subscribe(sessions => {
      this.sessions = sessions;
    });
  }

  deleteSession(id: number): void {
    this.sessionService.deleteSession(id).subscribe(() => {
      this.sessions = this.sessions.filter(session => session.id !== id);
    });
  }
}
