package com.example.project.backend.repositories;

import com.example.project.backend.entity.Paiement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaimentRepository extends JpaRepository<Paiement,Long> {
}
