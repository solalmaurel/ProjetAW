package com.entraide.model;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;

@Entity
public class Adresse {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idAdresse;
    private String numero;
    private String complement;
    private String rue;
    private String codePostal;
    private String ville;

    @OneToOne
    @JoinColumn(name = "idEtablissement")
    private Etablissement etablissement;

    @OneToMany(mappedBy = "adresse")
    private List<Evenement> evenements;






}
