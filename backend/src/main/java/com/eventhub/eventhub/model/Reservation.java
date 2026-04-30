package com.eventhub.eventhub.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "reservations")
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="user_id")
    private Long userId;

    @Column(name="event_id")
    private Long eventId;

    private Integer seats = 1;

    @Column(name="created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    public Reservation() {}

    public Reservation(Long userId, Long eventId, Integer seats) {
        this.userId = userId;
        this.eventId = eventId;
        this.seats = seats;
    }

    public Long getId() { return id; }
    public Long getUserId() { return userId; }
    public Long getEventId() { return eventId; }
    public Integer getSeats() { return seats; }
    public LocalDateTime getCreatedAt() { return createdAt; }

    public void setId(Long id) { this.id = id; }
    public void setUserId(Long userId) { this.userId = userId; }
    public void setEventId(Long eventId) { this.eventId = eventId; }
    public void setSeats(Integer seats) { this.seats = seats; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}