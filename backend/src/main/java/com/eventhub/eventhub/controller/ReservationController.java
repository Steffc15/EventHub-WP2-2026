package com.eventhub.eventhub.controller;

import com.eventhub.eventhub.dto.CreateReservationRequest;
import com.eventhub.eventhub.model.Event;
import com.eventhub.eventhub.model.Reservation;
import com.eventhub.eventhub.repository.EventRepository;
import com.eventhub.eventhub.repository.ReservationRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reservations")
@CrossOrigin(origins = "http://localhost:3000")
public class ReservationController {

    private final ReservationRepository reservationRepository;
    private final EventRepository eventRepository;

    public ReservationController(
            ReservationRepository reservationRepository,
            EventRepository eventRepository
    ) {
        this.reservationRepository = reservationRepository;
        this.eventRepository = eventRepository;
    }

    @GetMapping("/user/{userId}")
    public List<Reservation> getUserReservations(@PathVariable Long userId) {
        return reservationRepository.findByUserId(userId);
    }

    @PostMapping
    public ResponseEntity<?> createReservation(@RequestBody CreateReservationRequest request) {
        Event event = eventRepository.findById(request.eventId).orElse(null);

        if (event == null) {
            return ResponseEntity.badRequest().body("Event not found");
        }

        int requestedSeats = request.seats == null ? 1 : request.seats;

        if (event.getAvailableSeats() < requestedSeats) {
            return ResponseEntity.badRequest().body("Not enough seats available");
        }

        event.setAvailableSeats(event.getAvailableSeats() - requestedSeats);
        eventRepository.save(event);

        Reservation reservation = new Reservation(
                request.userId,
                request.eventId,
                requestedSeats
        );

        Reservation savedReservation = reservationRepository.save(reservation);

        return ResponseEntity.ok(savedReservation);
    }

    @DeleteMapping("/{reservationId}")
    public ResponseEntity<?> deleteReservation(@PathVariable Long reservationId) {
        Reservation reservation = reservationRepository.findById(reservationId).orElse(null);

        if (reservation == null) {
            return ResponseEntity.notFound().build();
        }

        Event event = eventRepository.findById(reservation.getEventId()).orElse(null);

        if (event != null) {
            event.setAvailableSeats(event.getAvailableSeats() + reservation.getSeats());
            eventRepository.save(event);
        }

        reservationRepository.delete(reservation);

        return ResponseEntity.ok("Reservation cancelled");
    }
}