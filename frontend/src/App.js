import React, { useState } from 'react';
import './App.css';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import BackendMonitor from './pages/BackendMonitor';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (credentials) => {
    // Simple login logic - in real app, this would validate against backend
    if (credentials.email && credentials.password) {
      setIsLoggedIn(true);
      setCurrentPage('dashboard');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('home');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onGetStarted={() => setCurrentPage('login')} />;
      case 'login':
        return <LoginPage onLogin={handleLogin} onBack={() => setCurrentPage('home')} />;
      case 'dashboard':
        return <Dashboard onLogout={handleLogout} onBackendMonitor={() => setCurrentPage('backend-monitor')} />;
      case 'backend-monitor':
        return <BackendMonitor onBack={() => setCurrentPage('dashboard')} />;
      default:
        return <HomePage onGetStarted={() => setCurrentPage('login')} />;
    }
  };

  return (
    <div className="App">
      {renderPage()}
    </div>
  );
}

export default App;