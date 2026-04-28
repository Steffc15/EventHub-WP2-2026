import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

import Home from './pages/Home/Home';
//import AuthPage from './pages/AuthPage/AuthPage';
import Events from './pages/Events';
import Reservations from './pages/Reservations';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';

function App() {
  return (
    <div className="app-wrapper">
      <Header />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />{' '}
          <Route path="/events" element={<Events />} />{' '}
          <Route path="/reservations" element={<Reservations />} />{' '}
          <Route path="/login" element={<Login />} />{' '}
          <Route path="/signup" element={<Signup />} />{' '}
        </Routes>{' '}
      </main>

      <Footer />
    </div>
  );
}

export default App;
