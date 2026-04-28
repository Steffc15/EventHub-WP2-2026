import React from 'react';
import './Reservations.css';

const Reservations = () => {
  const reservations = [];
  return (
    <div className="res-page">
      <div className="res-container">
        <h1 className="res-text">My Reservations</h1>
        <p className="text1">View and manage your event bookings</p>

        {reservations.length === 0 ? (
          <div className="empty-state">No bookings found.</div>
        ) : (
          <div className="res-list">
            {reservations.map((event) => (
              <div key={event.id} className="res-card">
                <img src={event.image} alt="event" />

                <div className="res-info">
                  <h3>{event.title}</h3>
                  <p>
                    {event.location} <br></br> {event.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Reservations;
