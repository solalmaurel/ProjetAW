package com.entraide.model;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity
public class Entreprise {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idEntreprise;
    private String nom;
    
    @ManyToOne
    @JoinColumn(name = "idAdresse")
    private Adresse adresse;
    
    @OneToMany(mappedBy = "entreprise")
    private List<Offre> offres;

    public Entreprise(Long idEntreprise) {
        this.idEntreprise = idEntreprise;
    }

    public Entreprise(Long idEntreprise, String nom, Adresse adresse, List<Offre> offres) {
        this.idEntreprise = idEntreprise;
        this.nom = nom;
        this.adresse = adresse;
        this.offres = offres;
    }

    public Long getIdEntreprise() {
        return idEntreprise;
    }

    public void setIdEntreprise(Long idEntreprise) {
        this.idEntreprise = idEntreprise;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public Adresse getAdresse() {
        return adresse;
    }

    public void setAdresse(Adresse adresse) {
        this.adresse = adresse;
    }

    public List<Offre> getOffres() {
        return offres;
    }

    public void setOffres(List<Offre> offres) {
        this.offres = offres;
    }
}
