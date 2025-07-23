import React, { useState } from 'react';
import './LoginPage.css';
import PlatformIcon from '../components/PlatformIcon';

const LoginPage = ({ onLogin, onBack }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isSignUp, setIsSignUp] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(formData);
  };

  const socialPlatforms = [
    { name: 'Twitter', icon: 'X', color: '#000000', connected: false },
    { name: 'Instagram', icon: 'IG', color: '#E4405F', connected: false },
    { name: 'Facebook', icon: 'f', color: '#1877F2', connected: false },
    { name: 'LinkedIn', icon: 'in', color: '#0A66C2', connected: false },
    { name: 'TikTok', icon: 'TT', color: '#000000', connected: false }
  ];

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <button className="back-btn" onClick={onBack}>
            ← Back to Home
          </button>
          <div className="login-logo">
            <h1>SocialPilot</h1>
            <p>AI Social Media Manager</p>
          </div>
        </div>

        <div className="login-content">
          <div className="login-form-section">
            <div className="login-form-container">
              <h2>{isSignUp ? 'Create Account' : 'Welcome Back'}</h2>
              <p className="login-subtitle">
                {isSignUp 
                  ? 'Start managing your social media with AI' 
                  : 'Sign in to your SocialPilot account'
                }
              </p>

              <form onSubmit={handleSubmit} className="login-form">
                {isSignUp && (
                  <div className="form-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter your full name"
                      required={isSignUp}
                    />
                  </div>
                )}
                
                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                    required
                  />
                </div>

                {!isSignUp && (
                  <div className="form-options">
                    <label className="checkbox-label">
                      <input type="checkbox" />
                      Remember me
                    </label>
                    <a href="#forgot" className="forgot-link">Forgot password?</a>
                  </div>
                )}

                <button type="submit" className="btn btn-primary login-btn">
                  {isSignUp ? 'Create Account' : 'Sign In'}
                </button>
              </form>

              <div className="login-divider">
                <span>or</span>
              </div>

              <div className="social-login">
                <button className="btn-social google-btn">
                  <span>🔍</span>
                  Continue with Google
                </button>
                <button className="btn-social github-btn">
                  <span>⚫</span>
                  Continue with GitHub
                </button>
              </div>

              <div className="login-switch">
                <p>
                  {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
                  <button 
                    type="button" 
                    className="switch-btn"
                    onClick={() => setIsSignUp(!isSignUp)}
                  >
                    {isSignUp ? 'Sign In' : 'Sign Up'}
                  </button>
                </p>
              </div>
            </div>
          </div>

          <div className="social-platforms-section">
            <div className="platforms-preview">
              <h3>Connect Your Social Media</h3>
              <p>After signing in, connect your social media accounts to start managing them with AI</p>
              
              <div className="platforms-list">
                {socialPlatforms.map((platform, index) => (
                  <div key={index} className="platform-item">
                    <div className="platform-info">
                      <div 
                        className="platform-icon-circle" 
                        style={{ backgroundColor: platform.color }}
                      >
                        <PlatformIcon platform={platform.name} size={20} color="white" />
                      </div>
                      <div className="platform-details">
                        <span className="platform-name">{platform.name}</span>
                        <span className="platform-status">
                          {platform.connected ? 'Connected' : 'Not connected'}
                        </span>
                      </div>
                    </div>
                    <div className="connection-status">
                      {platform.connected ? (
                        <span className="status-connected">✓</span>
                      ) : (
                        <span className="status-pending">○</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="features-preview">
                <h4>What you'll get:</h4>
                <ul>
                  <li>✨ AI-powered content generation</li>
                  <li>📅 Smart scheduling across platforms</li>
                  <li>📊 Detailed analytics and insights</li>
                  <li>🤖 Automated engagement</li>
                  <li>🎯 Audience targeting</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;