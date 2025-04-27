package com.example.project.backend.services.RessourceSer;
import com.example.project.backend.entity.Ressource;
import com.example.project.backend.repositories.RessourceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RessourceServiceImpl implements RessourceService{
    @Autowired
    private RessourceRepository ressourceRepository;

    public List<Ressource> getAllResources() {
        return ressourceRepository.findAll();
    }

    public Optional<Ressource> getRessourceById(Long id) {
        return ressourceRepository.findById(id);
    }

    public Ressource createRessource(Ressource ressource) {
        return ressourceRepository.save(ressource);
    }

    public void deleteRessource(Long id) {
        ressourceRepository.deleteById(id);
    }

    public Ressource updateRessource(Long id, Ressource updatedRessource) {
        if (ressourceRepository.existsById(id)) {
            updatedRessource.setId(id);
            return ressourceRepository.save(updatedRessource);
        }
        return null;
    }
}
