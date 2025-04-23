package com.entraide.entraide;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.entraide.model.Offre;

@RestController
@RequestMapping("/api/offre")
public class OffreController {
    @Autowired
    private OffreRepository offreRepository;

    @GetMapping
    public List<Offre> getAllOffres() {
        return offreRepository.findAll();
    }

    @PostMapping
    public Offre createOffre(@RequestBody Offre offre) {
        return offreRepository.save(offre);
    }
}