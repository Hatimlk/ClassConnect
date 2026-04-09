import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Truck, MapPin, Clock, Users, AlertCircle } from 'lucide-react';
import Modal from '../Modal';

export default function Transport() {
  const { data } = useApp();
  const [activeTab, setActiveTab] = useState('vehicules');
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const vehicules = data.vehicules || [];
  const itineraires = data.itineraires || [];
  const eleves = data.eleves || [];

  const elevesTransport = eleves.filter(e => e.transport);

  const handleView = (item, type) => {
    setSelectedItem({ ...item, type });
    setShowDetailModal(true);
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Transport Scolaire</h1>
        <p className="page-subtitle">Gestion des véhicules, itinéraires et affectations</p>
      </div>

      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
        <div className="stat-card" style={{ flex: 1 }}>
          <div className="stat-icon blue">
            <Truck size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-label">Véhicules</div>
            <div className="stat-value">{vehicules.length}</div>
          </div>
        </div>
        <div className="stat-card" style={{ flex: 1 }}>
          <div className="stat-icon green">
            <MapPin size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-label">Itinéraires</div>
            <div className="stat-value">{itineraires.length}</div>
          </div>
        </div>
        <div className="stat-card" style={{ flex: 1 }}>
          <div className="stat-icon red">
            <Users size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-label">Élèves transportés</div>
            <div className="stat-value">{elevesTransport.length}</div>
          </div>
        </div>
      </div>

      <div className="tabs">
        <button className={`tab ${activeTab === 'vehicules' ? 'active' : ''}`} onClick={() => setActiveTab('vehicules')}>
          Véhicules
        </button>
        <button className={`tab ${activeTab === 'itinéraires' ? 'active' : ''}`} onClick={() => setActiveTab('itinéraires')}>
          Itinéraires
        </button>
        <button className={`tab ${activeTab === 'affectations' ? 'active' : ''}`} onClick={() => setActiveTab('affectations')}>
          Affectation élèves
        </button>
      </div>

      {activeTab === 'vehicules' && (
        <div className="card-grid">
          {vehicules.map((vehicule) => (
            <div key={vehicule.id} className="info-card">
              <div className="info-card-header">
                <div className="info-card-icon" style={{ 
                  background: vehicule.statut === 'En service' ? 'rgba(42, 157, 143, 0.1)' : 'rgba(231, 111, 81, 0.1)', 
                  color: vehicule.statut === 'En service' ? 'var(--success)' : 'var(--danger)'
                }}>
                  <Truck size={22} />
                </div>
                <div>
                  <h3>{vehicule.type}</h3>
                  <p>{vehicule.numero}</p>
                </div>
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                <p style={{ marginBottom: '8px' }}>
                  <strong>Immatriculation:</strong> {vehicule.immatriculation}
                </p>
                <p style={{ marginBottom: '8px' }}>
                  <strong>Capacité:</strong> {vehicule.capacite} places
                </p>
                <p style={{ marginBottom: '8px' }}>
                  <strong>Chauffeur:</strong> {vehicule.chauffeur_nom}
                </p>
                <p style={{ marginBottom: '12px' }}>
                  <strong>Prochain contrôle:</strong> {vehicule.prochain_controle}
                </p>
                <span className={`badge ${vehicule.statut === 'En service' ? 'badge-success' : 'badge-danger'}`}>
                  {vehicule.statut}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'itinéraires' && (
        <div className="card-grid">
          {itineraires.map((itineraire) => (
            <div key={itineraire.id} className="info-card">
              <div className="info-card-header">
                <div className="info-card-icon" style={{ 
                  background: 'rgba(30, 58, 95, 0.1)', 
                  color: 'var(--primary)'
                }}>
                  <MapPin size={22} />
                </div>
                <div>
                  <h3>{itineraire.nom}</h3>
                  <p>{itineraire.zone}</p>
                </div>
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <Clock size={14} />
                  <span>Départ: {itineraire.heure_depart}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Clock size={14} />
                  <span>Arrivée: {itineraire.heure_arrivee}</span>
                </div>
              </div>
              <span className="badge badge-neutral">
                {itineraire.vehicule_numero || 'Non assigné'}
              </span>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'affectations' && (
        <table className="data-table">
          <thead>
            <tr>
              <th>Élève</th>
              <th>Classe</th>
              <th>Itinéraire</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {elevesTransport.map((eleve) => (
              <tr key={eleve.id}>
                <td>
                  <div className="student-cell">
                    <div className="avatar-placeholder" style={{ width: '32px', height: '32px', fontSize: '0.75rem' }}>
                      {(eleve.prenom?.[0] || '')}{(eleve.nom?.[0] || '')}
                    </div>
                    <div>
                      <div style={{ fontWeight: '500' }}>{eleve.prenom} {eleve.nom}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{eleve.matricule}</div>
                    </div>
                  </div>
                </td>
                <td>{eleve.classe_id || 'N/A'}</td>
                <td>{eleve.itineraire || 'Non assigné'}</td>
                <td>
                  <div className="actions-cell">
                    <button className="action-btn" onClick={() => handleView(eleve, 'eleve')}>
                      Voir détails
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showDetailModal && selectedItem && (
        <Modal 
          title={selectedItem.type === 'vehicule' ? `Véhicule ${selectedItem.numero}` : `${selectedItem.prenom} ${selectedItem.nom}`} 
          onClose={() => { setShowDetailModal(false); setSelectedItem(null); }}
        >
          <p>Détails de l'élément sélectionné...</p>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={() => { setShowDetailModal(false); setSelectedItem(null); }}>Fermer</button>
          </div>
        </Modal>
      )}
    </div>
  );
}
