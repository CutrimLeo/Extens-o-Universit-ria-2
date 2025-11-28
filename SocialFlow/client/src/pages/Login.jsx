import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import '../styles/Login.css';

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [activePlatform, setActivePlatform] = useState(null);
  const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState({
    instagram: { username: '', password: '' },
    facebook: { username: '', password: '' },
    linkedin: { username: '', password: '' },
    tiktok: { username: '', password: '' }
  });

  const platforms = [
    { id: 'instagram', name: 'Instagram', icon: '📷', color: '#E4405F' },
    { id: 'facebook', name: 'Facebook', icon: '👍', color: '#1877F2' },
    { id: 'linkedin', name: 'LinkedIn', icon: '💼', color: '#0A66C2' },
    { id: 'tiktok', name: 'TikTok', icon: '🎵', color: '#000000' }
  ];

  const handleCredentialChange = (platform, field, value) => {
    setCredentials(prev => ({
      ...prev,
      [platform]: {
        ...prev[platform],
        [field]: value
      }
    }));
  };

  const handleConnect = async (platform) => {
    if (!credentials[platform].username || !credentials[platform].password) {
      toast.error('Preencha todos os campos');
      return;
    }

    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const userData = {
        id: Math.random().toString(36).substr(2, 9),
        name: 'Leonardo Cutrim',
        email: 'leonardo@example.com',
        platforms: [platform],
        avatar: 'L'
      };

      const token = 'mock_jwt_token_' + Date.now();
      onLogin(userData, token);
      
      toast.success(`${platform} conectado com sucesso!`);
      navigate('/dashboard');
    } catch (error) {
      toast.error('Erro ao conectar. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-background"></div>
      
      <div className="login-card">
        <div className="login-header">
          <h1 className="login-logo">SocialFlow</h1>
          <p className="login-subtitle">Conecte suas redes sociais</p>
        </div>

        <div className="platforms-grid">
          {platforms.map(platform => (
            <div key={platform.id} className="platform-wrapper">
              <button
                className={`platform-button ${activePlatform === platform.id ? 'active' : ''}`}
                onClick={() => setActivePlatform(activePlatform === platform.id ? null : platform.id)}
                style={{ borderColor: platform.color }}
                disabled={loading}
              >
                <span className="platform-icon">{platform.icon}</span>
                <span className="platform-name">{platform.name}</span>
              </button>

              {activePlatform === platform.id && (
                <div className="credential-form animate-slide-down">
                  <input
                    type="text"
                    placeholder="Usuário ou Email"
                    value={credentials[platform.id].username}
                    onChange={(e) => handleCredentialChange(platform.id, 'username', e.target.value)}
                    className="credential-input"
                  />
                  <input
                    type="password"
                    placeholder="Senha"
                    value={credentials[platform.id].password}
                    onChange={(e) => handleCredentialChange(platform.id, 'password', e.target.value)}
                    className="credential-input"
                  />
                  <button
                    className="connect-button"
                    onClick={() => handleConnect(platform.id)}
                    disabled={loading}
                  >
                    {loading ? <span className="spinner"></span> : 'Conectar'}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        <p className="login-footer">
          Seus dados são seguros e criptografados
        </p>
      </div>
    </div>
  );
};

export default Login;
