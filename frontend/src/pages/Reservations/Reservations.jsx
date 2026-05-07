import React, { useEffect, useState } from 'react';
import './Reservations.css';
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

const Reservations = () => {
  const [reservations, setReservations] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    Promise.all([
      fetch(`http://localhost:8080/api/reservations/user/${user.id}`).then((res) =>
        res.json()
      ),
      fetch('http://localhost:8080/api/events').then((res) => res.json()),
    ])
      .then(([reservationsData, eventsData]) => {
        setReservations(reservationsData);
        setEvents(eventsData);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const handleCancel = async (reservationId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/reservations/${reservationId}`,
        {
          method: 'DELETE',
        }
      );

      if (!response.ok) {
        alert('Nu s-a putut anula rezervarea.');
        return;
      }

      setReservations((prev) =>
        prev.filter((reservation) => reservation.id !== reservationId)
      );

      toast.success('Reservation cancelled successfully!');
    } catch (error) {
      console.error(error);
      toast.error('Server error.');
    }
  };

  const getEventById = (eventId) => {
    return events.find((event) => event.id === eventId);
  };

  if (!user) {
    return (
      <div className="res-page">
        <div className="res-container">
          <h1 className="res-text">My Reservations</h1>
          <p className="text1">Trebuie să fii logat ca să vezi rezervările.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="res-page">
      <div className="res-container">
        <h1 className="res-text">My Reservations</h1>
        <p className="text1">View and manage your event bookings</p>

        {loading ? (
          <div className="empty-state">Loading reservations...</div>
        ) : reservations.length === 0 ? (
          <div className="empty-state">No bookings found.</div>
        ) : (
          <div className="res-list">
            {reservations.map((reservation) => {
              const event = getEventById(reservation.eventId);

              return (
                <div key={reservation.id} className="res-card">
                  <img
                    src={event?.image || '/logo192.png'}
                    alt={event?.title || 'event'}
                  />

                  <div className="res-info">
                    <h3>{event?.title || `Event #${reservation.eventId}`}</h3>

                    <p>
                      {event?.location || 'Unknown location'} <br />
                      {formatDate(event?.eventDate)}
                    </p>

                    <p>
                      <strong>Seats:</strong> {reservation.seats}
                    </p>

                    <p>
                      <strong>Price:</strong> ${formatPrice(event?.price)}
                    </p>

                    <p>
                      <strong>Reserved at:</strong>{' '}
                      {new Date(reservation.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <button
                    className="cancel-btn"
                    onClick={() => handleCancel(reservation.id)}
                  >
                    Cancel
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Reservations;