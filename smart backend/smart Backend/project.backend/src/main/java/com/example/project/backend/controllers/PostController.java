package com.example.project.backend.controllers;

import com.example.project.backend.dto.PostRequestDto;
import com.example.project.backend.entity.Comment;
import com.example.project.backend.entity.PostLike;
import com.example.project.backend.entity.Post;
import com.example.project.backend.services.post.PostServiceImpl;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/posts")
public class PostController {
    @Autowired
    private PostServiceImpl postService;

    @PostMapping("/add")
    public Post createPost(@RequestBody PostRequestDto.PostRequest postRequest) {
        return postService.createPost(postRequest.getPost(), postRequest.getAuthorName(),postRequest.getAuthorId());
    }
    @GetMapping("/allpost")
    public List<Post> getPosts() {
        return postService.getPosts();
    }

    @PostMapping("/comment/{postId}/comments")
    public Comment addComment(@PathVariable Long postId, @RequestBody Comment comment, @RequestParam String username,@RequestParam Long authorId ) {
        return postService.addComment(postId, comment, username,authorId);
    }

    @PostMapping("/like/{postId}/likes")
    public PostLike likePost(@PathVariable Long postId, @RequestBody PostLike like, @RequestParam String username) {
        return postService.likePost(postId, like, username);
    }

    @DeleteMapping("delpost/{postId}")
    public void deletePost(@PathVariable Long postId) {
        postService.deletePost(postId);
    }

    @DeleteMapping("/delcom/{commentId}")
    public void deleteComment(@PathVariable Long commentId) {
        postService.deleteComment(commentId);
    }


}
