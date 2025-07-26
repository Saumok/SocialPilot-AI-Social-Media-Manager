import React, { useState, useEffect } from 'react';
import './HomePage.css';
import PlatformIcon from '../components/PlatformIcon';

const HomePage = ({ onGetStarted }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  // Handle scroll for 3D object animation
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Apply dark mode class to body
  useEffect(() => {
    document.body.className = isDarkMode ? 'dark-mode' : 'light-mode';
  }, [isDarkMode]);

  const features = [
    {
      icon: '🤖',
      title: 'AI Content Generation',
      description: 'Create engaging posts, captions, and hashtags using advanced AI technology',
      detailedDescription: 'Advanced AI creates compelling content by analyzing trends, brand voice, and audience preferences. Includes hashtag suggestions, tone adjustment, and platform optimization.',
      benefits: ['Save 80% time on content creation', 'Consistent brand voice', 'Trending topic integration', 'Multi-language support']
    },
    {
      icon: '📅',
      title: 'Smart Scheduling',
      description: 'Schedule posts across multiple platforms with optimal timing suggestions',
      detailedDescription: 'Intelligent scheduling system that analyzes your audience activity patterns and suggests optimal posting times. Bulk scheduling, content calendar view, timezone management, and automatic reposting for maximum engagement.',
      benefits: ['Optimal timing suggestions', 'Bulk scheduling capabilities', 'Cross-timezone posting', 'Content calendar view']
    },
    {
      icon: '📊',
      title: 'Analytics Dashboard',
      description: 'Track performance, engagement, and growth with detailed analytics',
      detailedDescription: 'Comprehensive analytics suite providing deep insights into your social media performance. Track engagement rates, follower growth, reach metrics, and ROI. Generate custom reports and identify top-performing content.',
      benefits: ['Real-time performance tracking', 'Custom report generation', 'ROI measurement', 'Competitor analysis']
    },
    {
      icon: '🔄',
      title: 'Auto Engagement',
      description: 'Automated replies and interactions to boost your social media presence',
      detailedDescription: 'AI-powered engagement system that automatically responds to comments, likes relevant posts, and engages with your target audience. Smart filtering ensures only appropriate interactions while maintaining authentic engagement.',
      benefits: ['24/7 audience engagement', 'Smart response filtering', 'Authentic interactions', 'Community building']
    },
    {
      icon: '🎯',
      title: 'Multi-Platform',
      description: 'Manage Twitter, Instagram, Facebook, LinkedIn, and TikTok from one place',
      detailedDescription: 'Unified dashboard for managing all your social media accounts. Platform-specific optimization, cross-posting capabilities, and unified inbox for all messages and notifications from different platforms.',
      benefits: ['Single dashboard control', 'Platform optimization', 'Unified messaging', 'Cross-posting efficiency']
    },
    {
      icon: '⚡',
      title: 'Real-time Sync',
      description: 'Instant synchronization across all your connected social media accounts',
      detailedDescription: 'Lightning-fast synchronization ensures all your platforms stay updated in real-time. Instant notifications, live activity feeds, and immediate content distribution across all connected accounts.',
      benefits: ['Instant updates', 'Live notifications', 'Real-time monitoring', 'Seamless integration']
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
    <div className={`homepage ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>


      {/* Dark/Light Mode Toggle */}
      <div className="theme-toggle">
        <button 
          className={`toggle-btn ${isDarkMode ? 'dark' : 'light'}`}
          onClick={() => setIsDarkMode(!isDarkMode)}
        >
          <div className="toggle-slider">
            <span className="toggle-icon">
              {isDarkMode ? '🌙' : '☀️'}
            </span>
          </div>
        </button>
      </div>

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
              <div key={index} className="flip-card fade-in-up" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="flip-card-inner">
                  {/* Front Side */}
                  <div className="flip-card-front">
                    <div className="feature-icon">{feature.icon}</div>
                    <h3 className="feature-title">{feature.title}</h3>
                    <p className="feature-description">{feature.description}</p>
                    <div className="flip-indicator">
                      <span>Hover for details</span>
                      <div className="flip-arrow">↻</div>
                    </div>
                  </div>
                  
                  {/* Back Side */}
                  <div className="flip-card-back">
                    <div className="feature-icon-small">{feature.icon}</div>
                    <h3 className="feature-title-back">{feature.title}</h3>
                    <p className="detailed-description">{feature.detailedDescription}</p>
                    <div className="benefits-list">
                      <h4>Key Benefits:</h4>
                      <ul>
                        {feature.benefits.map((benefit, idx) => (
                          <li key={idx}>✓ {benefit}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
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
          
          {/* Platform Showcase */}
          <div className="platforms-showcase">
            <div className="platforms-orbit">
              {platforms.map((platform, index) => (
                <div 
                  key={index} 
                  className="platform-orbit-item fade-in-up" 
                  style={{
                    animationDelay: `${index * 0.2}s`,
                    '--orbit-angle': `${index * 72}deg`
                  }}
                >
                  <div className="platform-card-3d" style={{'--platform-color': platform.color}}>
                    <div className="platform-card-inner">
                      <div className="platform-icon-wrapper">
                        <PlatformIcon platform={platform.name} size={50} color={platform.color} />
                      </div>
                    </div>
                    <div className="platform-glow"></div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Central Hub */}
            <div className="central-hub">
              <div className="hub-content">
                <div className="hub-icon">🚀</div>
                <h3>SocialPilot</h3>
                <p>Central Hub</p>
              </div>
              <div className="hub-pulse"></div>
            </div>
          </div>

          {/* Platform Features Grid */}
          <div className="platform-features">
            <div className="platform-feature">
              <div className="feature-icon">🔄</div>
              <h4>Cross-Platform Posting</h4>
              <p>Post to all platforms simultaneously with optimized content for each</p>
            </div>
            <div className="platform-feature">
              <div className="feature-icon">📊</div>
              <h4>Unified Analytics</h4>
              <p>Track performance across all platforms from a single dashboard</p>
            </div>
            <div className="platform-feature">
              <div className="feature-icon">🤖</div>
              <h4>AI Optimization</h4>
              <p>Platform-specific content optimization powered by AI</p>
            </div>
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