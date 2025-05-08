package fr.n7.entraide.entities;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idUser;
    private String nom;
    private String prenom;
    private String email;
    private String password;
    private boolean isAdmin;
    private int anneeDiplome;
    private TypeEtude typeEtude;
    private boolean isAdherent;
    private LocalDate dateCotisation;
    private boolean notifOffre;
    private boolean notifEvenement;

    @ManyToMany
    @JoinTable(name = "aEcrit", joinColumns = @JoinColumn(name = "idUser"), inverseJoinColumns = @JoinColumn(name = "idMessage"))
    private List<Message> messages;

    @ManyToMany
    @JoinTable(name = "aCree", joinColumns = @JoinColumn(name = "idUser"), inverseJoinColumns = @JoinColumn(name = "idDiscussion"))
    private List<Discussion> discussionsCrees;

    @ManyToMany
    @JsonIgnore
    @JoinTable(name = "participe", joinColumns = @JoinColumn(name = "idUser"), inverseJoinColumns = @JoinColumn(name = "idEvenement"))
    private List<Evenement> evenements;

    @ManyToMany
    @JoinTable(name = "estAbonne", joinColumns = @JoinColumn(name = "idUser"), inverseJoinColumns = @JoinColumn(name = "idDiscussion"))
    private List<Discussion> discussionsAbonnes;

    @ManyToOne
    @JoinColumn(name = "idEtablissement")
    private Etablissement etablissement;

    public User() {}

    public User(Long idUser) {
        this.idUser = idUser;
    }

    public User(String nom, String prenom, String email, String password, boolean isAdmin,
                int anneeDiplome, TypeEtude typeEtude, boolean isAdherent, LocalDate dateCotisation, boolean notifOffre,
                boolean notifEvenement) {
        this(0, nom, prenom, email, password, isAdmin, anneeDiplome, typeEtude, isAdherent, dateCotisation, notifOffre, notifEvenement);
    }

    public User(long idUser, String nom, String prenom, String email, String password, boolean isAdmin,
                int anneeDiplome, TypeEtude typeEtude, boolean isAdherent, LocalDate dateCotisation, boolean notifOffre,
                boolean notifEvenement) {
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
    }

    public long getIdUser() {
        return idUser;
    }

    public void setIdUser(long idUser) {
        this.idUser = idUser;
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

    public List<Evenement> getEvenements() {
        return evenements;
    }

    public void setEvenements(List<Evenement> evenements) {
        this.evenements = evenements;
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

    public TypeEtude getTypeEtude() {
        return typeEtude;
    }

    public void setTypeEtude(TypeEtude typeEtude) {
        this.typeEtude = typeEtude;
    }

    public boolean isAdherent() {
        return isAdherent;
    }

    public void setAdherent(boolean isAdherent) {
        this.isAdherent = isAdherent;
    }

    public LocalDate getDateCotisation() {
        return dateCotisation;
    }

    public void setDateCotisation(LocalDate dateCotisation) {
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

    @Override
    public String toString() {
        return "User{" +
                "idUser=" + idUser +
                ", nom='" + nom + '\'' +
                ", prenom='" + prenom + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", isAdmin=" + isAdmin +
                ", anneeDiplome=" + anneeDiplome +
                ", typeEtude='" + typeEtude + '\'' +
                ", isAdherent=" + isAdherent +
                ", dateCotisation=" + dateCotisation +
                ", notifOffre=" + notifOffre +
                ", notifEvenement=" + notifEvenement +
                '}';
    }


}