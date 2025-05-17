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
    @JsonIgnoreProperties({"messages", "discussionsCrees", "evenements", "discussionsAbonnes", "etablissement", "password", "email"})
    private User user;

    private TypeFacture typeFacture;
    private long idObject; // correspond à l'id d'un événement ou autre...
    private double pricePaid;
    private LocalDate dateFacture;

    public Facture() {
    }

    public Facture(Long idFacture) {
        this.idFacture = idFacture;
    }

    public Facture(long idFacture, User user, TypeFacture typeFacture, long idObject, double pricePaid, LocalDate dateFacture) {
        this.idFacture = idFacture;
        this.user = user;
        this.typeFacture = typeFacture;
        this.idObject = idObject;
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

    public long getIdObject() {
        return idObject;
    }

    public void setIdObject(long idObject) {
        this.idObject = idObject;
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
                ", idObject=" + idObject +
                ", pricePaid=" + pricePaid +
                ", dateFacture=" + dateFacture +
                '}';
    }

}