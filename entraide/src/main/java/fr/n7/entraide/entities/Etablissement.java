package fr.n7.entraide.entities;

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
    private long idEtablissement;
    private String nom;

    @OneToMany(mappedBy = "etablissement")
    private List<User> users;

    // @OneToOne
    // @JoinColumn(name = "idAdresse")
    // private Adresse adresse;

    public Etablissement() {
    }

    public Etablissement(long idEtablissement) {
        this.idEtablissement = idEtablissement;
    }

    public Etablissement(long idEtablissement, String nom, List<User> users) {
        this.idEtablissement = idEtablissement;
        this.nom = nom;
        this.users = users;
    }

    public long getIdEtablissement() {
        return idEtablissement;
    }

    public void setIdEtablissement(long idEtablissement) {
        this.idEtablissement = idEtablissement;
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

    // public Adresse getAdresse() {
    //     return adresse;
    // }

    // public void setAdresse(Adresse adresse) {
    //     this.adresse = adresse;
    // }

}
