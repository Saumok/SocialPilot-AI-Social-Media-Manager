import React, { useState, useEffect } from 'react';
import './App.css';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import BackendMonitor from './pages/BackendMonitor';
import ResetPasswordPage from './pages/ResetPasswordPage';
import apiService from './services/api';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // Check if user is already logged in on app start
  useEffect(() => {
    const checkAuth = async () => {
      if (apiService.isAuthenticated()) {
        try {
          const userData = await apiService.getCurrentUser();
          setUser(userData);
          setIsLoggedIn(true);
          setCurrentPage('dashboard');
        } catch (error) {
          // Token might be expired, clear it
          apiService.logout();
          setIsLoggedIn(false);
          setCurrentPage('home');
        }
      }
    };
    
    checkAuth();
  }, []);

  const handleLogin = async (result) => {
    if (result.success) {
      try {
        const userData = await apiService.getCurrentUser();
        setUser(userData);
        setIsLoggedIn(true);
        setCurrentPage('dashboard');
      } catch (error) {
        console.error('Failed to get user data:', error);
      }
    }
  };

  const handleLogout = async () => {
    await apiService.logout();
    setUser(null);
    setIsLoggedIn(false);
    setCurrentPage('home');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onGetStarted={() => setCurrentPage('login')} />;
      case 'login':
        return <LoginPage 
          onLogin={handleLogin} 
          onBack={() => setCurrentPage('home')} 
          onNavigate={setCurrentPage}
        />;
      case 'reset-password':
        return <ResetPasswordPage 
          onBack={() => setCurrentPage('login')} 
          onSuccess={() => {
            setCurrentPage('login');
            // You could show a success message here
          }}
        />;
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