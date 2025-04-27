package com.example.project.backend.services.auth;

import com.example.project.backend.dto.SignupRequest;
import com.example.project.backend.dto.UserDto;
import com.example.project.backend.entity.User;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface AuthService {
    UserDto createUser(SignupRequest signupRequest);

    Boolean hasUserWithEmail(String email);
    User getUserbyId(Long id);

    List<User> allUsers();

    List<User> getAllParticipants();

    UserDto updateUser(Long userId, String name, String email, String matricule, Boolean verified) throws IOException;

    List<User> getAllOrganizers();

    void followCategory(Long userId, String category);

    void unfollowCategory(Long userId, String category);
}
