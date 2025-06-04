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

import fr.n7.entraide.entities.Adresse;
import fr.n7.entraide.repositories.AdresseRepository;
import fr.n7.entraide.utils.ResponseHandler;

@RestController
@RequestMapping("/adresse")
public class AdresseController {
    @Autowired
    private AdresseRepository adresseRepository;

    @GetMapping
    public List<Adresse> getAllAdresses() {
        return adresseRepository.findAll();
    }

    @PostMapping(path = "/create", produces=MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Object> createAdresse(@RequestBody Adresse adresse) {

        if(adresseRepository.findAll().contains(adresse))
         return ResponseHandler.generateResponse("Adresse déjà existante", HttpStatus.BAD_REQUEST);

        adresseRepository.save(adresse);
        return ResponseHandler.generateResponse("Adresse created successfully", HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getOffreById(@PathVariable("id") Long id) {
        Optional<Adresse> optionalOffre = adresseRepository.findById(id);
        if (optionalOffre.isPresent()) {
            return ResponseHandler.generateResponse("Adresse found successfully", HttpStatus.OK);
        } else {
            return ResponseHandler.generateResponse("Adresse not found", HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteAdresse(@PathVariable("id") Long id) {
        adresseRepository.deleteById(id);
        return ResponseHandler.generateResponse("Adresse deleted successfully", HttpStatus.OK);
    }
}
