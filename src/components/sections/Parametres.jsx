import { useState } from 'react';
import { Building2, Users, FileText, Bell, Shield } from 'lucide-react';
import { etablissement, competences } from '../../data/mockData';

export default function Parametres() {
  const [activeTab, setActiveTab] = useState('etablissement');

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Paramètres</h1>
        <p className="page-subtitle">Configuration de l'application</p>
      </div>

      <div className="tabs">
        <button className={`tab ${activeTab === 'etablissement' ? 'active' : ''}`} onClick={() => setActiveTab('etablissement')}>
          <Building2 size={16} style={{ marginRight: '8px' }} />
          Établissement
        </button>
        <button className={`tab ${activeTab === 'utilisateurs' ? 'active' : ''}`} onClick={() => setActiveTab('utilisateurs')}>
          <Users size={16} style={{ marginRight: '8px' }} />
          Utilisateurs
        </button>
        <button className={`tab ${activeTab === 'modeles' ? 'active' : ''}`} onClick={() => setActiveTab('modeles')}>
          <FileText size={16} style={{ marginRight: '8px' }} />
          Modèles
        </button>
        <button className={`tab ${activeTab === 'roles' ? 'active' : ''}`} onClick={() => setActiveTab('roles')}>
          <Shield size={16} style={{ marginRight: '8px' }} />
          Rôles & Permissions
        </button>
        <button className={`tab ${activeTab === 'notifications' ? 'active' : ''}`} onClick={() => setActiveTab('notifications')}>
          <Bell size={16} style={{ marginRight: '8px' }} />
          Notifications
        </button>
      </div>

      {activeTab === 'etablissement' && (
        <div className="chart-card">
          <h3 className="chart-title">Informations de l'établissement</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
            <div className="form-group">
              <label className="form-label">Nom de l'établissement</label>
              <input type="text" className="form-input" defaultValue={etablissement.nom} />
            </div>
            <div className="form-group">
              <label className="form-label">Téléphone</label>
              <input type="text" className="form-input" defaultValue={etablissement.telephone} />
            </div>
            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <label className="form-label">Adresse</label>
              <input type="text" className="form-input" defaultValue={etablissement.adresse} />
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input type="email" className="form-input" defaultValue={etablissement.email} />
            </div>
            <div className="form-group">
              <label className="form-label">Année scolaire en cours</label>
              <select className="form-select" defaultValue={etablissement.anneeScolaire}>
                <option value="2025-2026">2025-2026</option>
                <option value="2024-2025">2024-2025</option>
              </select>
            </div>
          </div>
          <div style={{ marginTop: '20px' }}>
            <button className="btn btn-primary">Enregistrer</button>
          </div>
        </div>
      )}

      {activeTab === 'utilisateurs' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <h3 className="chart-title">Gestion des utilisateurs</h3>
            <button className="btn btn-primary">Nouvel utilisateur</button>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Nom d'utilisateur</th>
                <th>Rôle</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Abdelkader Benhima</td>
                <td style={{ fontFamily: 'monospace' }}>admin</td>
                <td><span className="badge badge-danger">Administrateur</span></td>
                <td>admin@ecole-alamal.ma</td>
                <td>
                  <div className="actions-cell">
                    <button className="action-btn">Modifier</button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>Tarik Moulin</td>
                <td style={{ fontFamily: 'monospace' }}>comptable</td>
                <td><span className="badge badge-warning">Comptable</span></td>
                <td>tarik.moulin@ecole-alamal.ma</td>
                <td>
                  <div className="actions-cell">
                    <button className="action-btn">Modifier</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'modeles' && (
        <div className="chart-card">
          <h3 className="chart-title">Modèles de documents</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginTop: '20px' }}>
            <div style={{ padding: '16px', background: 'var(--bg)', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <FileText size={24} color="var(--primary)" />
              <div>
                <h4 style={{ fontSize: '0.95rem', marginBottom: '2px' }}>Modèle de facture</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Format PDF personnalisable</p>
              </div>
              <button className="btn btn-secondary btn-sm" style={{ marginLeft: 'auto' }}>Modifier</button>
            </div>
            <div style={{ padding: '16px', background: 'var(--bg)', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <FileText size={24} color="var(--accent)" />
              <div>
                <h4 style={{ fontSize: '0.95rem', marginBottom: '2px' }}>Modèle de bulletin</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Format PDF personnalisable</p>
              </div>
              <button className="btn btn-secondary btn-sm" style={{ marginLeft: 'auto' }}>Modifier</button>
            </div>
            <div style={{ padding: '16px', background: 'var(--bg)', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <FileText size={24} color="var(--success)" />
              <div>
                <h4 style={{ fontSize: '0.95rem', marginBottom: '2px' }}>Modèle de reçu</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Format PDF personnalisable</p>
              </div>
              <button className="btn btn-secondary btn-sm" style={{ marginLeft: 'auto' }}>Modifier</button>
            </div>
            <div style={{ padding: '16px', background: 'var(--bg)', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <FileText size={24} color="var(--danger)" />
              <div>
                <h4 style={{ fontSize: '0.95rem', marginBottom: '2px' }}>Modèle de convocation</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Format PDF personnalisable</p>
              </div>
              <button className="btn btn-secondary btn-sm" style={{ marginLeft: 'auto' }}>Modifier</button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'roles' && (
        <div>
          <h3 className="chart-title" style={{ marginBottom: '20px' }}>Rôles et permissions</h3>
          <div className="card-grid">
            {competences.map((comp) => (
              <div key={comp.id} className="info-card">
                <div className="info-card-header">
                  <div className="info-card-icon" style={{ 
                    background: comp.id === 1 ? 'rgba(231, 111, 81, 0.1)' : 
                                comp.id === 2 ? 'rgba(30, 58, 95, 0.1)' :
                                'rgba(42, 157, 143, 0.1)',
                    color: comp.id === 1 ? 'var(--danger)' : 
                          comp.id === 2 ? 'var(--primary)' : 'var(--success)'
                  }}>
                    <Shield size={22} />
                  </div>
                  <div>
                    <h3>{comp.nom}</h3>
                  </div>
                </div>
                <div style={{ fontSize: '0.85rem' }}>
                  <h4 style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>Permissions:</h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {comp.permissions.map((perm, idx) => (
                      <span key={idx} className="badge badge-info" style={{ fontSize: '0.7rem' }}>
                        {perm}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'notifications' && (
        <div className="chart-card">
          <h3 className="chart-title">Paramètres de notification</h3>
          <div style={{ marginTop: '20px' }}>
            <div style={{ padding: '16px', background: 'var(--bg)', borderRadius: '12px', marginBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 style={{ fontSize: '0.95rem', marginBottom: '4px' }}>Notifications par email</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    Envoyer les notifications par email aux parents
                  </p>
                </div>
                <input type="checkbox" defaultChecked style={{ width: '20px', height: '20px' }} />
              </div>
            </div>
            <div style={{ padding: '16px', background: 'var(--bg)', borderRadius: '12px', marginBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 style={{ fontSize: '0.95rem', marginBottom: '4px' }}>Notifications SMS</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    Envoyer des SMS pour les alertes importantes
                  </p>
                </div>
                <input type="checkbox" style={{ width: '20px', height: '20px' }} />
              </div>
            </div>
            <div style={{ padding: '16px', background: 'var(--bg)', borderRadius: '12px', marginBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 style={{ fontSize: '0.95rem', marginBottom: '4px' }}>Rappels de paiement</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    Envoyer des rappels automatiques pour les factures impayées
                  </p>
                </div>
                <input type="checkbox" defaultChecked style={{ width: '20px', height: '20px' }} />
              </div>
            </div>
            <div style={{ padding: '16px', background: 'var(--bg)', borderRadius: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 style={{ fontSize: '0.95rem', marginBottom: '4px' }}>Alertes de présence</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    Notifier les parents en cas d'absence de l'élève
                  </p>
                </div>
                <input type="checkbox" defaultChecked style={{ width: '20px', height: '20px' }} />
              </div>
            </div>
          </div>
          <div style={{ marginTop: '20px' }}>
            <button className="btn btn-primary">Enregistrer</button>
          </div>
        </div>
      )}
    </div>
  );
}
