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

import fr.n7.entraide.entities.Etablissement;
import fr.n7.entraide.repositories.EtablissementRepository;
import fr.n7.entraide.utils.ResponseHandler;

@RestController
@RequestMapping("/etablissement")
public class EtablissementController {
    @Autowired
    private EtablissementRepository etablissementRepository;

    @GetMapping
    public List<Etablissement> getAllEtablissements() {
        return etablissementRepository.findAll();
    }

    @PostMapping(path = "/create", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Object> createEtablissement(@RequestBody Etablissement etablissement) {
        etablissementRepository.save(etablissement);
        return ResponseHandler.generateResponse("Etablissement created successfully", HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getEtablissementById(@PathVariable("id") Long id) {
        Optional<Etablissement> optionalEtablissement = etablissementRepository.findById(id);
        if (optionalEtablissement.isPresent()) {
            return ResponseHandler.generateResponse("Etablissement found successfully", HttpStatus.OK);
        } else {
            return ResponseHandler.generateResponse("Etablissement not found", HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteEtablissement(@PathVariable("id") Long id) {
        etablissementRepository.deleteById(id);
        return ResponseHandler.generateResponse("Etablissement deleted successfully", HttpStatus.OK);
    }
}
