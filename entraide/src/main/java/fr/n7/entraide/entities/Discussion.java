package fr.n7.entraide.entities;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
public class Discussion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idDiscussion;
    private LocalDate dateCreation;
    private String sujet;

    @ManyToOne
    @JoinColumn(name = "idUser")
    @JsonIgnoreProperties("discussionsCrees")
    private User user;

    @OneToMany(mappedBy = "discussion")
    @JsonManagedReference
    private List<Message> messages = new ArrayList<>();

    public Discussion() {
    }

    public Discussion(long idDiscussion, String sujet, LocalDate dateCreation) {
        this.idDiscussion = idDiscussion;
        this.sujet = sujet;
        this.dateCreation = dateCreation;
    }

    public long getIdDiscussion() {
        return idDiscussion;
    }

    public String getSujet() {
        return sujet;
    }

    public void setSujet(String sujet) {
        this.sujet = sujet;
    }

    public LocalDate getDateCreation() {
        return dateCreation;
    }

    public void setDateCreation(LocalDate dateCreation) {
        this.dateCreation = dateCreation;
    }

    public void addMessage(Message message) {
        this.messages.add(message);
    }

    public List<Message> getMessages() {
        return messages;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public String toString() {
        return "Discussion{" +
                "idDiscussion=" + idDiscussion +
                ", sujet='" + sujet + '\'' +
                ", dateCreation=" + dateCreation +
                ", messages=" + messages +
                '}';
    }

}
