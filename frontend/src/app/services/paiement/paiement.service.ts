import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Paiement } from 'src/app/models/paiement.model';

@Injectable({
  providedIn: 'root'
})
export class PaiementService {
  private apiUrl = 'http://localhost:8080/paiement'; 

  constructor(private http: HttpClient) {}

  getAllPaiements(): Observable<Paiement[]> {
    return this.http.get<Paiement[]>(this.apiUrl+"/getallPaiments");
  }

  getPaiementById(id: number): Observable<Paiement> {
    return this.http.get<Paiement>(`${this.apiUrl}/getpaiementId/${id}`);
  }

  createPaiement(paiement: Paiement): Observable<string> {
    return this.http.post<string>(this.apiUrl+"/addPaiement", paiement);
  }

  updatePaiementStatus(id: number, status: boolean): Observable<string> {
    return this.http.put<string>(`${this.apiUrl}/update/${id}?status=${status}`, {});
  }

  deletePaiement(id: number): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/delete/${id}`);
  }
}
