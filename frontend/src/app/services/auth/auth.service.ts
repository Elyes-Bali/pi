import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { UserStorageService } from '../storage/user-storage.service';
import { User, UserDetails } from 'src/app/models/user.model';
const BASIC_URL = 'http://localhost:8080/';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/';
  constructor(
    private http: HttpClient,
    private userStorageService: UserStorageService
  ) {}

  register(signupRequest: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(BASIC_URL + 'sign-up', signupRequest, { headers });
  }

  login(username: string, password: string): any {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = { username, password };
    return this.http
      .post(BASIC_URL + 'authenticate', body, { headers, observe: 'response' })
      .pipe(
        map((res) => {
          const token = res.headers.get('authorization').substring(7);
          const user = res.body;
          if (token && user) {
            this.userStorageService.saveToken(token);
            this.userStorageService.saveUser(user);
            return true;
          }
          return false;
        })
      );
  }

  updateUser(
    userId: number,
    name?: string,
    email?: string,
  
    matricule?: string,
    verified?: boolean,  // Change from string to boolean
    image?: File
  ): Observable<any> {
    const formData = new FormData();
  
    if (name) formData.append('name', name);
    if (email) formData.append('email', email);
    if (matricule) formData.append('matricule', matricule);
    if (verified !== undefined) formData.append('verified', verified.toString());  // Convert boolean to string here
    if (image) formData.append('image', image, image.name);
  
    return this.http.put<any>(`${BASIC_URL}update-user/${userId}`, formData);
  }
  

  getuserId(id: number): Observable<UserDetails> {
    return this.http.get<UserDetails>(`${BASIC_URL}get-user/${id}`);
  }

  getAllParticipants() {
    return this.http.get<User[]>(BASIC_URL + 'all-participants');
  }

  getAllOrganizers() {
    return this.http.get<UserDetails[]>(BASIC_URL + 'all-organizers');
  }

  followCategory(userId: number, category: string): Observable<any> {
    return this.http.post(`${this.apiUrl}follow/${userId}/follow?category=${category}`, {});
  }
  
  unfollowCategory(userId: number, category: string): Observable<any> {
    return this.http.post(`${this.apiUrl}unfollow/${userId}/unfollow?category=${category}`, {});
  }
  
}
