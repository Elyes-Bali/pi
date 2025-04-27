package com.example.project.backend.dto;
import com.example.project.backend.enums.UserRole;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserDto {
    private Long id;
    private String email;
    private String name;
    private UserRole userRole;
    private String matricule;
    private boolean verified;

}
