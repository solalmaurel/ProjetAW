package fr.n7.entraide.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import fr.n7.entraide.entities.Offre;

public interface OffreRepository extends JpaRepository<Offre, Long> {
}