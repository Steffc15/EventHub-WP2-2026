import React from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Home = () => {
  const navigate = useNavigate();

  const handleBrowseEvents = () => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user || !user.id) {
      toast.warning('You must be logged in to browse events.');
      navigate('/login');
      return;
    }

    navigate('/events');
  };

  return (
    <div className="home-container">
      <div className="home-card">
        <h1>Find Your Next Event</h1>

        <p>
          Discover and reserve seats for concerts, workshops and more.
        </p>

        <button className="home-btn" onClick={handleBrowseEvents}>
          Browse Events
        </button>
      </div>
    </div>
  );
};

export default Home;