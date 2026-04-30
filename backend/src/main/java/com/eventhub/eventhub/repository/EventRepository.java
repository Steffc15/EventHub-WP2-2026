package com.eventhub.eventhub.repository;

import com.eventhub.eventhub.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepository extends JpaRepository<Event, Long> {
}