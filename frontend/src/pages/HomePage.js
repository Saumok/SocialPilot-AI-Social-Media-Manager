import React from 'react';
import './HomePage.css';
import PlatformIcon from '../components/PlatformIcon';

const HomePage = ({ onGetStarted }) => {
  const features = [
    {
      icon: '🤖',
      title: 'AI Content Generation',
      description: 'Create engaging posts, captions, and hashtags using advanced AI technology'
    },
    {
      icon: '📅',
      title: 'Smart Scheduling',
      description: 'Schedule posts across multiple platforms with optimal timing suggestions'
    },
    {
      icon: '📊',
      title: 'Analytics Dashboard',
      description: 'Track performance, engagement, and growth with detailed analytics'
    },
    {
      icon: '🔄',
      title: 'Auto Engagement',
      description: 'Automated replies and interactions to boost your social media presence'
    },
    {
      icon: '🎯',
      title: 'Multi-Platform',
      description: 'Manage Twitter, Instagram, Facebook, LinkedIn, and TikTok from one place'
    },
    {
      icon: '⚡',
      title: 'Real-time Sync',
      description: 'Instant synchronization across all your connected social media accounts'
    }
  ];

  const platforms = [
    { name: 'Twitter', icon: 'X', color: '#000000' },
    { name: 'Instagram', icon: 'IG', color: '#E4405F' },
    { name: 'Facebook', icon: 'f', color: '#1877F2' },
    { name: 'LinkedIn', icon: 'in', color: '#0A66C2' },
    { name: 'TikTok', icon: 'TT', color: '#000000' }
  ];

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content fade-in-up">
            <h1 className="hero-title">
              SocialPilot
              <span className="gradient-text"> AI Social Media Manager</span>
            </h1>
            <p className="hero-subtitle">
              Automate your social media presence with AI-powered content creation, 
              smart scheduling, and advanced analytics. Manage all your platforms from one dashboard.
            </p>
            <div className="hero-buttons">
              <button className="btn btn-primary" onClick={onGetStarted}>
                Get Started Free
              </button>
              <button className="btn btn-secondary">
                Watch Demo
              </button>
            </div>
          </div>
          <div className="hero-image fade-in-up">
            <div className="dashboard-preview">
              <div className="preview-header">
                <div className="preview-dots">
                  <span></span><span></span><span></span>
                </div>
                <span className="preview-title">SocialPilot Dashboard</span>
              </div>
              <div className="preview-content">
                <div className="preview-stats">
                  <div className="stat">
                    <span className="stat-number">2.4K</span>
                    <span className="stat-label">Posts</span>
                  </div>
                  <div className="stat">
                    <span className="stat-number">45.2K</span>
                    <span className="stat-label">Followers</span>
                  </div>
                  <div className="stat">
                    <span className="stat-number">89%</span>
                    <span className="stat-label">Engagement</span>
                  </div>
                </div>
                <div className="preview-chart">
                  <div className="chart-bars">
                    <div className="bar" style={{height: '60%'}}></div>
                    <div className="bar" style={{height: '80%'}}></div>
                    <div className="bar" style={{height: '45%'}}></div>
                    <div className="bar" style={{height: '90%'}}></div>
                    <div className="bar" style={{height: '70%'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2 className="section-title">Powerful Features</h2>
          <p className="section-subtitle">Everything you need to dominate social media</p>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card card fade-in-up" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platforms Section */}
      <section className="platforms">
        <div className="container">
          <h2 className="section-title">Supported Platforms</h2>
          <p className="section-subtitle">Connect and manage all your social media accounts</p>
          <div className="platforms-grid">
            {platforms.map((platform, index) => (
              <div key={index} className="platform-card fade-in-up" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="platform-icon" style={{color: platform.color}}>
                  <PlatformIcon platform={platform.name} size={32} color={platform.color} />
                </div>
                <span className="platform-name">{platform.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <div className="cta-content fade-in-up">
            <h2 className="cta-title">Ready to Transform Your Social Media?</h2>
            <p className="cta-subtitle">
              Join thousands of creators and businesses using SocialPilot to grow their online presence
            </p>
            <button className="btn btn-primary" onClick={onGetStarted}>
              Start Your Free Trial
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <h3>SocialPilot</h3>
              <p>AI-powered social media management</p>
            </div>
            <div className="footer-links">
              <div className="footer-column">
                <h4>Product</h4>
                <a href="#features">Features</a>
                <a href="#pricing">Pricing</a>
                <a href="#integrations">Integrations</a>
              </div>
              <div className="footer-column">
                <h4>Support</h4>
                <a href="#help">Help Center</a>
                <a href="#contact">Contact</a>
                <a href="#docs">Documentation</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 SocialPilot. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;