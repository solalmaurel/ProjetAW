package com.entraide.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import jakarta.persistence.Entity;

@Entity
public class Discussion {

    private List<Message> messages = new ArrayList<>();
    private final int idDiscussion;
    private final Date dateCreation;
    private final String sujet;

    public Discussion(int idDiscussion, String sujet, Date dateCreation) {
        this.idDiscussion = idDiscussion;
        this.sujet = sujet;
        this.dateCreation = dateCreation;
    }

    public int getIdDiscussion() {
        return idDiscussion;
    }

    public String getSujet() {
        return sujet;
    }

    public Date getDateCreation() {
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
