package com.example.project.backend.controllers;

import com.example.project.backend.entity.Paiement;
import com.example.project.backend.services.paiementSer.PaimentService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/paiement")
public class PaiementController {
    PaimentService paimentService;

    @PostMapping("/addPaiement")
    public ResponseEntity<Map<String, String>> savePaiement(@RequestBody Paiement paiement) {
        try {
            paimentService.savePaiement(
                    paiement.getParticipant(),
                    paiement.getAmount(),
                    paiement.getCardnumber(),
                    paiement.getCcv(),
                    paiement.getHolder(),
                    paiement.isStatus()
            );

            // Return the response as JSON
            Map<String, String> response = new HashMap<>();
            response.put("message", "Paiement saved successfully");
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "Error saving paiement: " + e.getMessage());
            return ResponseEntity.status(500).body(response);
        }
    }


    // Get all paiements
    @GetMapping("/getallPaiments")
    public ResponseEntity<List<Paiement>> getAllPaiements() {
        List<Paiement> paiements = paimentService.findAllPaiements();
        return ResponseEntity.ok(paiements);
    }

    // Get a paiement by ID
    @GetMapping("/getpaiementId/{id}")
    public ResponseEntity<Paiement> getPaiementById(@PathVariable Long id) {
        Paiement paiement = paimentService.findPaiementById(id);
        if (paiement != null) {
            return ResponseEntity.ok(paiement);
        } else {
            return ResponseEntity.status(404).body(null);
        }
    }

    // Update the paiement status
    @PutMapping("/update/{id}")
    public ResponseEntity<String> updatePaiementStatus(@PathVariable Long id, @RequestParam boolean status) {
        try {
            boolean updated = paimentService.updatePaiementStatus(id, status);
            if (updated) {
                return ResponseEntity.ok("Paiement status updated successfully");
            } else {
                return ResponseEntity.status(404).body("Paiement not found");
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error updating paiement: " + e.getMessage());
        }
    }

    // Delete a paiement by ID
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deletePaiement(@PathVariable Long id) {
        try {
            boolean deleted = paimentService.deletePaiement(id);
            if (deleted) {
                return ResponseEntity.ok("Paiement deleted successfully");
            } else {
                return ResponseEntity.status(404).body("Paiement not found");
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error deleting paiement: " + e.getMessage());
        }
    }

}
