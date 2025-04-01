package com.entraide.entraide;

import java.sql.Date;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.*;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    final Long idUser;
    private String nom;
    private String prenom;
    private String email;
    private String password;
    private boolean isAdmin;
    private int anneeDiplome;
    private String typeEtude;
    private boolean isAdherent;
    private DateTimeFormat dateCotisation;
    private boolean notifOffre;
    private boolean notifEvenement;

    @OneToMany(mappedBy = "user")
    private List<Message> messages;

    @OneToMany(mappedBy = "user")
    private List<Discussion> discussionsCrees;

    @ManyToMany
    @JoinTable(name = "participe",
            joinColumns = @JoinColumn(name = "idUser"),
            inverseJoinColumns = @JoinColumn(name = "idEvenement"))
    private List<Evenement> evenements;

    @ManyToMany
    @JoinTable(name = "estAbonne",
            joinColumns = @JoinColumn(name = "idUser"),
            inverseJoinColumns = @JoinColumn(name = "idDiscussion"))
    private List<Discussion> discussionsAbonnes;

    @ManyToOne
    @JoinColumn(name = "idEtablissement")
    private Etablissement etablissement;

    public User(Long idUser) {
        this.idUser = idUser;
    }

    public User(Long idUser, String nom, String prenom, String email, String password, boolean isAdmin,
            int anneeDiplome, String typeEtude, boolean isAdherent, DateTimeFormat dateCotisation, boolean notifOffre,
            boolean notifEvenement, List<Message> messages, List<Discussion> discussionsCrees,
            List<Evenement> evenements, List<Discussion> discussionsAbonnes, Etablissement etablissement) {
        this.idUser = idUser;
        this.nom = nom;
        this.prenom = prenom;
        this.email = email;
        this.password = password;
        this.isAdmin = isAdmin;
        this.anneeDiplome = anneeDiplome;
        this.typeEtude = typeEtude;
        this.isAdherent = isAdherent;
        this.dateCotisation = dateCotisation;
        this.notifOffre = notifOffre;
        this.notifEvenement = notifEvenement;
        this.messages = messages;
        this.discussionsCrees = discussionsCrees;
        this.evenements = evenements;
        this.discussionsAbonnes = discussionsAbonnes;
        this.etablissement = etablissement;
    }

    public Long getIdUser() {
        return idUser;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean isAdmin() {
        return isAdmin;
    }

    public void setAdmin(boolean isAdmin) {
        this.isAdmin = isAdmin;
    }

    public int getAnneeDiplome() {
        return anneeDiplome;
    }

    public void setAnneeDiplome(int anneeDiplome) {
        this.anneeDiplome = anneeDiplome;
    }

    public String getTypeEtude() {
        return typeEtude;
    }

    public void setTypeEtude(String typeEtude) {
        this.typeEtude = typeEtude;
    }

    public boolean isAdherent() {
        return isAdherent;
    }

    public void setAdherent(boolean isAdherent) {
        this.isAdherent = isAdherent;
    }

    public DateTimeFormat getDateCotisation() {
        return dateCotisation;
    }

    public void setDateCotisation(DateTimeFormat dateCotisation) {
        this.dateCotisation = dateCotisation;
    }

    public boolean isNotifOffre() {
        return notifOffre;
    }

    public void setNotifOffre(boolean notifOffre) {
        this.notifOffre = notifOffre;
    }

    public boolean isNotifEvenement() {
        return notifEvenement;
    }

    public void setNotifEvenement(boolean notifEvenement) {
        this.notifEvenement = notifEvenement;
    }

    public List<Message> getMessages() {
        return messages;
    }

    public void setMessages(List<Message> messages) {
        this.messages = messages;
    }

    public List<Discussion> getDiscussionsCrees() {
        return discussionsCrees;
    }

    public void setDiscussionsCrees(List<Discussion> discussionsCrees) {
        this.discussionsCrees = discussionsCrees;
    }

    public List<Evenement> getEvenements() {
        return evenements;
    }

    public void setEvenements(List<Evenement> evenements) {
        this.evenements = evenements;
    }

    public List<Discussion> getDiscussionsAbonnes() {
        return discussionsAbonnes;
    }

    public void setDiscussionsAbonnes(List<Discussion> discussionsAbonnes) {
        this.discussionsAbonnes = discussionsAbonnes;
    }

    public Etablissement getEtablissement() {
        return etablissement;
    }

    public void setEtablissement(Etablissement etablissement) {
        this.etablissement = etablissement;
    }



}