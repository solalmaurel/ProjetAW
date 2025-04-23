package fr.n7.entraide.facades;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fr.n7.entraide.entities.Offre;
import fr.n7.entraide.entities.User;
import fr.n7.entraide.repositories.OffreRepository;
import fr.n7.entraide.utils.ResponseHandler;

@RestController
@RequestMapping("/offre")
public class OffreController {
    @Autowired
    private OffreRepository offreRepository;

    @GetMapping
    public List<Offre> getAllOffres() {
        return offreRepository.findAll();
    }

    @PostMapping(path = "/create", produces=MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Object> createOffre(@RequestBody Offre offre) {
        offreRepository.save(offre);
        return ResponseHandler.generateResponse("Offer created successfully", HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getOffreById(@PathVariable("id") Long id) {
        Optional<Offre> optionalOffre = offreRepository.findById(id);
        if (optionalOffre.isPresent()) {
            return ResponseHandler.generateResponse("Offer found successfully", HttpStatus.OK);
        } else {
            return ResponseHandler.generateResponse("Offer not found", HttpStatus.NOT_FOUND);
        }
    }
}