import React, { useState } from 'react';
import './LoginPage.css'; // Reuse the same styles
import apiService from '../services/api';

const ResetPasswordPage = ({ onBack, onSuccess }) => {
  const [formData, setFormData] = useState({
    token: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validate passwords match
    if (formData.newPassword !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    // Validate password length
    if (formData.newPassword.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    try {
      await apiService.resetPassword(formData.token, formData.newPassword);
      onSuccess();
    } catch (err) {
      setError(err.message || 'Failed to reset password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <button className="back-btn" onClick={onBack}>
            ← Back to Login
          </button>
          <div className="login-logo">
            <h1>SocialPilot</h1>
            <p>Reset Your Password</p>
          </div>
        </div>

        <div className="login-content">
          <div className="login-form-section" style={{ gridColumn: '1 / -1' }}>
            <div className="login-form-container">
              <h2>Reset Password</h2>
              <p className="login-subtitle">
                Enter your reset token and new password below
              </p>

              {error && (
                <div className="error-message">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="login-form">
                <div className="form-group">
                  <label>Reset Token</label>
                  <input
                    type="text"
                    name="token"
                    value={formData.token}
                    onChange={handleInputChange}
                    placeholder="Enter the reset token from your email"
                    required
                  />
                  <small style={{ color: '#6c757d', fontSize: '12px' }}>
                    Check your email for the reset token
                  </small>
                </div>

                <div className="form-group">
                  <label>New Password</label>
                  <div className="password-input-container">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleInputChange}
                      placeholder="Enter your new password"
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

                <div className="form-group">
                  <label>Confirm New Password</label>
                  <div className="password-input-container">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Confirm your new password"
                      required
                    />
                    <button
                      type="button"
                      className="password-toggle-btn"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                    </button>
                  </div>
                </div>

                <button type="submit" className="btn btn-primary login-btn" disabled={loading}>
                  {loading ? 'Resetting Password...' : 'Reset Password'}
                </button>
              </form>

              <div className="login-switch">
                <p>
                  Remember your password?{' '}
                  <button 
                    type="button" 
                    className="switch-btn"
                    onClick={onBack}
                  >
                    Back to Login
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;