import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../styles/Sidebar.css';

const Sidebar = ({ user, onLogout, isOpen, onToggle }) => {
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard/posts', icon: '📋', label: 'Posts', id: 'posts' },
    { path: '/dashboard/activity', icon: '📈', label: 'Atividade', id: 'activity' },
    { path: '/dashboard/profile', icon: '👤', label: 'Perfil', id: 'profile' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <button className="sidebar-toggle" onClick={onToggle}>
        {isOpen ? '✕' : '☰'}
      </button>

      <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-logo">
          <h2>SocialFlow</h2>
        </div>

        <nav className="sidebar-menu">
          {menuItems.map(item => (
            <Link
              key={item.id}
              to={item.path}
              className={`menu-item ${isActive(item.path) ? 'active' : ''}`}
            >
              <span className="menu-icon">{item.icon}</span>
              <span className="menu-label">{item.label}</span>
              {isActive(item.path) && <span className="menu-indicator"></span>}
            </Link>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="user-info">
            <div className="user-avatar">{user?.avatar || 'L'}</div>
            <div>
              <p className="user-name">{user?.name}</p>
              <p className="user-email">{user?.email}</p>
            </div>
          </div>

          <button className="logout-button" onClick={onLogout}>
            🚪 Sair
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
