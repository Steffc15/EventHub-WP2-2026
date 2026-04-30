package com.eventhub.eventhub.model;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.math.BigDecimal;

@Entity
@Table(name = "events")
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String category;

    private String location;

    @Column(name = "event_date")
    private LocalDate eventDate;

    @Column(name = "available_seats")
    private Integer availableSeats;

    private BigDecimal price;

    private String image;

    @Column(columnDefinition = "TEXT")
    private String description;

    public Event() {}

    public Event(String title, String category, String location, LocalDate eventDate, Integer availableSeats, BigDecimal price, String image, String description) {
        this.title = title;
        this.category = category;
        this.location = location;
        this.eventDate = eventDate;
        this.availableSeats = availableSeats;
        this.price = price;
        this.image = image;
        this.description = description;
    }

    public Long getId() { return id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public LocalDate getEventDate() { return eventDate; }
    public void setEventDate(LocalDate eventDate) { this.eventDate = eventDate; }

    public Integer getAvailableSeats() { return availableSeats; }
    public void setAvailableSeats(Integer availableSeats) { this.availableSeats = availableSeats; }

    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }

    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}