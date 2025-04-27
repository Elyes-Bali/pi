package com.example.project.backend.services.post;
import com.example.project.backend.entity.Comment;
import com.example.project.backend.entity.PostLike;
import com.example.project.backend.entity.Post;
import com.example.project.backend.entity.User;
import com.example.project.backend.repositories.CommentRepository;
import com.example.project.backend.repositories.LikeRepository;
import com.example.project.backend.repositories.PostRepository;
import com.example.project.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostServiceImpl {
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private CommentRepository commentRepository;
    @Autowired
    private LikeRepository likeRepository;
    @Autowired
    private UserRepository userRepository;

    public Post createPost(Post post, String authorName,Long authorId) {
        // Directly set the author name
        post.setAuthor(authorName);
        post.setAuthorid(authorId);
        // Save the post and return it
        return postRepository.save(post);
    }

    // Get all posts
    public List<Post> getPosts() {
        return postRepository.findAll();
    }

    // Add a comment to a post
    public Comment addComment(Long postId, Comment comment, String authorName,Long authorId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        comment.setPost(post);
        comment.setAuthorid(authorId);

        // Set the author directly from frontend data
        comment.setAuthor(authorName);

        return commentRepository.save(comment);
    }

    // Like a post
    public PostLike likePost(Long postId, PostLike like, String username) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        // Set the user directly from frontend data
        like.setUser(username);
        like.setPost(post);

        return likeRepository.save(like);
    }

    public void deletePost(Long postId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));
        postRepository.delete(post);
    }

    public void deleteComment(Long commentId) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new RuntimeException("Comment not found"));
        commentRepository.delete(comment);
    }

}
