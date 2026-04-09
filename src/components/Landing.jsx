import { useState } from 'react';

export default function Landing({ onLoginClick }) {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: '👨‍🎓',
      title: 'Gestion des Élèves',
      description: 'Suivez les dossiers scolaires, absences, notes et bulletins de vos élèves en temps réel.'
    },
    {
      icon: '👨‍🏫',
      title: 'Espace Enseignants',
      description: 'Gérez vos cours, emplois du temps, évaluations et saisissez les notes facilement.'
    },
    {
      icon: '💰',
      title: 'Finance & Facturation',
      description: 'Automatisez la gestion des frais de scolarité, factures et paiements en dirhams.'
    },
    {
      icon: '🚌',
      title: 'Transport Scolaire',
      description: 'Suivez les itinéraires, véhicules et arrêts du transport scolaire.'
    },
    {
      icon: '📅',
      title: 'Agenda & Événements',
      description: 'Planifiez les événements, examens et réunions parents-profs.'
    },
    {
      icon: '📊',
      title: 'Tableaux de Bord',
      description: 'Visualisez les statistiques et KPIs de votre établissement en un clin d\'œil.'
    }
  ];

  const stats = [
    { value: '20+', label: 'Élèves Inscrits' },
    { value: '10+', label: 'Enseignants' },
    { value: '5000+', label: 'MAD / Mois' },
    { value: '99%', label: 'Taux de Satisfaction' }
  ];

  return (
    <div className="landing-page">
      <nav className="landing-nav">
        <div className="landing-nav-brand">
          <span className="landing-logo">🏫</span>
          <span className="landing-brand-text">ClassConnect</span>
        </div>
        <div className="landing-nav-links">
          <a href="#features">Fonctionnalités</a>
          <a href="#pricing">Tarifs</a>
          <a href="#contact">Contact</a>
        </div>
        <button className="landing-btn landing-btn-primary" onClick={onLoginClick}>
          Connexion
        </button>
      </nav>

      <section className="landing-hero">
        <div className="landing-hero-content">
          <h1 className="landing-hero-title">
            Gérez votre établissement scolaire<br />
            <span className="landing-highlight">en toute simplicité</span>
          </h1>
          <p className="landing-hero-subtitle">
            La solution complète de gestion scolaire pour les écoles marocaines.
            Suivez les élèves, enseignants, finances et transport dans une seule application.
          </p>
          <div className="landing-hero-buttons">
            <button className="landing-btn landing-btn-primary landing-btn-large" onClick={onLoginClick}>
              Commencer Maintenant
            </button>
            <button className="landing-btn landing-btn-secondary landing-btn-large">
              Voir la Démo
            </button>
          </div>
          <div className="landing-hero-stats">
            {stats.map((stat, index) => (
              <div key={index} className="landing-stat">
                <span className="landing-stat-value">{stat.value}</span>
                <span className="landing-stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="landing-hero-visual">
          <div className="landing-dashboard-preview">
            <div className="landing-preview-header">
              <div className="landing-preview-dots">
                <span></span><span></span><span></span>
              </div>
            </div>
            <div className="landing-preview-content">
              <div className="landing-preview-sidebar">
                <div className="landing-preview-nav-item active"></div>
                <div className="landing-preview-nav-item"></div>
                <div className="landing-preview-nav-item"></div>
                <div className="landing-preview-nav-item"></div>
              </div>
              <div className="landing-preview-main">
                <div className="landing-preview-kpi"></div>
                <div className="landing-preview-kpi"></div>
                <div className="landing-preview-kpi"></div>
                <div className="landing-preview-chart"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="landing-features" id="features">
        <div className="landing-section-header">
          <h2>Tout ce dont vous avez besoin</h2>
          <p>Une solution complète pour gérer efficacement votre établissement</p>
        </div>
        <div className="landing-features-grid">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`landing-feature-card ${activeFeature === index ? 'active' : ''}`}
              onMouseEnter={() => setActiveFeature(index)}
            >
              <span className="landing-feature-icon">{feature.icon}</span>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="landing-cta">
        <div className="landing-cta-content">
          <h2>Prêt à moderniser votre gestion scolaire ?</h2>
          <p>Rejoignez les établissements qui font confiance à ClassConnect</p>
          <button className="landing-btn landing-btn-accent landing-btn-large" onClick={onLoginClick}>
            Créer un Compte Gratuit
          </button>
        </div>
      </section>

      <section className="landing-pricing" id="pricing">
        <div className="landing-section-header">
          <h2>Tarifs Abordables</h2>
          <p>Des forfaits adaptés à la taille de votre établissement</p>
        </div>
        <div className="landing-pricing-grid">
          <div className="landing-pricing-card">
            <h3>Essentiel</h3>
            <div className="landing-pricing-price">
              <span className="landing-pricing-currency">MAD</span>
              <span className="landing-pricing-amount">500</span>
              <span className="landing-pricing-period">/mois</span>
            </div>
            <ul className="landing-pricing-features">
              <li>✓ Jusqu'à 50 élèves</li>
              <li>✓ Gestion des notes</li>
              <li>✓ Bulletins automatiques</li>
              <li>✓ Support par email</li>
            </ul>
            <button className="landing-btn landing-btn-secondary">Choisir</button>
          </div>
          <div className="landing-pricing-card featured">
            <span className="landing-pricing-badge">Populaire</span>
            <h3>Professionnel</h3>
            <div className="landing-pricing-price">
              <span className="landing-pricing-currency">MAD</span>
              <span className="landing-pricing-amount">1 500</span>
              <span className="landing-pricing-period">/mois</span>
            </div>
            <ul className="landing-pricing-features">
              <li>✓ Jusqu'à 200 élèves</li>
              <li>✓ Tout d'Essentiel</li>
              <li>✓ Transport scolaire</li>
              <li>✓ Rapports avancés</li>
              <li>✓ Support prioritaire</li>
            </ul>
            <button className="landing-btn landing-btn-primary">Choisir</button>
          </div>
          <div className="landing-pricing-card">
            <h3>Entreprise</h3>
            <div className="landing-pricing-price">
              <span className="landing-pricing-amount landing-pricing-custom">Sur devis</span>
            </div>
            <ul className="landing-pricing-features">
              <li>✓ Élèves illimités</li>
              <li>✓ Tout de Professionnel</li>
              <li>✓ Multi-établissements</li>
              <li>✓ API personnalisée</li>
              <li>✓ Support dédié</li>
            </ul>
            <button className="landing-btn landing-btn-secondary">Contacter</button>
          </div>
        </div>
      </section>

      <footer className="landing-footer">
        <div className="landing-footer-content">
          <div className="landing-footer-brand">
            <span className="landing-logo">🏫</span>
            <span>ClassConnect</span>
            <p>La solution de gestion scolaire faite pour le Maroc</p>
          </div>
          <div className="landing-footer-links">
            <div className="landing-footer-column">
              <h4>Produit</h4>
              <a href="#features">Fonctionnalités</a>
              <a href="#pricing">Tarifs</a>
              <a href="#">Documentation</a>
            </div>
            <div className="landing-footer-column">
              <h4>Entreprise</h4>
              <a href="#">À propos</a>
              <a href="#">Blog</a>
              <a href="#">Carrières</a>
            </div>
            <div className="landing-footer-column">
              <h4>Support</h4>
              <a href="#">Centre d'aide</a>
              <a href="#contact">Contact</a>
              <a href="#">Statut du service</a>
            </div>
          </div>
        </div>
        <div className="landing-footer-bottom">
          <p>© 2024 ClassConnect. Tous droits réservés.</p>
          <p>Fait avec ❤️ au Maroc 🇲🇦</p>
        </div>
      </footer>

      <style>{`
        .landing-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #F8F9FC 0%, #EEF1F8 100%);
        }

        .landing-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 60px;
          background: white;
          box-shadow: 0 2px 20px rgba(30, 58, 95, 0.08);
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .landing-nav-brand {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .landing-logo {
          font-size: 32px;
        }

        .landing-brand-text {
          font-family: 'DM Serif Display', serif;
          font-size: 24px;
          color: #1E3A5F;
          font-weight: 700;
        }

        .landing-nav-links {
          display: flex;
          gap: 40px;
        }

        .landing-nav-links a {
          color: #64748B;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.2s;
        }

        .landing-nav-links a:hover {
          color: #1E3A5F;
        }

        .landing-btn {
          padding: 12px 24px;
          border-radius: 10px;
          font-weight: 600;
          font-size: 15px;
          cursor: pointer;
          transition: all 0.3s;
          border: none;
        }

        .landing-btn-primary {
          background: #1E3A5F;
          color: white;
        }

        .landing-btn-primary:hover {
          background: #2A4A73;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(30, 58, 95, 0.3);
        }

        .landing-btn-secondary {
          background: white;
          color: #1E3A5F;
          border: 2px solid #1E3A5F;
        }

        .landing-btn-secondary:hover {
          background: #F0F4F8;
        }

        .landing-btn-accent {
          background: #F4A261;
          color: white;
        }

        .landing-btn-accent:hover {
          background: #E8935A;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(244, 162, 97, 0.3);
        }

        .landing-btn-large {
          padding: 16px 32px;
          font-size: 17px;
        }

        .landing-hero {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          padding: 80px 60px;
          max-width: 1400px;
          margin: 0 auto;
          align-items: center;
        }

        .landing-hero-title {
          font-family: 'DM Serif Display', serif;
          font-size: 48px;
          color: #1E3A5F;
          line-height: 1.2;
          margin-bottom: 24px;
        }

        .landing-highlight {
          color: #F4A261;
        }

        .landing-hero-subtitle {
          font-size: 18px;
          color: #64748B;
          line-height: 1.7;
          margin-bottom: 40px;
        }

        .landing-hero-buttons {
          display: flex;
          gap: 20px;
          margin-bottom: 60px;
        }

        .landing-hero-stats {
          display: flex;
          gap: 50px;
        }

        .landing-stat {
          display: flex;
          flex-direction: column;
        }

        .landing-stat-value {
          font-family: 'DM Serif Display', serif;
          font-size: 36px;
          color: #1E3A5F;
          font-weight: 700;
        }

        .landing-stat-label {
          font-size: 14px;
          color: #64748B;
        }

        .landing-hero-visual {
          display: flex;
          justify-content: center;
        }

        .landing-dashboard-preview {
          width: 100%;
          max-width: 500px;
          background: white;
          border-radius: 16px;
          box-shadow: 0 20px 60px rgba(30, 58, 95, 0.15);
          overflow: hidden;
        }

        .landing-preview-header {
          background: #F1F5F9;
          padding: 12px 16px;
        }

        .landing-preview-dots {
          display: flex;
          gap: 8px;
        }

        .landing-preview-dots span {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #CBD5E1;
        }

        .landing-preview-dots span:first-child { background: #EF4444; }
        .landing-preview-dots span:nth-child(2) { background: #F59E0B; }
        .landing-preview-dots span:nth-child(3) { background: #22C55E; }

        .landing-preview-content {
          display: flex;
          height: 300px;
        }

        .landing-preview-sidebar {
          width: 60px;
          background: #1E3A5F;
          padding: 20px 10px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .landing-preview-nav-item {
          height: 40px;
          background: rgba(255,255,255,0.1);
          border-radius: 8px;
        }

        .landing-preview-nav-item.active {
          background: rgba(255,255,255,0.2);
        }

        .landing-preview-main {
          flex: 1;
          padding: 20px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-template-rows: auto 1fr;
          gap: 16px;
        }

        .landing-preview-kpi {
          background: #F8FAFC;
          border-radius: 8px;
          height: 60px;
        }

        .landing-preview-chart {
          grid-column: 1 / -1;
          background: linear-gradient(135deg, #1E3A5F 0%, #2A4A73 100%);
          border-radius: 12px;
        }

        .landing-features {
          padding: 100px 60px;
          background: white;
        }

        .landing-section-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .landing-section-header h2 {
          font-family: 'DM Serif Display', serif;
          font-size: 36px;
          color: #1E3A5F;
          margin-bottom: 16px;
        }

        .landing-section-header p {
          font-size: 18px;
          color: #64748B;
        }

        .landing-features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .landing-feature-card {
          background: #F8FAFC;
          padding: 32px;
          border-radius: 16px;
          transition: all 0.3s;
          cursor: pointer;
          border: 2px solid transparent;
        }

        .landing-feature-card:hover,
        .landing-feature-card.active {
          background: white;
          border-color: #F4A261;
          box-shadow: 0 10px 40px rgba(30, 58, 95, 0.1);
          transform: translateY(-4px);
        }

        .landing-feature-icon {
          font-size: 48px;
          display: block;
          margin-bottom: 20px;
        }

        .landing-feature-card h3 {
          font-family: 'DM Serif Display', serif;
          font-size: 20px;
          color: #1E3A5F;
          margin-bottom: 12px;
        }

        .landing-feature-card p {
          color: #64748B;
          line-height: 1.6;
        }

        .landing-cta {
          background: linear-gradient(135deg, #1E3A5F 0%, #2A4A73 100%);
          padding: 100px 60px;
          text-align: center;
        }

        .landing-cta h2 {
          font-family: 'DM Serif Display', serif;
          font-size: 36px;
          color: white;
          margin-bottom: 16px;
        }

        .landing-cta p {
          font-size: 18px;
          color: rgba(255,255,255,0.8);
          margin-bottom: 40px;
        }

        .landing-pricing {
          padding: 100px 60px;
          background: #F8F9FC;
        }

        .landing-pricing-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
          max-width: 1000px;
          margin: 0 auto;
        }

        .landing-pricing-card {
          background: white;
          padding: 40px;
          border-radius: 20px;
          text-align: center;
          position: relative;
          border: 2px solid #E2E8F0;
        }

        .landing-pricing-card.featured {
          border-color: #F4A261;
          transform: scale(1.05);
          box-shadow: 0 20px 60px rgba(244, 162, 97, 0.2);
        }

        .landing-pricing-badge {
          position: absolute;
          top: -12px;
          left: 50%;
          transform: translateX(-50%);
          background: #F4A261;
          color: white;
          padding: 4px 16px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
        }

        .landing-pricing-card h3 {
          font-family: 'DM Serif Display', serif;
          font-size: 24px;
          color: #1E3A5F;
          margin-bottom: 20px;
        }

        .landing-pricing-price {
          margin-bottom: 30px;
        }

        .landing-pricing-currency {
          font-size: 18px;
          color: #64748B;
          vertical-align: top;
        }

        .landing-pricing-amount {
          font-family: 'DM Serif Display', serif;
          font-size: 48px;
          color: #1E3A5F;
          font-weight: 700;
        }

        .landing-pricing-period {
          font-size: 16px;
          color: #64748B;
        }

        .landing-pricing-custom {
          font-family: 'DM Sans', sans-serif;
          font-size: 28px;
          font-weight: 700;
          color: #F4A261;
        }

        .landing-pricing-features {
          list-style: none;
          margin-bottom: 30px;
        }

        .landing-pricing-features li {
          padding: 10px 0;
          color: #475569;
          border-bottom: 1px solid #F1F5F9;
        }

        .landing-footer {
          background: #1E3A5F;
          color: white;
          padding: 80px 60px 30px;
        }

        .landing-footer-content {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 60px;
          max-width: 1200px;
          margin: 0 auto 60px;
        }

        .landing-footer-brand {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 8px;
        }

        .landing-footer-brand span:first-of-type {
          font-size: 24px;
        }

        .landing-footer-brand span:nth-of-type(2) {
          font-family: 'DM Serif Display', serif;
          font-size: 20px;
        }

        .landing-footer-brand p {
          margin-top: 16px;
          color: rgba(255,255,255,0.7);
          font-size: 14px;
        }

        .landing-footer-links {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 40px;
        }

        .landing-footer-column h4 {
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 20px;
          color: #F4A261;
        }

        .landing-footer-column a {
          display: block;
          color: rgba(255,255,255,0.8);
          text-decoration: none;
          padding: 6px 0;
          font-size: 14px;
          transition: color 0.2s;
        }

        .landing-footer-column a:hover {
          color: white;
        }

        .landing-footer-bottom {
          border-top: 1px solid rgba(255,255,255,0.1);
          padding-top: 30px;
          display: flex;
          justify-content: space-between;
          max-width: 1200px;
          margin: 0 auto;
          font-size: 14px;
          color: rgba(255,255,255,0.6);
        }

        @media (max-width: 1024px) {
          .landing-hero,
          .landing-features-grid,
          .landing-pricing-grid {
            grid-template-columns: 1fr;
          }

          .landing-hero-visual {
            order: -1;
          }

          .landing-nav {
            padding: 15px 30px;
          }

          .landing-nav-links {
            display: none;
          }

          .landing-hero,
          .landing-features,
          .landing-cta,
          .landing-pricing {
            padding: 60px 30px;
          }

          .landing-hero-stats {
            flex-wrap: wrap;
            gap: 30px;
          }
        }
      `}</style>
    </div>
  );
}
