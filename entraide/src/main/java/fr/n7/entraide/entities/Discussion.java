package fr.n7.entraide.entities;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Discussion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idDiscussion;
    private LocalDate dateCreation;
    private String sujet;
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

    public LocalDate getDateCreation() {
        return dateCreation;
    }

    public void addMessage(Message message) {
        this.messages.add(message);
    }

    public List<Message> getMessages() {
        return messages;
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
