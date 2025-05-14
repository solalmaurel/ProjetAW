package fr.n7.entraide.entities;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idMessage;
    private LocalDate date;
    private String message;

    @ManyToOne
    @JoinColumn(name = "idUser")
    @JsonIgnoreProperties({"messages", "discussionsCrees", "evenements", "discussionsAbonnes", "etablissement", "password", "email"})
    private User user;

    @ManyToOne
    @JoinColumn(name="idDiscussion")
    @JsonBackReference
    private Discussion discussion;

    public Message() {
    }

    public Message(long idMessage, LocalDate date, String message) {
        this.idMessage = idMessage;
        this.date = date;
        this.message = message;
    }

    public long getIdMessage() {
        return idMessage;
    }

    public void setIdMessage(long idMessage) {
        this.idMessage = idMessage;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Discussion getDiscussion() {
        return discussion;
    }
    public void setDiscussion(Discussion discussion) {
        this.discussion = discussion;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

}
