package com.example.project.backend.controllers;
import com.example.project.backend.dto.AuthenticationRequest;
import com.example.project.backend.dto.SignupRequest;
import com.example.project.backend.dto.UserDto;
import com.example.project.backend.entity.User;
import com.example.project.backend.repositories.UserRepository;
import com.example.project.backend.services.auth.AuthService;
import com.example.project.backend.utils.JwtUtil;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:4200/")
public class AuthContoller {
    private final AuthenticationManager authenticationManager;

    private final UserDetailsService userDetailsService;

    private final UserRepository userRepository;

    private final JwtUtil jwtUtil;

    public static final String TOKEN_PREFIX = "Bearer ";

    public static final String HEADER_STRING = "Authorization";

    private final AuthService authService;


    @Autowired
    public AuthContoller(AuthenticationManager authenticationManager, UserDetailsService userDetailsService, UserRepository userRepository, JwtUtil jwtUtil, AuthService authService) {
        this.authenticationManager = authenticationManager;
        this.userDetailsService = userDetailsService;
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
        this.authService = authService;
    }

    @PostMapping("/authenticate")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest,
                                                       HttpServletResponse response) throws IOException, JSONException {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    authenticationRequest.getUsername(), authenticationRequest.getPassword()));
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("{\"error\": \"Incorrect username or password.\"}");
        }

        final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUsername());
        Optional<User> optionalUser = userRepository.findFirstByEmail(userDetails.getUsername());

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();

            if (!user.isVerified()) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body("{\"error\": \"Your account is not verified. Please wait for approval.\"}");
            }

            final String jwt = jwtUtil.generateToken(userDetails.getUsername());

            JSONObject jsonResponse = new JSONObject()
                    .put("userId", user.getId())
                    .put("role", user.getRole())
                    .put("email", user.getEmail())
                    .put("name", user.getName())
                    .put("matricule",user.getMatricule());

            response.addHeader("Access-Control-Expose-Headers", "Authorization");
            response.addHeader("Access-Control-Allow-Headers", "Authorization, X-PINGOTHER, Origin, " +
                    "X-Requested-With , Content-Type, Accept, X-Custom-header");
            response.addHeader(HEADER_STRING, TOKEN_PREFIX + jwt);

            return ResponseEntity.ok(jsonResponse.toString());
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("{\"error\": \"User not found.\"}");
    }

    @PostMapping(value = "/sign-up", produces = "application/json")
    public ResponseEntity<UserDto> signupUser(@RequestBody SignupRequest signupRequest) {
        if (authService.hasUserWithEmail(signupRequest.getEmail())) {
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE)
                    .body(null);
        }

        UserDto userDto = authService.createUser(signupRequest);
        return ResponseEntity.ok(userDto);
    }


    @GetMapping("/get-user/{id}")
    public User getUserbyId(@PathVariable Long id){
        System.out.println("Requested User ID: " + id);
        User user = authService.getUserbyId(id);
        return user;
    }

    @GetMapping("/all-users")
    public List<User> getAllUsers(){
        return authService.allUsers();
    }

    @GetMapping("/all-participants")
    public List<User> getAllParticipants() {
        return authService.getAllParticipants();
    }


    @PutMapping("/update-user/{userId}")
    public ResponseEntity<UserDto> updateUser(@PathVariable Long userId,  // Use @PathVariable to capture the userId from the URL path
                                              @RequestParam(required = false) String name,
                                              @RequestParam(required = false) String email,
                                              @RequestParam(required = false) String matricule,
                                              @RequestParam(required = false) Boolean verified // Make it Boolean, so it can be null if not passed
                                             ) throws IOException {
        UserDto updatedUser = authService.updateUser(userId, name, email,matricule,verified);
        return ResponseEntity.ok(updatedUser);
    }

    @GetMapping("/all-organizers")
    public List<User> getAllOrganizers() {
        return authService.getAllOrganizers();
    }

    @PostMapping("/follow/{userId}/follow")
    public ResponseEntity<Void> followCategory(@PathVariable Long userId, @RequestParam String category) {
        authService.followCategory(userId, category);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/unfollow/{userId}/unfollow")
    public ResponseEntity<Void> unfollowCategory(@PathVariable Long userId, @RequestParam String category) {
        authService.unfollowCategory(userId, category);
        return ResponseEntity.ok().build();
    }
}
