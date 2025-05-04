package fr.n7.entraide.facades;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fr.n7.entraide.entities.Evenement;
import fr.n7.entraide.repositories.EvenementRepository;
import fr.n7.entraide.entities.Adresse;
import fr.n7.entraide.repositories.AdresseRepository;
import fr.n7.entraide.utils.ResponseHandler;

@RestController
@RequestMapping("/evenement")
public class EvenementController {

    @Autowired
    private EvenementRepository evenementRepository;

    @Autowired
    private AdresseRepository adresseRepository;

    @GetMapping
    public List<Evenement> getAllEvenements() {
        return evenementRepository.findAll();
    }

    @PostMapping(path = "/create", produces=MediaType.APPLICATION_JSON_VALUE ) 
    public ResponseEntity<Object> createEvenement(@RequestBody Evenement evenement) {
        Adresse adresse = evenement.getAdresse();
        if (adresse != null) {
            adresseRepository.save(adresse);
            //evenement.setAdresse(adresse);
        }
        evenementRepository.save(evenement);
        return ResponseHandler.generateResponse("Evenement created successfully", HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteOffer(@PathVariable("id") Long id) {
        evenementRepository.deleteById(id);
        return ResponseHandler.generateResponse("Offer deleted successfully", HttpStatus.OK);
    }
}
