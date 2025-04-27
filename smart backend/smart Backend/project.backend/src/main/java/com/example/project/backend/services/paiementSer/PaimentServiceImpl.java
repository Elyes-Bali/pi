package com.example.project.backend.services.paiementSer;

import com.example.project.backend.entity.Paiement;
import com.example.project.backend.repositories.PaimentRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
@Slf4j
public class PaimentServiceImpl implements PaimentService{
    @Autowired
    private PaimentRepository paimentRepository;


    @Override
    public void savePaiement(Long participant, Long amount, Long cardnumber, Long ccv, String holder, boolean status) {
        Paiement paiement = new Paiement();
        paiement.setParticipant(participant);
        paiement.setAmount(amount);
        paiement.setCardnumber(cardnumber);
        paiement.setCcv(ccv);
        paiement.setHolder(holder);
        paiement.setStatus(true);

        paimentRepository.save(paiement);
    }


    @Override
    public List<Paiement> findAllPaiements() {
        return paimentRepository.findAll();
    }

    @Override
    public Paiement findPaiementById(Long id) {
        Optional<Paiement> paiement = paimentRepository.findById(id);
        return paiement.orElse(null);
    }

    @Override
    public boolean updatePaiementStatus(Long id, boolean status) {
        Optional<Paiement> paiement = paimentRepository.findById(id);
        if (paiement.isPresent()) {
            Paiement p = paiement.get();
            p.setStatus(status);
            paimentRepository.save(p);
            return true;
        }
        return false;
    }

    @Override
    public boolean deletePaiement(Long id) {
        if (paimentRepository.existsById(id)) {
            paimentRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
