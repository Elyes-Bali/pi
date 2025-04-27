package com.example.project.backend.services.auth;

import com.example.project.backend.dto.SignupRequest;
import com.example.project.backend.dto.UserDto;
import com.example.project.backend.entity.User;
import com.example.project.backend.enums.UserRole;
import com.example.project.backend.repositories.UserRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class AuthServiceImpl implements AuthService{
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public UserDto createUser(SignupRequest signupRequest){
        User user = new User();

        user.setEmail(signupRequest.getEmail());
        user.setName(signupRequest.getName());
        user.setPassword(new BCryptPasswordEncoder().encode(signupRequest.getPassword()));
        user.setRole(signupRequest.getUserRole() != null ? signupRequest.getUserRole() : UserRole.PARTICIPANT);
        user.setMatricule(signupRequest.getMatricule());

        if (signupRequest.getUserRole() == UserRole.ORGANIZER) {
            user.setVerified(false);
            user.setMatricule(signupRequest.getMatricule());
        }else {
            user.setVerified(true);
        }

        User createdUser = userRepository.save(user);

        UserDto userDto = new UserDto();
        userDto.setId(createdUser.getId());
        return userDto;
    }

    public Boolean hasUserWithEmail(String email){
        return  userRepository.findFirstByEmail(email).isPresent();
    }

    @PostConstruct
    public void createAdminAccount(){
        User adminAccount = userRepository.findByRole(UserRole.ADMIN);
        if (null == adminAccount){
            User user = new User();
            user.setEmail("admin@gmail.com");
            user.setName("admin");
            user.setRole(UserRole.ADMIN);
            user.setPassword(new BCryptPasswordEncoder().encode("admin"));
            userRepository.save(user);
        }
    }

    @Override
    public User getUserbyId(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    @Override
    public List<User> allUsers() {
        return userRepository.findAll();
    }

    @Override
    public List<User> getAllParticipants() {
        return userRepository.findAllByRole(UserRole.PARTICIPANT);
    }


    public UserDto updateUser(Long userId, String name, String email,String matricule, Boolean verified) throws IOException {
        Optional<User> userOpt = userRepository.findById(userId);
        if (!userOpt.isPresent()) {
            throw new RuntimeException("User not found");
        }

        User user = userOpt.get();

        if (name != null) user.setName(name);
        if (email != null) user.setEmail(email);
        if (matricule != null) user.setMatricule(matricule);
        if (verified != null) {
            user.setVerified(verified);  // Boolean value will directly update the field
        }
        // Handle image upload

        userRepository.save(user);

        // Convert to UserDto and return
        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setName(user.getName());
        userDto.setEmail(user.getEmail());
        userDto.setVerified(user.isVerified());
        return userDto;
    }

    @Override
    public List<User> getAllOrganizers() {
        return userRepository.findAllByRole(UserRole.ORGANIZER);
    }

    public void followCategory(Long userId, String category) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (user.getFollowedCategories() == null) {
            user.setFollowedCategories(new ArrayList<>());
        }

        if (!user.getFollowedCategories().contains(category)) {
            user.getFollowedCategories().add(category);
            userRepository.save(user);
        }
    }

    public void unfollowCategory(Long userId, String category) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (user.getFollowedCategories() != null && user.getFollowedCategories().contains(category)) {
            user.getFollowedCategories().remove(category);
            userRepository.save(user);
        }
    }
}
