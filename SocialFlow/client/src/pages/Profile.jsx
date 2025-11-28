import React, { useState } from 'react';
import '../styles/Profile.css';

const Profile = ({ user, token }) => {
  const [activeTab, setActiveTab] = useState('instagram');

  const accountsData = {
    instagram: {
      username: '@leonardo.social',
      status: 'conectado',
      followers: 12500,
      posts: 45,
      metrics: { engagement: 8.9, reach: 45000 }
    },
    facebook: {
      username: 'Leonardo Cutrim',
      status: 'conectado',
      followers: 3400,
      posts: 32,
      metrics: { engagement: 5.2, reach: 12000 }
    },
    linkedin: {
      username: 'Leonardo Cutrim',
      status: 'conectado',
      followers: 8900,
      posts: 28,
      metrics: { engagement: 12.5, reach: 35000 }
    },
    tiktok: {
      username: '@leo.content',
      status: 'desconectado',
      followers: 0,
      posts: 0,
      metrics: { engagement: 0, reach: 0 }
    }
  };

  const platforms = ['instagram', 'facebook', 'linkedin', 'tiktok'];
  const platformIcons = {
    instagram: '📷',
    facebook: '👍',
    linkedin: '💼',
    tiktok: '🎵'
  };

  const totalStats = {
    totalPosts: Object.values(accountsData).reduce((acc, acc_data) => acc + acc_data.posts, 0),
    totalFollowers: Object.values(accountsData).reduce((acc, acc_data) => acc + acc_data.followers, 0),
    totalEngagement: Object.values(accountsData).reduce((acc, acc_data) => acc + acc_data.metrics.engagement, 0) / Object.keys(accountsData).length
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-avatar">{user?.avatar || 'L'}</div>
        <div className="profile-info">
          <h1>{user?.name}</h1>
          <p>{user?.email}</p>
        </div>
      </div>

      <div className="profile-stats">
        <div className="stat-card">
          <span className="stat-icon">📊</span>
          <div className="stat-content">
            <h3>{totalStats.totalPosts}</h3>
            <p>Total de Posts</p>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon">👥</span>
          <div className="stat-content">
            <h3>{totalStats.totalFollowers.toLocaleString()}</h3>
            <p>Total de Seguidores</p>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon">💯</span>
          <div className="stat-content">
            <h3>{totalStats.totalEngagement.toFixed(1)}%</h3>
            <p>Engajamento Médio</p>
          </div>
        </div>
      </div>

      <div className="profile-tabs">
        {platforms.map(platform => (
          <button
            key={platform}
            className={`tab-button ${activeTab === platform ? 'active' : ''}`}
            onClick={() => setActiveTab(platform)}
          >
            <span>{platformIcons[platform]}</span>
            {platform.charAt(0).toUpperCase() + platform.slice(1)}
          </button>
        ))}
      </div>

      <div className="profile-content">
        <div className="account-info">
          <div className="account-header">
            <h2>{accountsData[activeTab].username}</h2>
            <span className={`status-badge ${accountsData[activeTab].status === 'conectado' ? 'connected' : 'disconnected'}`}>
              {accountsData[activeTab].status === 'conectado' ? '🟢 Conectado' : '🔴 Desconectado'}
            </span>
          </div>

          <div className="account-metrics">
            <div className="metric">
              <span className="metric-label">Seguidores</span>
              <span className="metric-value">{accountsData[activeTab].followers.toLocaleString()}</span>
            </div>
            <div className="metric">
              <span className="metric-label">Posts</span>
              <span className="metric-value">{accountsData[activeTab].posts}</span>
            </div>
            <div className="metric">
              <span className="metric-label">Engajamento</span>
              <span className="metric-value">{accountsData[activeTab].metrics.engagement.toFixed(1)}%</span>
            </div>
            <div className="metric">
              <span className="metric-label">Alcance</span>
              <span className="metric-value">{(accountsData[activeTab].metrics.reach / 1000).toFixed(1)}K</span>
            </div>
          </div>

          {accountsData[activeTab].status === 'desconectado' && (
            <button className="reconnect-button">🔄 Reconectar</button>
          )}
        </div>

        {accountsData[activeTab].posts > 0 && (
          <div className="account-posts">
            <h3>Posts Recentes</h3>
            <div className="posts-grid-profile">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="post-thumbnail">
                  <img
                    src={`https://images.unsplash.com/photo-${1611162617474 + i}?w=200`}
                    alt={`post-${i}`}
                  />
                  <div className="post-overlay">
                    <span>❤️ {Math.floor(Math.random() * 5000)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
