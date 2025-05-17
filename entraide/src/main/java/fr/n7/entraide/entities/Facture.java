package fr.n7.entraide.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
public class Facture {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idFacture;

    @ManyToOne
    @JoinColumn(name = "idUser")
    @JsonIgnoreProperties({"messages", "discussionsCrees", "evenements", "discussionsAbonnes", "etablissement", "password"})
    private User user;

    private TypeFacture typeFacture;
    private String nomFacture; // correspond à un nom de facture
    private double pricePaid;
    private LocalDate dateFacture;

    public Facture() {
    }

    public Facture(Long idFacture) {
        this.idFacture = idFacture;
    }

    public Facture(long idFacture, User user, TypeFacture typeFacture, String nomFacture, double pricePaid, LocalDate dateFacture) {
        this.idFacture = idFacture;
        this.user = user;
        this.typeFacture = typeFacture;
        this.nomFacture = nomFacture;
        this.pricePaid = pricePaid;
        this.dateFacture = dateFacture;
    }

    public long getIdFacture() {
        return idFacture;
    }

    public void setIdFacture(long idFacture) {
        this.idFacture = idFacture;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public TypeFacture getTypeFacture() {
        return typeFacture;
    }

    public void setTypeFacture(TypeFacture typeFacture) {
        this.typeFacture = typeFacture;
    }

    public String getNomFacture() {
        return nomFacture;
    }

    public void setNomFacture(String nomFacture) {
        this.nomFacture = nomFacture;
    }

    public double getPricePaid() {
        return pricePaid;
    }

    public void setPricePaid(double pricePaid) {
        this.pricePaid = pricePaid;
    }

    public LocalDate getDateFacture() {
        return dateFacture;
    }

    public void setDateFacture(LocalDate dateFacture) {
        this.dateFacture = dateFacture;
    }

    @Override
    public String toString() {
        return "Facture{" +
                "idFacture=" + idFacture +
                ", user=" + user +
                ", typeFacture=" + typeFacture +
                ", nomFacture=" + nomFacture +
                ", pricePaid=" + pricePaid +
                ", dateFacture=" + dateFacture +
                '}';
    }

}