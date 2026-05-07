import React, { useEffect, useMemo, useState } from 'react';
import './Events.css';
import { toast } from 'react-toastify';
const formatDate = (dateString) => {
  if (!dateString) return '';

  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
};

const formatPrice = (price) => {
  if (price === null || price === undefined) return '0.00';
  return Number(price).toFixed(2);
};

const Events = () => {
  const [events, setEvents] = useState([]);

  const [searchText, setSearchText] = useState('');
  const [category, setCategory] = useState('Category');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');

  const [activeSearch, setActiveSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('Category');
  const [activeLocation, setActiveLocation] = useState('');
  const [activeDate, setActiveDate] = useState('');

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8080/api/events')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Could not load events');
        }
        return res.json();
      })
      .then((data) => {
        setEvents(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error loading events:', err);
        setLoading(false);
      });
  }, []);

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesSearch =
        activeSearch.trim() === '' ||
        event.title.toLowerCase().includes(activeSearch.toLowerCase());

      const matchesCategory =
        activeCategory === 'Category' || event.category === activeCategory;

      const matchesLocation =
        activeLocation.trim() === '' ||
        event.location.toLowerCase().includes(activeLocation.toLowerCase());

      const matchesDate = activeDate === '' || event.eventDate === activeDate;

      return matchesSearch && matchesCategory && matchesLocation && matchesDate;
    });
  }, [events, activeSearch, activeCategory, activeLocation, activeDate]);

  const handleSearch = () => {
    setActiveSearch(searchText);
    setActiveCategory(category);
    setActiveLocation(location);
    setActiveDate(date);
  };

  const handleClearFilters = () => {
    setSearchText('');
    setCategory('Category');
    setLocation('');
    setDate('');

    setActiveSearch('');
    setActiveCategory('Category');
    setActiveLocation('');
    setActiveDate('');
  };

  const handleBookNow = async (eventId) => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user || !user.id) {
      toast.warning('You must be logged in.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          eventId: eventId,
          seats: 1,
        }),
      });

      const text = await response.text();

      if (!response.ok) {
        toast.error(text);
        return;
      }

      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === eventId
            ? { ...event, availableSeats: event.availableSeats - 1 }
            : event
        )
      );

      toast.success('Reservation created successfully!');
    } catch (error) {
      console.error('Book now error:', error);
      toast.error('Cannot connect to backend.');
    }
  };

  return (
    <div className="events-page">
      <div className="events-container">
        <h1 className="events-title">Explore Events</h1>

        <div className="filters">
          <input
            type="text"
            className="filter-item search"
            placeholder="Search event..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSearch();
            }}
          />

          <select
            className="filter-item"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Category</option>
            <option>Music</option>
            <option>Sports</option>
            <option>Tech</option>
            <option>Art</option>
            <option>Fun</option>
          </select>

          <input
            type="text"
            className="filter-item"
            placeholder="Location..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <input
            type="date"
            className="filter-item"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <button className="search-btn" onClick={handleSearch}>
            Search
          </button>

          <button className="search-btn" onClick={handleClearFilters}>
            Show events
          </button>
        </div>

        <div className="events-grid">
          {loading ? (
            <p className="no-events">Loading events...</p>
          ) : filteredEvents.length === 0 ? (
            <p className="no-events">No events found.</p>
          ) : (
            filteredEvents.map((event) => (
              <div className="event-card" key={event.id}>
                <img
                  className="event-image"
                  src={event.image || '/logo192.png'}
                  alt={event.title}
                />

                <div className="event-info">
                  <h3>{event.title}</h3>

                  <p className="event-location">
                    {event.location} <br /> {formatDate(event.eventDate)}
                  </p>

                  <p className="event-seats">
                    Available Seats: <strong>{event.availableSeats}</strong>
                  </p>

                  <p className="event-price">
                    Price: <strong>${formatPrice(event.price)}</strong>
                  </p>

                  <div className="event-actions">
                    <button
                      className="btn details"
                      onClick={() => setSelectedEvent(event)}
                    >
                      Details
                    </button>

                    <button
                      className="btn book"
                      onClick={() => handleBookNow(event.id)}
                      disabled={event.availableSeats === 0}
                    >
                      {event.availableSeats === 0 ? 'Sold Out' : 'Book Now'}
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {selectedEvent && (
          <div className="modal-overlay" onClick={() => setSelectedEvent(null)}>
            <div className="modal-card" onClick={(e) => e.stopPropagation()}>
              <h2>{selectedEvent.title}</h2>

              <p>
                <strong>Category:</strong> {selectedEvent.category}
              </p>

              <p>
                <strong>Location:</strong> {selectedEvent.location}
              </p>

              <p>
                <strong>Date:</strong> {formatDate(selectedEvent.eventDate)}
              </p>

              <p>
                <strong>Available Seats:</strong> {selectedEvent.availableSeats}
              </p>

              <p>
                <strong>Price:</strong> ${formatPrice(selectedEvent.price)}
              </p>

              <p>{selectedEvent.description}</p>

              <button
                className="btn book"
                onClick={() => {
                  handleBookNow(selectedEvent.id);
                  setSelectedEvent(null);
                }}
                disabled={selectedEvent.availableSeats === 0}
              >
                {selectedEvent.availableSeats === 0 ? 'Sold Out' : 'Book Now'}
              </button>

              <button
                className="btn details"
                onClick={() => setSelectedEvent(null)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;