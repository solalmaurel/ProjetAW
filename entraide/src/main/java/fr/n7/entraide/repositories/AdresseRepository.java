package fr.n7.entraide.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import fr.n7.entraide.entities.Adresse;

public interface AdresseRepository extends JpaRepository<Adresse, Long> {
}