import React from 'react';
import './Events.css';

const Events = () => {
  return (
    <div className="events-page">
      <div className="events-container">
        <h1 className="events-title">Explore Events</h1>

        <div className="filters">
          <input
            type="text"
            className="filter-item search"
            placeholder="Search event..."
          />

          <button className="search-btn">Search</button>

          <select className="filter-item">
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
          />
          <input type="date" className="filter-item" />
        </div>

        <div className="events-grid">
          <div className="event-card">
            <img className="event-image" src="/logo192.png" alt="event" />

            <div className="event-info">
              <h3>City Charity Marathon</h3>

              <p className="event-location">
                Miami, FL <br></br> June 20, 2026
              </p>

              <p className="event-seats">
                Available Seats: <strong>100</strong>
              </p>

              <div className="event-actions">
                <button className="btn details">Details</button>
                <button className="btn book">Book Now</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;
