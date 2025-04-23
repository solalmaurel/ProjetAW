package fr.n7.entraide.entities;

<<<<<<< HEAD:entraide/src/main/java/com/entraide/model/Offre.java
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
=======
import jakarta.persistence.*;
>>>>>>> 28f74639c1043981111df9e5bde99f70a6fa0287:entraide/src/main/java/fr/n7/entraide/entities/Offre.java

import java.time.LocalDate;

@Entity
public class Offre {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
<<<<<<< HEAD:entraide/src/main/java/com/entraide/model/Offre.java
    private Long idOffre;
    
=======
    private long idOffre;
>>>>>>> 28f74639c1043981111df9e5bde99f70a6fa0287:entraide/src/main/java/fr/n7/entraide/entities/Offre.java
    private String nom;
    private String lien;

    @Enumerated(EnumType.STRING)
    private TypeOffre typeOffre;

    private String description;
    private LocalDate dateDebut;
    private LocalDate dateFin;

    @ManyToOne
    Entreprise entreprise;

    public Offre() {
    }

    public Offre(long idOffre, String nom, String lien, String typeOffre, String description, LocalDate dateDebut, LocalDate dateFin) {
        this.idOffre = idOffre;
        this.nom = nom;
        this.lien = lien;
        this.typeOffre = typeOffre;
        this.description = description;
        this.dateDebut = dateDebut;
        this.dateFin = dateFin;
    }

    public long getIdOffre() {
        return idOffre;
    }

    public void setIdOffre(long idOffre) {
        this.idOffre = idOffre;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getLien() {
        return lien;
    }

    public void setLien(String lien) {
        this.lien = lien;
    }

    public TypeOffre getTypeOffre() {
        return typeOffre;
    }

    public void setTypeOffre(TypeOffre typeOffre) {
        this.typeOffre = typeOffre;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
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

}
