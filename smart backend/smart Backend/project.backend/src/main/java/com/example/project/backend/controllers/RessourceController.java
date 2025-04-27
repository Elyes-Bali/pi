package com.example.project.backend.controllers;

import com.example.project.backend.entity.Ressource;
import com.example.project.backend.services.RessourceSer.RessourceService;
import com.example.project.backend.services.RessourceSer.RessourceServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/resources")
@CrossOrigin(origins = "http://localhost:4200/")
public class RessourceController {

    @Autowired
    private RessourceServiceImpl ressourceService;

    @GetMapping("/allRessources")
    public List<Ressource> getAllResources() {
        return ressourceService.getAllResources();
    }

    @GetMapping("/ressoucebyid/{id}")
    public ResponseEntity<Ressource> getRessourceById(@PathVariable Long id) {
        Optional<Ressource> resource = ressourceService.getRessourceById(id);
        return resource.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/add")
    public ResponseEntity<Ressource> createRessource(@RequestBody Ressource ressource) {
        Ressource createdRessource = ressourceService.createRessource(ressource);
        return new ResponseEntity<>(createdRessource, HttpStatus.CREATED);
    }

    @PutMapping("/updateressource/{id}")
    public ResponseEntity<Ressource> updateRessource(@PathVariable Long id, @RequestBody Ressource updatedRessource) {
        Ressource updated = ressourceService.updateRessource(id, updatedRessource);
        return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteRessource(@PathVariable Long id) {
        ressourceService.deleteRessource(id);
        return ResponseEntity.noContent().build();
    }
}
