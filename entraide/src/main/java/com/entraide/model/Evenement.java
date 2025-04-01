package com.entraide.model;

import jakarta.persistence.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.sql.Date;
import java.util.List;

@Entity
public class Evenement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private final Long idEvenement;
    private boolean isOnline;
    private Date dateDebut;
    private Date dateFin;
    private Theme theme;
    private float prixNormal;
    private float prixAdherent;
    private String description;

    @OneToMany
    Adresse adresse;

    @ManyToMany
    List<User> utilisateurs;

    public Evenement(Long idEvenement) {

        this.idEvenement = idEvenement;
    }

    public void setAdresse(Adresse adresse) {
        this.adresse = adresse;
    }

    public void addUtilisateur(User user) {
        this.utilisateurs = user;
    }


    public Long getIdEvenement() {
        return idEvenement;
    }

    public boolean isOnline() {
        return isOnline;
    }

    public void setOnline(boolean online) {
        isOnline = online;
    }

    public DateTimeFormat getDateDebut() {
        return dateDebut;
    }

    public void setDateDebut(DateTimeFormat dateDebut) {
        this.dateDebut = dateDebut;
    }

    public DateTimeFormat getDateFin() {
        return dateFin;
    }

    public void setDateFin(DateTimeFormat dateFin) {
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

    public List<User> getUtilisateurs() {
        return utilisateurs;
    }
}
