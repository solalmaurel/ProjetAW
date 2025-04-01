package com.entraide.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import lombok.Data;

@Entity
@Data
@Table(name = "MESSAGE")
public class Message {

    @Column(name = "MESSAGE")
    private List<String> message = new ArrayList<>();

    @Id
    @Column(name ="ID")
    private final int idMessage;

    @Column(name ="DATE")
    private final Date date;


    public Message(int idMessage, List<String> message, Date date) {
        this.idMessage = idMessage;
        this.message = message;
        this.date = date;
    }

    public int getId() {
        return idMessage;
    }

    public List<String> getMessage() {
        return message;
    }

    public Date getDate() {
        return date;
    }

    @Override
    public String toString() {
        return "(" + date + ") : " + String.join(" ", message);
    }
}
