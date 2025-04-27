package com.example.project.backend.services.paiementSer;

import com.example.project.backend.entity.Paiement;

import java.util.List;

public interface PaimentService {
    void savePaiement(Long participant,Long amount,  Long cardnumber,Long ccv,String holder,boolean status);

    List<Paiement> findAllPaiements();  // Get all paiements

    Paiement findPaiementById(Long id); // Get paiement by ID

    boolean updatePaiementStatus(Long id, boolean status);

    boolean deletePaiement(Long id);
}
