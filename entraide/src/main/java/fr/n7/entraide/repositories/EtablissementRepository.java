package fr.n7.entraide.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import fr.n7.entraide.entities.Etablissement;

public interface EtablissementRepository extends JpaRepository<Etablissement, Long> {
}