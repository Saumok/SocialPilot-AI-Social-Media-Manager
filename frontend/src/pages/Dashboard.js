import React, { useState } from 'react';
import './Dashboard.css';
import PlatformIcon from '../components/PlatformIcon';

const Dashboard = ({ onLogout, onBackendMonitor }) => {
  const [connectedPlatforms, setConnectedPlatforms] = useState([
    { name: 'Twitter', icon: 'X', connected: false, followers: 0 },
    { name: 'Instagram', icon: 'IG', connected: false, followers: 0 },
    { name: 'Facebook', icon: 'f', connected: false, followers: 0 },
    { name: 'LinkedIn', icon: 'in', connected: false, followers: 0 },
    { name: 'TikTok', icon: 'TT', connected: false, followers: 0 }
  ]);

  const [activeTab, setActiveTab] = useState('overview');

  const handleConnectPlatform = (platformName) => {
    setConnectedPlatforms(prev => 
      prev.map(platform => 
        platform.name === platformName 
          ? { ...platform, connected: !platform.connected, followers: platform.connected ? 0 : Math.floor(Math.random() * 10000) }
          : platform
      )
    );
  };

  const stats = {
    totalPosts: connectedPlatforms.filter(p => p.connected).length * 12,
    totalFollowers: connectedPlatforms.reduce((sum, p) => sum + p.followers, 0),
    engagement: connectedPlatforms.some(p => p.connected) ? '8.5%' : '0%',
    reach: connectedPlatforms.reduce((sum, p) => sum + p.followers * 2.5, 0)
  };

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-left">
            <h1>SocialPilot Dashboard</h1>
            <p>Welcome back! Manage your social media presence with AI</p>
          </div>
          <div className="header-right">
            <button 
              className="btn btn-primary" 
              onClick={onBackendMonitor} 
              style={{
                marginRight: '10px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                padding: '10px 15px',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              🖥️ Backend Monitor
            </button>
            <button className="btn btn-secondary" onClick={onLogout}>
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="dashboard-nav">
        <div className="nav-content">
          <button 
            className={`nav-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            📊 Overview
          </button>
          <button 
            className={`nav-btn ${activeTab === 'platforms' ? 'active' : ''}`}
            onClick={() => setActiveTab('platforms')}
          >
            🔗 Connect Platforms
          </button>
          <button 
            className={`nav-btn ${activeTab === 'content' ? 'active' : ''}`}
            onClick={() => setActiveTab('content')}
          >
            ✨ AI Content
          </button>
          <button 
            className={`nav-btn ${activeTab === 'analytics' ? 'active' : ''}`}
            onClick={() => setActiveTab('analytics')}
          >
            📈 Analytics
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="dashboard-main">
        {activeTab === 'overview' && (
          <div className="overview-tab">
            {/* System Status */}
            <div className="system-status">
              <h3>🤖 AI Agent Status</h3>
              <div className="agents-grid">
                <div className="agent-card">
                  <div className="agent-header">
                    <div className="agent-icon">🧠</div>
                    <div className="agent-info">
                      <h4>Content Generator</h4>
                      <span className="agent-status online">● Online</span>
                    </div>
                  </div>
                  <div className="agent-activity">
                    <div className="activity-item">
                      <span className="activity-time">2 min ago</span>
                      <span className="activity-text">Generated post for Twitter</span>
                    </div>
                    <div className="activity-item">
                      <span className="activity-time">5 min ago</span>
                      <span className="activity-text">Analyzed trending topics</span>
                    </div>
                  </div>
                </div>

                <div className="agent-card">
                  <div className="agent-header">
                    <div className="agent-icon">📅</div>
                    <div className="agent-info">
                      <h4>Scheduler Agent</h4>
                      <span className="agent-status online">● Online</span>
                    </div>
                  </div>
                  <div className="agent-activity">
                    <div className="activity-item">
                      <span className="activity-time">1 min ago</span>
                      <span className="activity-text">Scheduled 3 posts</span>
                    </div>
                    <div className="activity-item">
                      <span className="activity-time">10 min ago</span>
                      <span className="activity-text">Optimized posting times</span>
                    </div>
                  </div>
                </div>

                <div className="agent-card">
                  <div className="agent-header">
                    <div className="agent-icon">📊</div>
                    <div className="agent-info">
                      <h4>Analytics Agent</h4>
                      <span className="agent-status online">● Online</span>
                    </div>
                  </div>
                  <div className="agent-activity">
                    <div className="activity-item">
                      <span className="activity-time">3 min ago</span>
                      <span className="activity-text">Updated engagement metrics</span>
                    </div>
                    <div className="activity-item">
                      <span className="activity-time">7 min ago</span>
                      <span className="activity-text">Generated insights report</span>
                    </div>
                  </div>
                </div>

                <div className="agent-card">
                  <div className="agent-header">
                    <div className="agent-icon">🤝</div>
                    <div className="agent-info">
                      <h4>Engagement Agent</h4>
                      <span className="agent-status online">● Online</span>
                    </div>
                  </div>
                  <div className="agent-activity">
                    <div className="activity-item">
                      <span className="activity-time">4 min ago</span>
                      <span className="activity-text">Replied to 5 comments</span>
                    </div>
                    <div className="activity-item">
                      <span className="activity-time">8 min ago</span>
                      <span className="activity-text">Liked relevant posts</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Data Flow Visualization */}
            <div className="data-flow">
              <h3>📊 Data Flow & Storage</h3>
              <div className="flow-diagram">
                <div className="flow-step">
                  <div className="flow-icon">🔗</div>
                  <h4>Social Platforms</h4>
                  <p>Data Collection</p>
                  <div className="flow-arrow">→</div>
                </div>
                <div className="flow-step">
                  <div className="flow-icon">🤖</div>
                  <h4>AI Processing</h4>
                  <p>Content Analysis</p>
                  <div className="flow-arrow">→</div>
                </div>
                <div className="flow-step">
                  <div className="flow-icon">🗄️</div>
                  <h4>Database</h4>
                  <p>PostgreSQL Storage</p>
                  <div className="flow-arrow">→</div>
                </div>
                <div className="flow-step">
                  <div className="flow-icon">📈</div>
                  <h4>Analytics</h4>
                  <p>Insights & Reports</p>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">📝</div>
                <div className="stat-info">
                  <span className="stat-number">{stats.totalPosts}</span>
                  <span className="stat-label">Total Posts</span>
                  <div className="stat-trend">↗ +12% this week</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">👥</div>
                <div className="stat-info">
                  <span className="stat-number">{stats.totalFollowers.toLocaleString()}</span>
                  <span className="stat-label">Total Followers</span>
                  <div className="stat-trend">↗ +8% this week</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">💬</div>
                <div className="stat-info">
                  <span className="stat-number">{stats.engagement}</span>
                  <span className="stat-label">Engagement Rate</span>
                  <div className="stat-trend">↗ +15% this week</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">📊</div>
                <div className="stat-info">
                  <span className="stat-number">{Math.floor(stats.reach).toLocaleString()}</span>
                  <span className="stat-label">Total Reach</span>
                  <div className="stat-trend">↗ +22% this week</div>
                </div>
              </div>
            </div>

            {/* Database Status */}
            <div className="database-status">
              <h3>🗄️ Database & Storage Status</h3>
              <div className="db-grid">
                <div className="db-card">
                  <div className="db-header">
                    <div className="db-icon">🐘</div>
                    <div className="db-info">
                      <h4>PostgreSQL</h4>
                      <span className="db-status online">● Connected</span>
                    </div>
                  </div>
                  <div className="db-stats">
                    <div className="db-stat">
                      <span className="db-label">Posts Stored:</span>
                      <span className="db-value">2,847</span>
                    </div>
                    <div className="db-stat">
                      <span className="db-label">Users:</span>
                      <span className="db-value">156</span>
                    </div>
                    <div className="db-stat">
                      <span className="db-label">Analytics Records:</span>
                      <span className="db-value">15,234</span>
                    </div>
                  </div>
                </div>

                <div className="db-card">
                  <div className="db-header">
                    <div className="db-icon">🔴</div>
                    <div className="db-info">
                      <h4>Redis Cache</h4>
                      <span className="db-status online">● Connected</span>
                    </div>
                  </div>
                  <div className="db-stats">
                    <div className="db-stat">
                      <span className="db-label">Cached Items:</span>
                      <span className="db-value">1,234</span>
                    </div>
                    <div className="db-stat">
                      <span className="db-label">Memory Usage:</span>
                      <span className="db-value">45MB</span>
                    </div>
                    <div className="db-stat">
                      <span className="db-label">Hit Rate:</span>
                      <span className="db-value">94%</span>
                    </div>
                  </div>
                </div>

                <div className="db-card">
                  <div className="db-header">
                    <div className="db-icon">☁️</div>
                    <div className="db-info">
                      <h4>File Storage</h4>
                      <span className="db-status online">● Active</span>
                    </div>
                  </div>
                  <div className="db-stats">
                    <div className="db-stat">
                      <span className="db-label">Images:</span>
                      <span className="db-value">892</span>
                    </div>
                    <div className="db-stat">
                      <span className="db-label">Videos:</span>
                      <span className="db-value">45</span>
                    </div>
                    <div className="db-stat">
                      <span className="db-label">Total Size:</span>
                      <span className="db-value">2.3GB</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Real-time Activity Feed */}
            <div className="activity-feed">
              <h3>⚡ Real-time Activity</h3>
              <div className="feed-container">
                <div className="feed-item">
                  <div className="feed-time">Just now</div>
                  <div className="feed-content">
                    <span className="feed-icon">🤖</span>
                    <span className="feed-text">AI generated new content for Instagram</span>
                  </div>
                </div>
                <div className="feed-item">
                  <div className="feed-time">2 min ago</div>
                  <div className="feed-content">
                    <span className="feed-icon">📊</span>
                    <span className="feed-text">Analytics data updated for Twitter account</span>
                  </div>
                </div>
                <div className="feed-item">
                  <div className="feed-time">5 min ago</div>
                  <div className="feed-content">
                    <span className="feed-icon">📅</span>
                    <span className="feed-text">Scheduled 3 posts for optimal engagement times</span>
                  </div>
                </div>
                <div className="feed-item">
                  <div className="feed-time">8 min ago</div>
                  <div className="feed-content">
                    <span className="feed-icon">💬</span>
                    <span className="feed-text">Auto-replied to 12 comments across platforms</span>
                  </div>
                </div>
                <div className="feed-item">
                  <div className="feed-time">12 min ago</div>
                  <div className="feed-content">
                    <span className="feed-icon">🔗</span>
                    <span className="feed-text">LinkedIn account connected successfully</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'platforms' && (
          <div className="platforms-tab">
            <div className="platforms-header">
              <h3>Connect Your Social Media Platforms</h3>
              <p>Connect your accounts to start managing them with AI-powered tools</p>
            </div>

            {/* Connection Status Overview */}
            <div className="connection-overview">
              <div className="connection-stats">
                <div className="connection-stat">
                  <span className="stat-number">{connectedPlatforms.filter(p => p.connected).length}</span>
                  <span className="stat-label">Connected</span>
                </div>
                <div className="connection-stat">
                  <span className="stat-number">{connectedPlatforms.filter(p => !p.connected).length}</span>
                  <span className="stat-label">Available</span>
                </div>
                <div className="connection-stat">
                  <span className="stat-number">{connectedPlatforms.reduce((sum, p) => sum + p.followers, 0).toLocaleString()}</span>
                  <span className="stat-label">Total Reach</span>
                </div>
              </div>
            </div>
            
            <div className="platforms-grid">
              {connectedPlatforms.map((platform, index) => (
                <div key={index} className={`platform-card ${platform.connected ? 'connected' : ''}`}>
                  <div className="platform-header">
                    <div className="platform-icon">
                      <PlatformIcon platform={platform.name} size={32} color="#333" />
                    </div>
                    <div className="platform-info">
                      <h4>{platform.name}</h4>
                      <span className={`status ${platform.connected ? 'connected' : 'disconnected'}`}>
                        {platform.connected ? '● Connected' : '○ Not Connected'}
                      </span>
                    </div>
                    {platform.connected && (
                      <div className="connection-indicator">
                        <div className="pulse-dot"></div>
                      </div>
                    )}
                  </div>
                  
                  {platform.connected && (
                    <>
                      <div className="platform-stats">
                        <div className="platform-stat">
                          <span className="stat-value">{platform.followers.toLocaleString()}</span>
                          <span className="stat-label">Followers</span>
                        </div>
                        <div className="platform-stat">
                          <span className="stat-value">{Math.floor(Math.random() * 50) + 10}</span>
                          <span className="stat-label">Posts</span>
                        </div>
                        <div className="platform-stat">
                          <span className="stat-value">{Math.floor(Math.random() * 20) + 5}%</span>
                          <span className="stat-label">Engagement</span>
                        </div>
                      </div>
                      
                      <div className="platform-activity">
                        <h5>Recent Activity</h5>
                        <div className="activity-list">
                          <div className="activity-item-small">
                            <span className="activity-dot"></span>
                            <span className="activity-text">Posted 2 hours ago</span>
                          </div>
                          <div className="activity-item-small">
                            <span className="activity-dot"></span>
                            <span className="activity-text">Analytics updated</span>
                          </div>
                          <div className="activity-item-small">
                            <span className="activity-dot"></span>
                            <span className="activity-text">Auto-engagement active</span>
                          </div>
                        </div>
                      </div>

                      <div className="data-sync-status">
                        <div className="sync-indicator">
                          <div className="sync-icon">🔄</div>
                          <span className="sync-text">Data syncing...</span>
                        </div>
                        <div className="sync-progress">
                          <div className="progress-bar">
                            <div className="progress-fill" style={{width: '85%'}}></div>
                          </div>
                          <span className="progress-text">85% complete</span>
                        </div>
                      </div>
                    </>
                  )}

                  {!platform.connected && (
                    <div className="connection-benefits">
                      <h5>What you'll get:</h5>
                      <ul className="benefits-list">
                        <li>✨ AI content generation</li>
                        <li>📊 Real-time analytics</li>
                        <li>🤖 Auto engagement</li>
                        <li>📅 Smart scheduling</li>
                      </ul>
                    </div>
                  )}
                  
                  <button 
                    className={`btn ${platform.connected ? 'btn-secondary' : 'btn-primary'} platform-btn`}
                    onClick={() => handleConnectPlatform(platform.name)}
                  >
                    {platform.connected ? 'Disconnect' : 'Connect Account'}
                  </button>
                </div>
              ))}
            </div>

            {/* API Keys Status */}
            <div className="api-status">
              <h3>🔑 API Configuration Status</h3>
              <div className="api-grid">
                <div className="api-card">
                  <div className="api-header">
                    <div className="api-icon">🤖</div>
                    <div className="api-info">
                      <h4>OpenAI API</h4>
                      <span className="api-status-badge connected">● Connected</span>
                    </div>
                  </div>
                  <div className="api-details">
                    <p>Content generation active</p>
                    <div className="api-usage">
                      <span className="usage-label">Usage this month:</span>
                      <span className="usage-value">2,847 tokens</span>
                    </div>
                  </div>
                </div>

                <div className="api-card">
                  <div className="api-header">
                    <div className="api-icon">🔗</div>
                    <div className="api-info">
                      <h4>Social Media APIs</h4>
                      <span className="api-status-badge connected">● {connectedPlatforms.filter(p => p.connected).length} Active</span>
                    </div>
                  </div>
                  <div className="api-details">
                    <p>Platform integrations ready</p>
                    <div className="api-usage">
                      <span className="usage-label">API calls today:</span>
                      <span className="usage-value">1,234</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'content' && (
          <div className="content-tab">
            <div className="content-header">
              <h3>AI Content Generation</h3>
              <p>Generate engaging content for your social media platforms</p>
            </div>
            
            <div className="content-generator">
              <div className="generator-form">
                <div className="form-group">
                  <label>Content Topic</label>
                  <input type="text" placeholder="e.g., AI in marketing, productivity tips..." />
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Platform</label>
                    <select>
                      <option>Twitter</option>
                      <option>Instagram</option>
                      <option>Facebook</option>
                      <option>LinkedIn</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label>Tone</label>
                    <select>
                      <option>Professional</option>
                      <option>Casual</option>
                      <option>Funny</option>
                      <option>Inspirational</option>
                    </select>
                  </div>
                </div>
                
                <button className="btn btn-primary generate-btn">
                  ✨ Generate Content
                </button>
              </div>
              
              <div className="generated-content">
                <h4>Generated Content</h4>
                <div className="content-preview">
                  <p>Click "Generate Content" to create AI-powered posts for your social media platforms.</p>
                  <div className="content-actions">
                    <button className="btn btn-secondary" disabled>Edit</button>
                    <button className="btn btn-primary" disabled>Schedule</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="analytics-tab">
            <div className="analytics-header">
              <h3>Analytics & Insights</h3>
              <p>Track your social media performance and growth</p>
            </div>
            
            <div className="analytics-content">
              <div className="analytics-chart">
                <h4>Engagement Over Time</h4>
                <div className="chart-placeholder">
                  <div className="chart-bars">
                    <div className="bar" style={{height: '60%'}}></div>
                    <div className="bar" style={{height: '80%'}}></div>
                    <div className="bar" style={{height: '45%'}}></div>
                    <div className="bar" style={{height: '90%'}}></div>
                    <div className="bar" style={{height: '70%'}}></div>
                    <div className="bar" style={{height: '85%'}}></div>
                    <div className="bar" style={{height: '65%'}}></div>
                  </div>
                </div>
              </div>
              
              <div className="analytics-insights">
                <h4>Key Insights</h4>
                <div className="insights-list">
                  <div className="insight-item">
                    <span className="insight-icon">📈</span>
                    <div className="insight-content">
                      <strong>Engagement is up 25%</strong>
                      <p>Your posts are getting more likes and comments this week</p>
                    </div>
                  </div>
                  <div className="insight-item">
                    <span className="insight-icon">⏰</span>
                    <div className="insight-content">
                      <strong>Best posting time: 2-4 PM</strong>
                      <p>Your audience is most active during afternoon hours</p>
                    </div>
                  </div>
                  <div className="insight-item">
                    <span className="insight-icon">🎯</span>
                    <div className="insight-content">
                      <strong>Top performing content</strong>
                      <p>Educational posts get 40% more engagement</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;