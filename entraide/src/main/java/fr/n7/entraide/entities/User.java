package fr.n7.entraide.entities;

import java.sql.Date;

import jakarta.persistence.*;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idUser;
    private String nom;
    private String prenom;
    private String email;
    private String password;
    private boolean isAdmin;
    private int anneeDiplome;
    private String typeEtude;
    private boolean isAdherent;
    private Date dateCotisation;
    private boolean notifOffre;
    private boolean notifEvenement;

    public User() {}

    public User(String nom, String prenom, String email, String password, boolean isAdmin,
            int anneeDiplome, String typeEtude, boolean isAdherent, Date dateCotisation, boolean notifOffre,
            boolean notifEvenement) {
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

    public Date getDateCotisation() {
        return dateCotisation;
    }

    public void setDateCotisation(Date dateCotisation) {
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