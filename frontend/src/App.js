import React from 'react';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

import Home from './pages/Home/Home';
import Events from './pages/Events';
import Reservations from './pages/Reservations';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Terms from './pages/Terms/Terms';
import AdminEvents from './pages/AdminEvents/AdminEvents';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// 1. Am creat o mini-componentă de protecție care citește dinamica din localStorage la FIECARE accesare
const ProtectedAdminRoute = ({ children }) => {
  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;

  if (user && user.email?.toLowerCase().trim() === 'admin@gmail.com') {
    return children;
  }
  
  return <Navigate to="/" replace />;
};

function App() {
  return (
    <div className="app-wrapper">
      <Header />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/reservations" element={<Reservations />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms" element={<Terms />} />
          
          {/* 2. Folosim componenta dinamică pentru ruta de admin */}
          <Route 
            path="/admin/events" 
            element={
              <ProtectedAdminRoute>
                <AdminEvents />
              </ProtectedAdminRoute>
            } 
          />
        </Routes>
      </main>

      <Footer />

      <ToastContainer position="top-right" autoClose={2500} />
    </div>
  );
}

export default App;