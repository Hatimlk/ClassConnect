import { useState } from 'react';

export default function Login({ onBackToLanding, onLoginSuccess }) {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const demoUsers = [
    { username: 'admin', role: 'Administrateur', name: 'Abdelkader Benhima', color: '#1E3A5F' },
    { username: 'direction', role: 'Directeur', name: 'Karim Alaoui', color: '#2A9D8F' },
    { username: 'comptable', role: 'Comptable', name: 'Tarik Moulin', color: '#F4A261' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Identifiants incorrects');
      }

      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', data.token);
      onLoginSuccess(data.user);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = (username) => {
    setCredentials({ username, password: `${username}123` });
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <button className="login-back-btn" onClick={onBackToLanding}>
          <span>←</span> Retour
        </button>
        
        <div className="login-brand">
          <span className="login-logo">🏫</span>
          <span className="login-brand-text">ClassConnect</span>
        </div>

        <div className="login-form-container">
          <h1>Bienvenue</h1>
          <p className="login-subtitle">Connectez-vous à votre espace de gestion scolaire</p>

          {error && (
            <div className="login-error">
              <span>⚠️</span> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="login-field">
              <label>Nom d'utilisateur</label>
              <div className="login-input-wrapper">
                <span className="login-input-icon">👤</span>
                <input
                  type="text"
                  placeholder="Entrez votre nom d'utilisateur"
                  value={credentials.username}
                  onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="login-field">
              <label>Mot de passe</label>
              <div className="login-input-wrapper">
                <span className="login-input-icon">🔒</span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Entrez votre mot de passe"
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  required
                />
                <button 
                  type="button" 
                  className="login-password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            <div className="login-options">
              <label className="login-remember">
                <input type="checkbox" />
                <span>Se souvenir de moi</span>
              </label>
              <a href="#" className="login-forgot">Mot de passe oublié ?</a>
            </div>

            <button 
              type="submit" 
              className="login-submit-btn"
              disabled={loading}
            >
              {loading ? (
                <span className="login-spinner"></span>
              ) : (
                'Se Connecter'
              )}
            </button>
          </form>

          <div className="login-divider">
            <span>ou utiliser un compte démo</span>
          </div>

          <div className="login-demo-users">
            {demoUsers.map((user) => (
              <button
                key={user.username}
                className="login-demo-btn"
                onClick={() => handleDemoLogin(user.username)}
                style={{ '--user-color': user.color }}
              >
                <div className="login-demo-avatar">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="login-demo-info">
                  <span className="login-demo-name">{user.name}</span>
                  <span className="login-demo-role">{user.role}</span>
                </div>
                <span className="login-demo-arrow">→</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="login-right">
        <div className="login-right-content">
          <h2>Gestion Scolaire Simplifiée</h2>
          <p>Une plateforme complète pour gérer efficacement votre établissement scolaire au Maroc.</p>
          
          <div className="login-features">
            <div className="login-feature">
              <span className="login-feature-icon">📊</span>
              <span>Tableaux de bord en temps réel</span>
            </div>
            <div className="login-feature">
              <span className="login-feature-icon">💰</span>
              <span>Gestion financière en MAD</span>
            </div>
            <div className="login-feature">
              <span className="login-feature-icon">👨‍🎓</span>
              <span>Suivi des élèves et notes</span>
            </div>
            <div className="login-feature">
              <span className="login-feature-icon">🚌</span>
              <span>Transport scolaire</span>
            </div>
          </div>

          <div className="login-testimonial">
            <p>"ClassConnect a transformé notre façon de gérer l'école. Tout est maintenantcentralisé et accessible."</p>
            <span>— École Al Amal, Marrakech</span>
          </div>
        </div>

        <div className="login-right-decoration">
          <div className="login-circle login-circle-1"></div>
          <div className="login-circle login-circle-2"></div>
          <div className="login-circle login-circle-3"></div>
        </div>
      </div>

      <style>{`
        .login-page {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 100vh;
        }

        .login-left {
          background: white;
          padding: 40px;
          display: flex;
          flex-direction: column;
        }

        .login-back-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: none;
          border: none;
          color: #64748B;
          font-size: 14px;
          cursor: pointer;
          margin-bottom: 40px;
          width: fit-content;
          transition: color 0.2s;
        }

        .login-back-btn:hover {
          color: #1E3A5F;
        }

        .login-brand {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 60px;
        }

        .login-logo {
          font-size: 40px;
        }

        .login-brand-text {
          font-family: 'DM Serif Display', serif;
          font-size: 28px;
          color: #1E3A5F;
        }

        .login-form-container {
          max-width: 400px;
          margin: 0 auto;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .login-form-container h1 {
          font-family: 'DM Serif Display', serif;
          font-size: 32px;
          color: #1E3A5F;
          margin-bottom: 8px;
        }

        .login-subtitle {
          color: #64748B;
          margin-bottom: 40px;
        }

        .login-error {
          background: #FEF2F2;
          color: #DC2626;
          padding: 12px 16px;
          border-radius: 10px;
          margin-bottom: 24px;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
        }

        .login-form {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .login-field {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .login-field label {
          font-size: 14px;
          font-weight: 500;
          color: #374151;
        }

        .login-input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .login-input-icon {
          position: absolute;
          left: 16px;
          font-size: 18px;
        }

        .login-input-wrapper input {
          width: 100%;
          padding: 14px 16px 14px 48px;
          border: 2px solid #E5E7EB;
          border-radius: 10px;
          font-size: 15px;
          transition: border-color 0.2s;
          background: white;
        }

        .login-input-wrapper input:focus {
          outline: none;
          border-color: #1E3A5F;
        }

        .login-password-toggle {
          position: absolute;
          right: 16px;
          background: none;
          border: none;
          cursor: pointer;
          font-size: 18px;
        }

        .login-options {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .login-remember {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          color: #64748B;
          cursor: pointer;
        }

        .login-remember input {
          width: 18px;
          height: 18px;
          accent-color: #1E3A5F;
        }

        .login-forgot {
          font-size: 14px;
          color: #1E3A5F;
          text-decoration: none;
        }

        .login-submit-btn {
          background: #1E3A5F;
          color: white;
          padding: 16px;
          border: none;
          border-radius: 10px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 52px;
        }

        .login-submit-btn:hover:not(:disabled) {
          background: #2A4A73;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(30, 58, 95, 0.3);
        }

        .login-submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .login-spinner {
          width: 24px;
          height: 24px;
          border: 3px solid rgba(255,255,255,0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .login-divider {
          text-align: center;
          margin: 30px 0;
          position: relative;
        }

        .login-divider::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          height: 1px;
          background: #E5E7EB;
        }

        .login-divider span {
          background: white;
          padding: 0 16px;
          color: #64748B;
          font-size: 13px;
          position: relative;
        }

        .login-demo-users {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .login-demo-btn {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 12px 16px;
          background: #F8FAFC;
          border: 2px solid transparent;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s;
          text-align: left;
        }

        .login-demo-btn:hover {
          background: white;
          border-color: var(--user-color);
          transform: translateX(4px);
        }

        .login-demo-avatar {
          width: 44px;
          height: 44px;
          border-radius: 10px;
          background: var(--user-color);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 14px;
        }

        .login-demo-info {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .login-demo-name {
          font-weight: 600;
          color: #1E3A5F;
          font-size: 14px;
        }

        .login-demo-role {
          font-size: 12px;
          color: #64748B;
        }

        .login-demo-arrow {
          color: #CBD5E1;
          font-size: 18px;
          transition: transform 0.2s;
        }

        .login-demo-btn:hover .login-demo-arrow {
          transform: translateX(4px);
          color: var(--user-color);
        }

        .login-right {
          background: linear-gradient(135deg, #1E3A5F 0%, #2A4A73 100%);
          padding: 60px;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .login-right-content {
          position: relative;
          z-index: 2;
          color: white;
          max-width: 450px;
        }

        .login-right-content h2 {
          font-family: 'DM Serif Display', serif;
          font-size: 36px;
          margin-bottom: 16px;
        }

        .login-right-content > p {
          font-size: 18px;
          opacity: 0.9;
          margin-bottom: 50px;
          line-height: 1.6;
        }

        .login-features {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          margin-bottom: 50px;
        }

        .login-feature {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 15px;
        }

        .login-feature-icon {
          font-size: 24px;
        }

        .login-testimonial {
          background: rgba(255,255,255,0.1);
          padding: 24px;
          border-radius: 16px;
          backdrop-filter: blur(10px);
        }

        .login-testimonial p {
          font-style: italic;
          font-size: 16px;
          margin-bottom: 12px;
          line-height: 1.6;
        }

        .login-testimonial span {
          font-size: 14px;
          opacity: 0.8;
        }

        .login-right-decoration {
          position: absolute;
          inset: 0;
          overflow: hidden;
        }

        .login-circle {
          position: absolute;
          border-radius: 50%;
          background: rgba(255,255,255,0.05);
        }

        .login-circle-1 {
          width: 400px;
          height: 400px;
          top: -100px;
          right: -100px;
        }

        .login-circle-2 {
          width: 300px;
          height: 300px;
          bottom: -50px;
          left: -50px;
        }

        .login-circle-3 {
          width: 200px;
          height: 200px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        @media (max-width: 1024px) {
          .login-page {
            grid-template-columns: 1fr;
          }

          .login-right {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
