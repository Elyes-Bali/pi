package com.example.project.backend.dto;
import com.example.project.backend.enums.UserRole;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class SignupRequest {
    private String email;

    private String password;

    private String name;

    private UserRole userRole;

    private String matricule;

}
