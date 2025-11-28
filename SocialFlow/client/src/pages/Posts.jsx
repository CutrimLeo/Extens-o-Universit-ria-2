import React, { useState, useRef } from 'react';
import toast from 'react-hot-toast';
import '../styles/Posts.css';

const Posts = ({ user, token }) => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: 'Novo Produto Lançado',
      description: 'Confira nosso novo produto revolucionário! 🚀',
      imageUrl: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400',
      platforms: ['instagram', 'facebook'],
      status: 'published',
      createdAt: new Date(Date.now() - 3600000),
      metrics: { likes: 1243, comments: 89, shares: 45 }
    }
  ]);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: null,
    platforms: [],
    scheduledAt: null
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const platforms = [
    { id: 'instagram', name: 'Instagram', icon: '📷', color: '#E4405F' },
    { id: 'facebook', name: 'Facebook', icon: '👍', color: '#1877F2' },
    { id: 'linkedin', name: 'LinkedIn', icon: '💼', color: '#0A66C2' },
    { id: 'tiktok', name: 'TikTok', icon: '🎵', color: '#000000' }
  ];

  const handleImageChange = (e) => {
    const file = e.target.files;
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setFormData(prev => ({ ...prev, image: null }));
    setImagePreview(null);
    fileInputRef.current.value = '';
  };

  const togglePlatform = (platformId) => {
    setFormData(prev => ({
      ...prev,
      platforms: prev.platforms.includes(platformId)
        ? prev.platforms.filter(p => p !== platformId)
        : [...prev.platforms, platformId]
    }));
  };

  const handlePublish = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.description || !imagePreview || formData.platforms.length === 0) {
      toast.error('Preencha todos os campos');
      return;
    }

    setLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      const newPost = {
        id: posts.length + 1,
        title: formData.title,
        description: formData.description,
        imageUrl: imagePreview,
        platforms: formData.platforms,
        status: 'published',
        createdAt: new Date(),
        metrics: { likes: 0, comments: 0, shares: 0 }
      };

      setPosts(prev => [newPost, ...prev]);
      setFormData({ title: '', description: '', image: null, platforms: [], scheduledAt: null });
      setImagePreview(null);

      toast.success(`Post publicado em ${formData.platforms.join(', ')}!`);
    } catch (error) {
      toast.error('Erro ao publicar post');
    } finally {
      setLoading(false);
    }
  };

  const optimizationTips = {
    instagram: ['Melhor horário: 18h-21h', 'Use 15-30 hashtags', 'Filtro recomendado: Valencia'],
    facebook: ['Formato: Carrossel', 'CTA: Saiba Mais', 'Público: 25-45 anos'],
    linkedin: ['Tom profissional', 'Foco em valor', 'Melhor dia: Terça/Quinta'],
    tiktok: ['Vertical (9:16)', 'Música trending', 'Duração: 15-30s']
  };

  return (
    <div className="posts-container">
      <div className="posts-header">
        <h1 className="posts-title">Criar Novo Post</h1>
        <p className="posts-subtitle">Publique em múltiplas plataformas simultaneamente</p>
      </div>

      <div className="posts-form-section">
        <form onSubmit={handlePublish} className="posts-form">
          <div className="form-group">
            <label>Imagem do Post</label>
            {!imagePreview ? (
              <div className="image-upload" onClick={() => fileInputRef.current?.click()}>
                <div className="upload-content">
                  <span className="upload-icon">📸</span>
                  <p>Clique ou arraste uma imagem</p>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  hidden
                />
              </div>
            ) : (
              <div className="image-preview">
                <img src={imagePreview} alt="preview" />
                <button
                  type="button"
                  className="remove-image-btn"
                  onClick={handleRemoveImage}
                >
                  ✕
                </button>
              </div>
            )}
          </div>

          <div className="form-group">
            <label>Título do Post</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Título do post..."
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>Descrição</label>
            <div className="textarea-wrapper">
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Escreva a descrição do seu post..."
                className="form-textarea"
                maxLength={280}
              />
              <span className="char-count">{formData.description.length}/280</span>
            </div>
          </div>

          <div className="form-group">
            <label>Selecione as Redes Sociais</label>
            <div className="platforms-selection">
              {platforms.map(platform => (
                <button
                  key={platform.id}
                  type="button"
                  className={`platform-card ${formData.platforms.includes(platform.id) ? 'selected' : ''}`}
                  onClick={() => togglePlatform(platform.id)}
                >
                  <span className="platform-icon">{platform.icon}</span>
                  <span className="platform-label">{platform.name}</span>
                </button>
              ))}
            </div>
          </div>

          {formData.platforms.length > 0 && (
            <div className="optimization-section">
              <div className="optimization-header">
                <span className="optimization-icon">🤖</span>
                <h3>Otimização Automática</h3>
              </div>
              <p className="optimization-text">
                Nosso sistema analisará as métricas atuais e otimizará automaticamente seu post
              </p>
              <div className="optimization-tips">
                {formData.platforms.map(platformId => (
                  <div key={platformId} className="optimization-card">
                    <h4>{platformId.charAt(0).toUpperCase() + platformId.slice(1)}</h4>
                    <ul>
                      {optimizationTips[platformId].map((tip, idx) => (
                        <li key={idx}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            type="submit"
            className="publish-button"
            disabled={loading || !imagePreview || !formData.description}
          >
            {loading ? (
              <>
                <span className="spinner-small"></span>
                Publicando...
              </>
            ) : (
              <>🚀 Publicar Agora</>
            )}
          </button>
        </form>
      </div>

      <div className="recent-posts-section">
        <h2>Posts Recentes</h2>
        <div className="posts-grid">
          {posts.map(post => (
            <div key={post.id} className="post-card">
              <img src={post.imageUrl} alt={post.title} className="post-image" />
              <div className="post-content">
                <h3>{post.title}</h3>
                <p>{post.description.substring(0, 50)}...</p>
                <div className="post-platforms">
                  {post.platforms.map(p => (
                    <span key={p} className="platform-badge">{p}</span>
                  ))}
                </div>
                <div className="post-metrics">
                  <span>❤️ {post.metrics.likes}</span>
                  <span>💬 {post.metrics.comments}</span>
                  <span>↗️ {post.metrics.shares}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Posts;
