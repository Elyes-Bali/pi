package com.example.project.backend.entity;
import com.example.project.backend.enums.UserRole;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.util.List;

@Entity
@Data
@Table(name = "users")
@NoArgsConstructor
@AllArgsConstructor
public class User implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;

    private String password;

    private String name;

    private UserRole role;
    private String matricule;
    @Column(nullable = false)
    private boolean verified = true;

    @Lob
    @Column(columnDefinition = "longblob")
    private byte[] img;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    @ElementCollection
    private List<String> followedCategories;
}
