import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-card">
        <h1>Find Your Next Event</h1>
        <p>Discover and reserve seats for concerts, workshops and more.</p>

        <button className="home-btn" onClick={() => navigate('/events')}>
          Browse Events
        </button>
      </div>
    </div>
  );
};

export default Home;
