import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = 'http://localhost:8080/posts/';
  constructor(private http: HttpClient) { }

  createPost(post: { content: string, authorName: string ,authorId:number}): Observable<any> {
    return this.http.post(this.apiUrl + 'add', post);
  }
  
  

  getPosts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl+"allpost");
  }

  addComment(postId: number, comment: { content: string }, username: string, authorId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}comment/${postId}/comments?username=${username}&authorId=${authorId}`, comment);
}

  // Like a post
  likePost(postId: number, username: string): Observable<any> {
    return this.http.post(`${this.apiUrl}like/${postId}/likes?username=${username}`, {});
  }


  deletePost(postId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}delpost/${postId}`);
  }
  
  deleteComment(commentId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}delcom/${commentId}`);
  }
  
}
