import { fraisScolarite } from '../../data/mockData';
import { DollarSign } from 'lucide-react';

export default function FraisScolarite() {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('fr-MA', { 
      style: 'currency', 
      currency: 'MAD',
      minimumFractionDigits: 0 
    }).format(value);
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Frais de Scolarité</h1>
        <p className="page-subtitle">Grille tarifaire par niveau</p>
      </div>

      <div className="card-grid">
        {fraisScolarite.map((frais, index) => (
          <div key={index} className="info-card" style={{ textAlign: 'center' }}>
            <div className="info-card-header" style={{ justifyContent: 'center' }}>
              <div className="info-card-icon" style={{ 
                background: 'rgba(42, 157, 143, 0.1)', 
                color: 'var(--success)',
                width: '60px',
                height: '60px'
              }}>
                <DollarSign size={28} />
              </div>
            </div>
            <h3 style={{ marginBottom: '16px', fontSize: '1.25rem' }}>{frais.niveau}</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ 
                padding: '16px', 
                background: 'var(--bg)', 
                borderRadius: '12px',
                border: '2px solid var(--primary)'
              }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                  Mensuel
                </div>
                <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--primary)' }}>
                  {formatCurrency(frais.montantMensuel)}
                </div>
              </div>
              
              <div style={{ padding: '12px', background: 'var(--bg)', borderRadius: '12px' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                  Trimestriel
                </div>
                <div style={{ fontSize: '1.1rem', fontWeight: '600' }}>
                  {formatCurrency(frais.montantTrimestriel)}
                </div>
              </div>
              
              <div style={{ padding: '12px', background: 'var(--bg)', borderRadius: '12px' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                  Annuel
                </div>
                <div style={{ fontSize: '1.1rem', fontWeight: '600' }}>
                  {formatCurrency(frais.montantAnnuel)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="chart-card" style={{ marginTop: '24px' }}>
        <h3 className="chart-title">Réductions disponibles</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginTop: '16px' }}>
          <div style={{ 
            flex: '1 1 200px',
            padding: '16px', 
            background: 'rgba(42, 157, 143, 0.1)', 
            borderRadius: '12px',
            borderLeft: '4px solid var(--success)'
          }}>
            <h4 style={{ fontSize: '0.95rem', marginBottom: '4px', color: 'var(--success)' }}>Réduction fratrie</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>-10% pour le 2ème enfant</p>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>-20% pour le 3ème enfant et plus</p>
          </div>
          
          <div style={{ 
            flex: '1 1 200px',
            padding: '16px', 
            background: 'rgba(244, 162, 97, 0.1)', 
            borderRadius: '12px',
            borderLeft: '4px solid var(--accent)'
          }}>
            <h4 style={{ fontSize: '0.95rem', marginBottom: '4px', color: 'var(--accent)' }}>Bourse d'études</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>-50% sur demande de bourse</p>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Critères sociaux appliqués</p>
          </div>
          
          <div style={{ 
            flex: '1 1 200px',
            padding: '16px', 
            background: 'rgba(30, 58, 95, 0.1)', 
            borderRadius: '12px',
            borderLeft: '4px solid var(--primary)'
          }}>
            <h4 style={{ fontSize: '0.95rem', marginBottom: '4px', color: 'var(--primary)' }}>Personnel</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>-30% pour les enfants du personnel</p>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Sur justificatif d'emploi</p>
          </div>
        </div>
      </div>

      <div className="chart-card" style={{ marginTop: '24px' }}>
        <h3 className="chart-title">Frais de transport</h3>
        <div style={{ marginTop: '16px', padding: '16px', background: 'var(--bg)', borderRadius: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h4 style={{ fontSize: '1rem', marginBottom: '4px' }}>Transport scolaire mensuel</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Zone urbaine (aller-retour)</p>
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--primary)' }}>
              800 MAD/mois
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
