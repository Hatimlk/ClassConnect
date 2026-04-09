import { useState, useMemo } from 'react';
import { Search, Eye, Download, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import Modal from '../Modal';

export default function Factures() {
  const { data, loading, addPaiement } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatut, setFilterStatut] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedFacture, setSelectedFacture] = useState(null);
  const itemsPerPage = 10;

  const factures = data.factures || [];

  const filteredFactures = useMemo(() => {
    return factures.filter(fac => {
      const matchesSearch = 
        (fac.prenom?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (fac.nom?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (fac.numero?.toLowerCase() || '').includes(searchTerm.toLowerCase());
      const matchesStatut = !filterStatut || fac.statut === filterStatut;
      return matchesSearch && matchesStatut;
    });
  }, [factures, searchTerm, filterStatut]);

  const paginatedFactures = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredFactures.slice(start, start + itemsPerPage);
  }, [filteredFactures, currentPage]);

  const totalPages = Math.ceil(filteredFactures.length / itemsPerPage);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('fr-MA', { 
      style: 'currency', 
      currency: 'MAD',
      minimumFractionDigits: 0 
    }).format(value);
  };

  const handleView = (facture) => {
    setSelectedFacture(facture);
    setShowModal(true);
  };

  const handlePayer = async (facture) => {
    try {
      await addPaiement({
        factureId: facture.id,
        montant: facture.montant,
        mode: 'Virement'
      });
    } catch (error) {
      console.error('Error processing payment:', error);
    }
  };

  if (loading) {
    return <div className="loading">Chargement...</div>;
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Factures</h1>
        <p className="page-subtitle">{factures.length} factures - Avril 2026</p>
      </div>

      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
        <div className="stat-card" style={{ flex: 1 }}>
          <div className="stat-icon green"><CheckCircle size={24} /></div>
          <div className="stat-content">
            <div className="stat-label">Payées</div>
            <div className="stat-value">{factures.filter(f => f.statut === 'Payée').length}</div>
          </div>
        </div>
        <div className="stat-card" style={{ flex: 1 }}>
          <div className="stat-icon" style={{ background: 'rgba(233, 196, 106, 0.1)', color: '#b8860b' }}>
            <Clock size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-label">En attente</div>
            <div className="stat-value">{factures.filter(f => f.statut === 'En attente').length}</div>
          </div>
        </div>
        <div className="stat-card" style={{ flex: 1 }}>
          <div className="stat-icon red"><AlertCircle size={24} /></div>
          <div className="stat-content">
            <div className="stat-label">En retard</div>
            <div className="stat-value">{factures.filter(f => f.statut === 'En retard').length}</div>
          </div>
        </div>
      </div>

      <div className="filters-bar">
        <div className="search-input">
          <Search size={18} color="var(--text-muted)" />
          <input 
            type="text" 
            placeholder="Rechercher..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-group">
          <label>Statut:</label>
          <select className="filter-select" value={filterStatut} onChange={(e) => setFilterStatut(e.target.value)}>
            <option value="">Tous</option>
            <option value="Payée">Payée</option>
            <option value="En attente">En attente</option>
            <option value="En retard">En retard</option>
          </select>
        </div>
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>N° Facture</th>
            <th>Élève</th>
            <th>Montant</th>
            <th>Date emission</th>
            <th>Échéance</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedFactures.map((facture) => (
            <tr key={facture.id}>
              <td style={{ fontFamily: 'monospace', fontWeight: '500' }}>{facture.numero}</td>
              <td>
                <div className="student-cell">
                  <div className="avatar-placeholder" style={{ width: '32px', height: '32px', fontSize: '0.7rem' }}>
                    {(facture.prenom?.[0] || '')}{(facture.nom?.[0] || '')}
                  </div>
                  <span>{facture.prenom} {facture.nom}</span>
                </div>
              </td>
              <td style={{ fontWeight: '600' }}>{formatCurrency(facture.montant)}</td>
              <td>{facture.date_emission || facture.dateEmission}</td>
              <td>{facture.date_echeance || facture.dateEcheance}</td>
              <td>
                <span className={`badge ${
                  facture.statut === 'Payée' ? 'badge-success' :
                  facture.statut === 'En attente' ? 'badge-warning' :
                  facture.statut === 'En retard' ? 'badge-danger' : 'badge-neutral'
                }`}>
                  {facture.statut}
                </span>
              </td>
              <td>
                <div className="actions-cell">
                  <button className="action-btn" onClick={() => handleView(facture)} title="Voir">
                    <Eye size={16} />
                  </button>
                  {facture.statut !== 'Payée' && (
                    <button className="action-btn" onClick={() => handlePayer(facture)} title="Marquer payée">
                      <CheckCircle size={16} />
                    </button>
                  )}
                  <button className="action-btn" title="Télécharger PDF">
                    <Download size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && selectedFacture && (
        <FactureDetailModal 
          facture={selectedFacture} 
          onClose={() => { setShowModal(false); setSelectedFacture(null); }}
          formatCurrency={formatCurrency}
        />
      )}
    </div>
  );
}

function FactureDetailModal({ facture, onClose, formatCurrency }) {
  return (
    <Modal title={`Facture ${facture.numero}`} onClose={onClose} width="600px">
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '1.1rem', marginBottom: '4px' }}>École Privée Al Amal</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
          123 Boulevard Mohammed V, Marrakech 40000
        </p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Facture destinée à:</p>
          <p style={{ fontWeight: '600' }}>{facture.prenom} {facture.nom}</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>N° Facture</p>
          <p style={{ fontWeight: '600', fontFamily: 'monospace' }}>{facture.numero}</p>
          <p style={{ fontSize: '0.85rem', marginTop: '8px' }}>Date: {facture.date_emission || facture.dateEmission}</p>
          <p style={{ fontSize: '0.85rem' }}>Échéance: {facture.date_echeance || facture.dateEcheance}</p>
        </div>
      </div>

      <table className="data-table" style={{ marginBottom: '20px' }}>
        <thead>
          <tr>
            <th>Description</th>
            <th style={{ textAlign: 'right' }}>Montant</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Frais de scolarité - Trimestre 2</td>
            <td style={{ textAlign: 'right', fontWeight: '600' }}>{formatCurrency(facture.montant)}</td>
          </tr>
          <tr>
            <td style={{ textAlign: 'right', fontWeight: '600' }}>Total TTC</td>
            <td style={{ textAlign: 'right', fontWeight: '700', fontSize: '1.1rem', color: 'var(--primary)' }}>
              {formatCurrency(facture.montant)}
            </td>
          </tr>
        </tbody>
      </table>

      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <span className={`badge ${
          facture.statut === 'Payée' ? 'badge-success' :
          facture.statut === 'En attente' ? 'badge-warning' : 'badge-danger'
        }`} style={{ fontSize: '0.9rem', padding: '8px 16px' }}>
          {facture.statut}
        </span>
      </div>

      <div className="modal-footer">
        <button className="btn btn-secondary" onClick={onClose}>Fermer</button>
        <button className="btn btn-primary">
          <Download size={18} />
          Télécharger PDF
        </button>
      </div>
    </Modal>
  );
}
