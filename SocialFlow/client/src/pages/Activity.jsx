import React, { useState } from 'react';
import '../styles/Activity.css';

const Activity = ({ user, token }) => {
  const [activities] = useState([
    {
      id: 1,
      type: 'success',
      title: 'Post publicado com sucesso',
      description: 'Post foi publicado no Instagram, Facebook e LinkedIn',
      platforms: ['instagram', 'facebook', 'linkedin'],
      timestamp: new Date(Date.now() - 3600000),
      color: '#00C851'
    },
    {
      id: 2,
      type: 'scheduled',
      title: 'Post agendado',
      description: 'Post será publicado amanhã às 18h',
      platforms: ['tiktok'],
      timestamp: new Date(Date.now() - 7200000),
      color: '#DAA520'
    },
    {
      id: 3,
      type: 'error',
      title: 'Falha na publicação',
      description: 'Erro ao publicar no LinkedIn - Token expirado',
      platforms: ['linkedin'],
      timestamp: new Date(Date.now() - 86400000),
      color: '#FF4444'
    },
    {
      id: 4,
      type: 'success',
      title: 'Conta conectada',
      description: 'Instagram conectado com sucesso',
      platforms: ['instagram'],
      timestamp: new Date(Date.now() - 172800000),
      color: '#00C851'
    }
  ]);

  const [filters, setFilters] = useState({
    platform: 'all',
    period: '7days'
  });

  const formatTime = (date) => {
    const now = new Date();
    const diff = now - date;
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (hours < 1) return 'Há poucos minutos';
    if (hours < 24) return `Há ${hours}h`;
    if (days < 7) return `Há ${days}d`;
    return date.toLocaleDateString('pt-BR');
  };

  return (
    <div className="activity-container">
      <div className="activity-header">
        <h1>Atividades Recentes</h1>
        
        <div className="activity-filters">
          <select
            value={filters.platform}
            onChange={(e) => setFilters(prev => ({ ...prev, platform: e.target.value }))}
            className="filter-select"
          >
            <option value="all">Todas as plataformas</option>
            <option value="instagram">Instagram</option>
            <option value="facebook">Facebook</option>
            <option value="linkedin">LinkedIn</option>
            <option value="tiktok">TikTok</option>
          </select>

          <select
            value={filters.period}
            onChange={(e) => setFilters(prev => ({ ...prev, period: e.target.value }))}
            className="filter-select"
          >
            <option value="today">Hoje</option>
            <option value="7days">Últimos 7 dias</option>
            <option value="30days">Últimos 30 dias</option>
            <option value="all">Todo o período</option>
          </select>
        </div>
      </div>

      <div className="activity-timeline">
        {activities.map((activity, index) => (
          <div key={activity.id} className="activity-item animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
            <div className="timeline-marker" style={{ backgroundColor: activity.color }}></div>
            
            <div className="activity-card">
              <div className="activity-title-section">
                <h3>{activity.title}</h3>
                <span className="activity-time">{formatTime(activity.timestamp)}</span>
              </div>

              <p className="activity-description">{activity.description}</p>

              <div className="activity-platforms">
                {activity.platforms.map(platform => (
                  <span key={platform} className="platform-badge-activity">
                    {platform.charAt(0).toUpperCase() + platform.slice(1)}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Activity;
