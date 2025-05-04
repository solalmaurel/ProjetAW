package fr.n7.entraide.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import fr.n7.entraide.entities.Evenement;

public interface EvenementRepository extends JpaRepository<Evenement, Long> {
}