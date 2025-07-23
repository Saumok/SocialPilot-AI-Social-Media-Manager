import React, { useState, useEffect } from 'react';
import './BackendMonitor.css';

const BackendMonitor = ({ onBack }) => {
  const [systemHealth, setSystemHealth] = useState({
    api: 'online',
    database: 'online',
    redis: 'online',
    openai: 'connected',
    celery: 'running'
  });

  const [serverMetrics, setServerMetrics] = useState({
    uptime: '2d 14h 32m',
    cpu_usage: 45,
    memory_usage: 68,
    disk_usage: 32,
    active_connections: 127,
    requests_per_minute: 234
  });

  const [databaseStats, setDatabaseStats] = useState({
    total_users: 1247,
    total_posts: 8934,
    total_analytics: 45672,
    total_platforms: 5,
    db_size: '2.3GB',
    active_queries: 12,
    slow_queries: 3,
    connection_pool: '8/20'
  });

  const [apiLogs, setApiLogs] = useState([
    { timestamp: '2025-01-24 10:30:45', method: 'POST', endpoint: '/api/v1/content/generate', status: 200, response_time: '1.2s', user: 'user_123' },
    { timestamp: '2025-01-24 10:30:42', method: 'GET', endpoint: '/api/v1/analytics/dashboard', status: 200, response_time: '0.3s', user: 'user_456' },
    { timestamp: '2025-01-24 10:30:38', method: 'POST', endpoint: '/api/v1/posts/schedule', status: 201, response_time: '0.8s', user: 'user_789' },
    { timestamp: '2025-01-24 10:30:35', method: 'GET', endpoint: '/api/v1/platforms/twitter/stats', status: 200, response_time: '0.5s', user: 'user_123' },
    { timestamp: '2025-01-24 10:30:30', method: 'POST', endpoint: '/api/v1/auth/login', status: 200, response_time: '0.4s', user: 'user_999' }
  ]);

  const [celeryTasks, setCeleryTasks] = useState([
    { id: 'task_001', name: 'generate_content', status: 'SUCCESS', started: '10:30:45', duration: '2.3s', worker: 'worker-1' },
    { id: 'task_002', name: 'schedule_post', status: 'PENDING', started: '10:30:50', duration: '-', worker: 'worker-2' },
    { id: 'task_003', name: 'fetch_analytics', status: 'RUNNING', started: '10:30:48', duration: '1.2s', worker: 'worker-1' },
    { id: 'task_004', name: 'auto_engage', status: 'SUCCESS', started: '10:30:40', duration: '0.8s', worker: 'worker-3' },
    { id: 'task_005', name: 'sync_platforms', status: 'FAILED', started: '10:30:35', duration: '5.1s', worker: 'worker-2' }
  ]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Update metrics randomly
      setServerMetrics(prev => ({
        ...prev,
        cpu_usage: Math.max(20, Math.min(80, prev.cpu_usage + (Math.random() - 0.5) * 10)),
        memory_usage: Math.max(30, Math.min(90, prev.memory_usage + (Math.random() - 0.5) * 8)),
        active_connections: Math.max(50, Math.min(200, prev.active_connections + Math.floor((Math.random() - 0.5) * 20))),
        requests_per_minute: Math.max(100, Math.min(500, prev.requests_per_minute + Math.floor((Math.random() - 0.5) * 50)))
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'online':
      case 'connected':
      case 'running':
      case 'success':
        return '#28a745';
      case 'pending':
      case 'running':
        return '#ffc107';
      case 'offline':
      case 'failed':
      case 'error':
        return '#dc3545';
      default:
        return '#6c757d';
    }
  };

  return (
    <div className="backend-monitor">
      <div className="monitor-header">
        <div className="monitor-nav">
          <button className="back-btn" onClick={onBack}>
            ← Back to Dashboard
          </button>
        </div>
        <h1>🖥️ SocialPilot Backend Monitor</h1>
        <p>Real-time system monitoring and health dashboard</p>
        <div className="last-updated">
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>

      {/* System Health Overview */}
      <div className="health-overview">
        <h2>🏥 System Health</h2>
        <div className="health-grid">
          {Object.entries(systemHealth).map(([service, status]) => (
            <div key={service} className="health-card">
              <div className="health-indicator" style={{ backgroundColor: getStatusColor(status) }}></div>
              <div className="health-info">
                <h3>{service.toUpperCase()}</h3>
                <span className="health-status" style={{ color: getStatusColor(status) }}>
                  {status.toUpperCase()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Server Metrics */}
      <div className="server-metrics">
        <h2>📊 Server Metrics</h2>
        <div className="metrics-grid">
          <div className="metric-card">
            <h3>Uptime</h3>
            <div className="metric-value">{serverMetrics.uptime}</div>
          </div>
          <div className="metric-card">
            <h3>CPU Usage</h3>
            <div className="metric-value">{serverMetrics.cpu_usage}%</div>
            <div className="metric-bar">
              <div className="metric-fill" style={{ width: `${serverMetrics.cpu_usage}%`, backgroundColor: serverMetrics.cpu_usage > 70 ? '#dc3545' : '#28a745' }}></div>
            </div>
          </div>
          <div className="metric-card">
            <h3>Memory Usage</h3>
            <div className="metric-value">{serverMetrics.memory_usage}%</div>
            <div className="metric-bar">
              <div className="metric-fill" style={{ width: `${serverMetrics.memory_usage}%`, backgroundColor: serverMetrics.memory_usage > 80 ? '#dc3545' : '#28a745' }}></div>
            </div>
          </div>
          <div className="metric-card">
            <h3>Disk Usage</h3>
            <div className="metric-value">{serverMetrics.disk_usage}%</div>
            <div className="metric-bar">
              <div className="metric-fill" style={{ width: `${serverMetrics.disk_usage}%`, backgroundColor: '#28a745' }}></div>
            </div>
          </div>
          <div className="metric-card">
            <h3>Active Connections</h3>
            <div className="metric-value">{serverMetrics.active_connections}</div>
          </div>
          <div className="metric-card">
            <h3>Requests/Min</h3>
            <div className="metric-value">{serverMetrics.requests_per_minute}</div>
          </div>
        </div>
      </div>

      {/* Database Statistics */}
      <div className="database-section">
        <h2>🗄️ Database Statistics</h2>
        <div className="db-stats-grid">
          <div className="db-stat-card">
            <h3>📊 Data Overview</h3>
            <div className="stat-list">
              <div className="stat-item">
                <span className="stat-label">Total Users:</span>
                <span className="stat-value">{databaseStats.total_users.toLocaleString()}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Total Posts:</span>
                <span className="stat-value">{databaseStats.total_posts.toLocaleString()}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Analytics Records:</span>
                <span className="stat-value">{databaseStats.total_analytics.toLocaleString()}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Connected Platforms:</span>
                <span className="stat-value">{databaseStats.total_platforms}</span>
              </div>
            </div>
          </div>
          
          <div className="db-stat-card">
            <h3>⚡ Performance</h3>
            <div className="stat-list">
              <div className="stat-item">
                <span className="stat-label">Database Size:</span>
                <span className="stat-value">{databaseStats.db_size}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Active Queries:</span>
                <span className="stat-value">{databaseStats.active_queries}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Slow Queries:</span>
                <span className="stat-value" style={{ color: databaseStats.slow_queries > 5 ? '#dc3545' : '#28a745' }}>
                  {databaseStats.slow_queries}
                </span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Connection Pool:</span>
                <span className="stat-value">{databaseStats.connection_pool}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* API Request Logs */}
      <div className="api-logs-section">
        <h2>📝 API Request Logs</h2>
        <div className="logs-container">
          <div className="logs-table">
            <div className="table-header">
              <span>Timestamp</span>
              <span>Method</span>
              <span>Endpoint</span>
              <span>Status</span>
              <span>Response Time</span>
              <span>User</span>
            </div>
            {apiLogs.map((log, index) => (
              <div key={index} className="table-row">
                <span className="log-timestamp">{log.timestamp}</span>
                <span className={`log-method method-${log.method.toLowerCase()}`}>{log.method}</span>
                <span className="log-endpoint">{log.endpoint}</span>
                <span className={`log-status status-${Math.floor(log.status / 100)}`}>{log.status}</span>
                <span className="log-response-time">{log.response_time}</span>
                <span className="log-user">{log.user}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Celery Task Queue */}
      <div className="celery-section">
        <h2>🔄 Background Tasks (Celery)</h2>
        <div className="tasks-container">
          <div className="tasks-table">
            <div className="table-header">
              <span>Task ID</span>
              <span>Task Name</span>
              <span>Status</span>
              <span>Started</span>
              <span>Duration</span>
              <span>Worker</span>
            </div>
            {celeryTasks.map((task, index) => (
              <div key={index} className="table-row">
                <span className="task-id">{task.id}</span>
                <span className="task-name">{task.name}</span>
                <span className={`task-status status-${task.status.toLowerCase()}`}>
                  {task.status}
                </span>
                <span className="task-started">{task.started}</span>
                <span className="task-duration">{task.duration}</span>
                <span className="task-worker">{task.worker}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* System Configuration */}
      <div className="config-section">
        <h2>⚙️ System Configuration</h2>
        <div className="config-grid">
          <div className="config-card">
            <h3>🌐 Environment</h3>
            <div className="config-list">
              <div className="config-item">
                <span className="config-key">Environment:</span>
                <span className="config-value">Development</span>
              </div>
              <div className="config-item">
                <span className="config-key">Debug Mode:</span>
                <span className="config-value">Enabled</span>
              </div>
              <div className="config-item">
                <span className="config-key">API Version:</span>
                <span className="config-value">v1.0.0</span>
              </div>
            </div>
          </div>
          
          <div className="config-card">
            <h3>🔗 Integrations</h3>
            <div className="config-list">
              <div className="config-item">
                <span className="config-key">OpenAI API:</span>
                <span className="config-value" style={{ color: '#28a745' }}>Connected</span>
              </div>
              <div className="config-item">
                <span className="config-key">Redis:</span>
                <span className="config-value" style={{ color: '#28a745' }}>localhost:6379</span>
              </div>
              <div className="config-item">
                <span className="config-key">PostgreSQL:</span>
                <span className="config-value" style={{ color: '#28a745' }}>localhost:5432</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackendMonitor;