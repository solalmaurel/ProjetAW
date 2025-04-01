package com.entraide.model;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;

@Entity
public class Etablissement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idEtablissement;
    public Etablissement(Long idEtablissement) {
        this.idEtablissement = idEtablissement;
    }

    private String nom;

    @OneToMany(mappedBy = "etablissement")
    private List<User> users;

    @OneToOne
    @JoinColumn(name = "idAdresse")
    private Adresse adresse;


     public Etablissement(Long idEtablissement, String nom, List<User> users, Adresse adresse) {
        this.idEtablissement = idEtablissement;
        this.nom = nom;
        this.users = users;
        this.adresse = adresse;
    }

     public Long getIdEtablissemnt() {
         return idEtablissement;
     }

     public String getNom() {
         return nom;
     }

     public void setNom(String nom) {
         this.nom = nom;
     }

     public List<User> getUsers() {
         return users;
     }

     public void setUsers(List<User> users) {
         this.users = users;
     }

     public Adresse getAdresse() {
         return adresse;
     }

     public void setAdresse(Adresse adresse) {
         this.adresse = adresse;
     }

     public Long getIdEtablissement() {
         return idEtablissement;
     }

     public void setIdEtablissement(Long idEtablissement) {
         this.idEtablissement = idEtablissement;
     }
}
