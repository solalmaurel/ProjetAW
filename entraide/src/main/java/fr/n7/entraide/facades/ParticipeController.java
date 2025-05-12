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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import fr.n7.entraide.entities.Adresse;
import fr.n7.entraide.entities.Evenement;
import fr.n7.entraide.entities.Offre;
import fr.n7.entraide.repositories.EvenementRepository;
import fr.n7.entraide.entities.User;
import fr.n7.entraide.repositories.UserRepository;
import fr.n7.entraide.utils.ResponseHandler;

@RestController
@RequestMapping("/participe")
public class ParticipeController {

    @Autowired
    private EvenementRepository evenementRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping(produces=MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Object> participer(@RequestParam Long idEvenement, @RequestParam Long idUser) {

        System.out.println("Participating with eventId: " + idEvenement + " and userId: " + idUser);

        User user = userRepository.findById(idUser).get();
        Evenement evenement = evenementRepository.findById(idEvenement).get();

        if (evenement.getUtilisateurs().contains(user)){
            return ResponseHandler.generateResponse("User is already participating to this event", HttpStatus.OK);
        }
        evenement.getUtilisateurs().add(user);
        user.getEvenements().add(evenement);
        evenementRepository.save(evenement);
        userRepository.save(user);
        return ResponseHandler.generateResponse("User is participating to the event successfully", HttpStatus.OK);
    }

    @GetMapping("/evenement/{id}/participants")
    public ResponseEntity<Object> getParticipants(@PathVariable Long id) {
        Optional<Evenement> evenementOpt = evenementRepository.findById(id);
        if (evenementOpt.isPresent()) {
            List<User> participants = evenementOpt.get().getUtilisateurs();
            return ResponseEntity.ok(participants);
        }else {
            return ResponseHandler.generateResponse("Event not found", HttpStatus.OK);
        }
    }
}  