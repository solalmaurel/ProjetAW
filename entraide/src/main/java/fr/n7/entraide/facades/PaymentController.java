package fr.n7.entraide.facades;

import fr.n7.entraide.entities.Facture;
import fr.n7.entraide.entities.User;
import fr.n7.entraide.repositories.FactureRepository;
import fr.n7.entraide.repositories.UserRepository;
import fr.n7.entraide.utils.MailSender;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/payment")
public class PaymentController {

    @Autowired
    FactureRepository factureRepository;
    @Autowired
    UserRepository userRepository;

    @PostMapping("/create")
    public ResponseEntity<Object> createFacture(@RequestBody Facture facture) {
        factureRepository.save(facture);
        System.out.println(facture.getUser());
        MailSender.sendInvoiceMail(facture.getUser(), facture);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @GetMapping("/{idUser}/history")
    public ResponseEntity<List<Facture>> getHistoryByUser(@PathVariable Long idUser) {
        User user = userRepository.findById(idUser).get();
        List<Facture> factures = factureRepository.findFacturesByUserOrderByDateFactureAsc(user);
        return ResponseEntity.ok(factures);
    }

}
