package com.entraide.entraide;

import org.springframework.data.jpa.repository.JpaRepository;
import com.entraide.model.Offre;

public interface OffreRepository extends JpaRepository<Offre, Long> {
}