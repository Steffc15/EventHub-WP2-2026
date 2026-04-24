import React from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import AuthPage from './pages/AuthPage';

function App() {
  return (
    <div className="app-wrapper">
      <Header />

      <main className="main-content">
        <AuthPage />
      </main>

      <Footer />
    </div>
  );
}

export default App;
