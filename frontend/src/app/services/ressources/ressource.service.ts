import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ressource } from 'src/app/models/ressouce.model';

@Injectable({
  providedIn: 'root'
})
export class RessourceService {

  private apiUrl = 'http://localhost:8080/resources/'; // Adjust as needed

  constructor(private http: HttpClient) {}

  getAllResources(): Observable<Ressource[]> {
    return this.http.get<Ressource[]>(this.apiUrl+"allRessources");
  }

  getRessourceById(id: number): Observable<Ressource> {
    return this.http.get<Ressource>(`${this.apiUrl}ressoucebyid/${id}`);
  }

  createRessource(ressource: Ressource): Observable<Ressource> {
    return this.http.post<Ressource>(this.apiUrl+"add", ressource);
  }

  updateRessource(id: number, updatedRessource: Ressource): Observable<Ressource> {
    return this.http.put<Ressource>(`${this.apiUrl}updateressource/${id}`, updatedRessource);
  }

  deleteRessource(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}delete/${id}`);
  }
}
