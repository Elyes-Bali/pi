import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/posts/post.service';
import { UserStorageService } from '../services/storage/user-storage.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit{
  posts: any[] = [];
  newPostContent: string = '';
  commentContent: { [key: number]: string } = {};  // Object to hold comment content per post
  userId: number;
  username: string;
  authorId:number;

  constructor(private postService: PostService, private userStorageService: UserStorageService) { }

  ngOnInit(): void {
    this.userStorageService.user$.subscribe((user) => {
      console.log('Received user:', user);
      if (user && user.userId) {
        this.userId = user.userId;
        this.authorId=user.userId;
        this.username = user.name;
        console.log('current id', this.userId);
      }
    });
    this.loadPosts();
  }

  loadPosts(): void {
    this.postService.getPosts().subscribe(posts => {
      this.posts = posts.map(post => ({
        ...post,
        authorid: Number(post.authorid) // Ensure it's a number
      })).reverse(); 
      
      console.log('Posts loaded:', this.posts);
    });
  }
  
  
  createPost(): void {
    if (this.newPostContent) {
      const authorName = this.username; 
      this.postService.createPost({ content: this.newPostContent, authorName, authorId: this.authorId }).subscribe(post => {
        this.posts.push(post);
        this.newPostContent = '';
        this.loadPosts();
      });
     
    }
  }

  addComment(postId: number): void {
    const commentContent = this.commentContent[postId];  // Get the comment content for the specific post
    if (commentContent) {
      this.postService.addComment(postId, { content: commentContent }, this.username,this.authorId).subscribe(comment => {
        const post = this.posts.find(p => p.id === postId);
        if (post) {
          post.comments.push(comment);
        }
        this.commentContent[postId] = '';  // Reset comment content for this post
      });
    }
  }

  likePost(postId: number): void {
    this.postService.likePost(postId, this.username).subscribe(() => {
      const post = this.posts.find(p => p.id === postId);
      if (post) {
        post.likes.push({ user: this.username });  // Now passing username directly
      }
    });
  }


  deletePost(postId: number): void {
    this.postService.deletePost(postId).subscribe(() => {
      this.posts = this.posts.filter(post => post.id !== postId);
    });
  }
  
  deleteComment(commentId: number, postId: number): void {
    this.postService.deleteComment(commentId).subscribe(() => {
      const post = this.posts.find(p => p.id === postId);
      if (post) {
        post.comments = post.comments.filter(comment => comment.id !== commentId);
      }
    });
  }
  
}
