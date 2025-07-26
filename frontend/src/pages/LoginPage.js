import React, { useState } from 'react';
import './LoginPage.css';
import PlatformIcon from '../components/PlatformIcon';
import apiService from '../services/api';

const LoginPage = ({ onLogin, onBack, onNavigate }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isSignUp) {
        // Register new user
        await apiService.register(formData.email, formData.password, formData.name);
        // After successful registration, log them in
        await apiService.login(formData.email, formData.password);
      } else {
        // Login existing user
        await apiService.login(formData.email, formData.password);
      }
      
      // Call the parent component's onLogin callback
      onLogin({ success: true });
    } catch (err) {
      setError(err.message || 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
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

              {error && (
                <div className="error-message">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="login-form">
                {isSignUp && (
                  <div className="form-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
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
                  <div className="password-input-container">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      className="password-toggle-btn"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? '👁️' : '👁️‍🗨️'}
                    </button>
                  </div>
                </div>

                {!isSignUp && (
                  <div className="form-options">
                    <label className="checkbox-label">
                      <input type="checkbox" />
                      Remember me
                    </label>
                    <button 
                      type="button" 
                      className="forgot-link"
                      onClick={() => setShowForgotPassword(true)}
                    >
                      Forgot password?
                    </button>
                  </div>
                )}

                <button type="submit" className="btn btn-primary login-btn" disabled={loading}>
                  {loading ? 'Please wait...' : (isSignUp ? 'Create Account' : 'Sign In')}
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

      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <ForgotPasswordModal 
          onClose={() => setShowForgotPassword(false)}
          onSuccess={() => {
            setShowForgotPassword(false);
            setError('');
          }}
          onNavigateToReset={() => {
            setShowForgotPassword(false);
            onNavigate('reset-password');
          }}
        />
      )}
    </div>
  );
};

// Forgot Password Modal Component
const ForgotPasswordModal = ({ onClose, onSuccess, onNavigateToReset }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await apiService.forgotPassword(email);
      setMessage(response.message || 'Password reset instructions have been sent to your email.');
    } catch (err) {
      setError(err.message || 'Failed to send reset email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Reset Password</h3>
          <button className="modal-close-btn" onClick={onClose}>×</button>
        </div>
        
        <div className="modal-body">
          <p>Enter your email address and we'll send you instructions to reset your password.</p>
          
          {error && <div className="error-message">{error}</div>}
          {message && (
            <div className="success-message">
              {message}
              
              <div style={{ marginTop: '20px', padding: '15px', background: '#e3f2fd', borderRadius: '8px', border: '1px solid #bbdefb' }}>
                <p style={{ margin: '0 0 10px 0', fontWeight: '600', color: '#1565c0', fontSize: '14px' }}>
                  📧 Check Your Email
                </p>
                <p style={{ margin: '0', fontSize: '13px', color: '#1976d2' }}>
                  We've sent a reset token to your email address. Please check your inbox and spam folder.
                </p>
              </div>
              
              <div style={{ marginTop: '15px' }}>
                <button 
                  type="button" 
                  className="btn btn-primary" 
                  onClick={onNavigateToReset}
                  style={{ fontSize: '14px', padding: '8px 16px' }}
                >
                  Enter Reset Token Now
                </button>
              </div>
            </div>
          )}
          
          {!message && (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={onClose}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? 'Sending...' : 'Send Reset Link'}
                </button>
              </div>
            </form>
          )}
          
          <div style={{ marginTop: '20px', textAlign: 'center', borderTop: '1px solid #e9ecef', paddingTop: '15px' }}>
            <p style={{ fontSize: '14px', color: '#6c757d', margin: '0 0 10px 0' }}>
              Already have a reset token?
            </p>
            <button 
              type="button" 
              className="forgot-link"
              onClick={onNavigateToReset}
            >
              Enter Reset Token
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;