package fr.n7.entraide.entities;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;

@Entity
public class Evenement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idEvenement;
    private boolean isOnline;
    private LocalDate dateDebut;
    private LocalDate dateFin;
    private Theme theme;
    private float prixNormal;
    private float prixAdherent;
    private String nom;
    private String description;

    @ManyToOne
    Adresse adresse;

    @ManyToMany
    List<User> utilisateurs;

    public Evenement() {
    }

    public Evenement(long idEvenement) {
        this.idEvenement = idEvenement;
    }

    public Evenement(long idEvenement, String nom, boolean isOnline, LocalDate dateDebut, LocalDate dateFin, Theme theme,
                     float prixNormal, float prixAdherent, String description, Adresse adresse, List<User> utilisateurs) {
        this.idEvenement = idEvenement;
        this.nom = nom;
        this.isOnline = isOnline;
        this.dateDebut = dateDebut;
        this.dateFin = dateFin;
        this.theme = theme;
        this.prixNormal = prixNormal;
        this.prixAdherent = prixAdherent;
        this.description = description;
        this.adresse = adresse;
        this.utilisateurs = utilisateurs;

    }

    public long getIdEvenement() {
        return idEvenement;
    }

    public void setIdEvenement(long idEvenement) {
        this.idEvenement = idEvenement;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public boolean isOnline() {
        return isOnline;
    }

    public void setOnline(boolean online) {
        isOnline = online;
    }

    public LocalDate getDateDebut() {
        return dateDebut;
    }

    public void setDateDebut(LocalDate dateDebut) {
        this.dateDebut = dateDebut;
    }

    public LocalDate getDateFin() {
        return dateFin;
    }

    public void setDateFin(LocalDate dateFin) {
        this.dateFin = dateFin;
    }

    public Theme getTheme() {
        return theme;
    }

    public void setTheme(Theme theme) {
        this.theme = theme;
    }

    public float getPrixNormal() {
        return prixNormal;
    }

    public void setPrixNormal(float prixNormal) {
        this.prixNormal = prixNormal;
    }

    public float getPrixAdherent() {
        return prixAdherent;
    }

    public void setPrixAdherent(float prixAdherent) {
        this.prixAdherent = prixAdherent;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Adresse getAdresse() {
        return adresse;
    }

    public void setAdresse(Adresse adresse) {
        this.adresse = adresse;
    }

    public List<User> getUtilisateurs() {
        return utilisateurs;
    }

    public void setUtilisateurs(List<User> utilisateurs) {
        this.utilisateurs = utilisateurs;
    }

}
