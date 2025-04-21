package fr.n7.entraide.entities;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.*;

@Entity
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idMessage;
    private LocalDate date;
    private List<String> message = new ArrayList<>();

    public Message() {
    }

    public Message(int idMessage, List<String> message, LocalDate date) {
        this.idMessage = idMessage;
        this.message = message;
        this.date = date;
    }

    public long getId() {
        return idMessage;
    }

    public List<String> getMessage() {
        return message;
    }

    public LocalDate getDate() {
        return date;
    }

    @Override
    public String toString() {
        return "(" + date + ") : " + String.join(" ", message);
    }

}
