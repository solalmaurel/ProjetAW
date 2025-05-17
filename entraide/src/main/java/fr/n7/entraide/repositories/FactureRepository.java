package fr.n7.entraide.repositories;

import fr.n7.entraide.entities.Facture;
import fr.n7.entraide.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FactureRepository extends JpaRepository<Facture, Long> {

    List<Facture> findFacturesByUserOrderByDateFactureAsc(User user);

    /**
     * Méthodes héritées de Jpa
     */
    // Facture save(User u);
    // Optional<Facture> findById(Long id);
    // Collection<Facture> findAll();
    // void delete(Facture u);
    // long count();
    // ...

}
