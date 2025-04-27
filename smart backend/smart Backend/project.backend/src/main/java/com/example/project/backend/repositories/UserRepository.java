package com.example.project.backend.repositories;


import com.example.project.backend.entity.User;
import com.example.project.backend.enums.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface UserRepository extends JpaRepository<User,Long> {
    Optional<User> findFirstByEmail(String email);

    User findByRole(UserRole userRole);

    List<User> findAllByRole(UserRole userRole);

}
