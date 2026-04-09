import { useState, useMemo } from 'react';
import { Search, Plus, Eye, Edit2, Trash2, Download } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import Modal from '../Modal';

export default function Enseignants() {
  const { data, loading, addEnseignant, updateEnseignant, deleteEnseignant } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatut, setFilterStatut] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedEnseignant, setSelectedEnseignant] = useState(null);
  const [editingEnseignant, setEditingEnseignant] = useState(null);
  const itemsPerPage = 10;

  const enseignants = data.enseignants || [];

  const filteredEnseignants = useMemo(() => {
    return enseignants.filter(ens => {
      const matchesSearch = 
        (ens.prenom?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (ens.nom?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (ens.matricule?.toLowerCase() || '').includes(searchTerm.toLowerCase());
      const matchesStatut = !filterStatut || ens.statut === filterStatut;
      return matchesSearch && matchesStatut;
    });
  }, [enseignants, searchTerm, filterStatut]);

  const paginatedEnseignants = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredEnseignants.slice(start, start + itemsPerPage);
  }, [filteredEnseignants, currentPage]);

  const totalPages = Math.ceil(filteredEnseignants.length / itemsPerPage);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('fr-MA', { 
      style: 'currency', 
      currency: 'MAD',
      minimumFractionDigits: 0 
    }).format(value);
  };

  const handleSubmit = async (formData) => {
    try {
      if (editingEnseignant) {
        await updateEnseignant(editingEnseignant.id, formData);
      } else {
        await addEnseignant(formData);
      }
      setShowModal(false);
      setEditingEnseignant(null);
    } catch (error) {
      console.error('Error saving enseignant:', error);
    }
  };

  const handleEdit = (ens) => {
    setEditingEnseignant(ens);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet enseignant ?')) {
      try {
        await deleteEnseignant(id);
      } catch (error) {
        console.error('Error deleting enseignant:', error);
      }
    }
  };

  const handleView = (ens) => {
    setSelectedEnseignant(ens);
    setShowDetailModal(true);
  };

  if (loading) {
    return <div className="loading">Chargement...</div>;
  }

  return (
    <div>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 className="page-title">Gestion des Enseignants</h1>
          <p className="page-subtitle">{enseignants.length} enseignants</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="btn btn-secondary">
            <Download size={18} />
            Exporter
          </button>
          <button className="btn btn-primary" onClick={() => { setEditingEnseignant(null); setShowModal(true); }}>
            <Plus size={18} />
            Nouvel Enseignant
          </button>
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
            <option value="Actif">Actif</option>
            <option value="Congé">Congé</option>
            <option value="Inactif">Inactif</option>
          </select>
        </div>
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>Enseignant</th>
            <th>Matricule</th>
            <th>Spécialité</th>
            <th>Contrat</th>
            <th>Salaire</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedEnseignants.map((ens) => (
            <tr key={ens.id}>
              <td>
                <div className="student-cell">
                  <div className="avatar-placeholder">
                    {(ens.prenom?.[0] || '')}{(ens.nom?.[0] || '')}
                  </div>
                  <div>
                    <div style={{ fontWeight: '500' }}>{ens.prenom} {ens.nom}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{ens.email}</div>
                  </div>
                </div>
              </td>
              <td style={{ fontFamily: 'monospace' }}>{ens.matricule}</td>
              <td>{ens.specialite || 'N/A'}</td>
              <td>
                <span className={`badge ${
                  ens.contrat === 'CDI' ? 'badge-success' : 
                  ens.contrat === 'CDD' ? 'badge-warning' : 'badge-info'
                }`}>
                  {ens.contrat}
                </span>
              </td>
              <td>{formatCurrency(ens.salaire || 0)}</td>
              <td>
                <span className={`badge ${ens.statut === 'Actif' ? 'badge-success' : 'badge-warning'}`}>
                  {ens.statut}
                </span>
              </td>
              <td>
                <div className="actions-cell">
                  <button className="action-btn" onClick={() => handleView(ens)} title="Voir détails">
                    <Eye size={16} />
                  </button>
                  <button className="action-btn" onClick={() => handleEdit(ens)} title="Modifier">
                    <Edit2 size={16} />
                  </button>
                  <button className="action-btn danger" onClick={() => handleDelete(ens.id)} title="Supprimer">
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className="pagination">
          <div className="pagination-info">
            Affichage de {(currentPage - 1) * itemsPerPage + 1} à {Math.min(currentPage * itemsPerPage, filteredEnseignants.length)} sur {filteredEnseignants.length} enseignants
          </div>
          <div className="pagination-buttons">
            <button className="page-btn" disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>←</button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button key={page} className={`page-btn ${currentPage === page ? 'active' : ''}`} onClick={() => setCurrentPage(page)}>
                {page}
              </button>
            ))}
            <button className="page-btn" disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}>→</button>
          </div>
        </div>
      )}

      {showModal && (
        <EnseignantModal 
          enseignant={editingEnseignant}
          onClose={() => { setShowModal(false); setEditingEnseignant(null); }}
          onSubmit={handleSubmit}
        />
      )}

      {showDetailModal && selectedEnseignant && (
        <EnseignantDetailModal 
          enseignant={selectedEnseignant}
          onClose={() => { setShowDetailModal(false); setSelectedEnseignant(null); }}
          formatCurrency={formatCurrency}
        />
      )}
    </div>
  );
}

function EnseignantModal({ enseignant, onClose, onSubmit }) {
  const [formData, setFormData] = useState(enseignant || {
    prenom: '',
    nom: '',
    date_naissance: '',
    sexe: 'M',
    telephone: '',
    email: '',
    adresse: '',
    diplome: '',
    specialite: '',
    contrat: 'CDI',
    salaire: 0,
    statut: 'Actif'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Modal title={enseignant ? 'Modifier un enseignant' : 'Nouvel Enseignant'} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Prénom *</label>
            <input type="text" name="prenom" className="form-input" value={formData.prenom} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label className="form-label">Nom *</label>
            <input type="text" name="nom" className="form-input" value={formData.nom} onChange={handleChange} required />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Téléphone</label>
            <input type="tel" name="telephone" className="form-input" value={formData.telephone} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input type="email" name="email" className="form-input" value={formData.email} onChange={handleChange} />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Diplôme</label>
            <input type="text" name="diplome" className="form-input" value={formData.diplome} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label className="form-label">Spécialité *</label>
            <select name="specialite" className="form-select" value={formData.specialite} onChange={handleChange} required>
              <option value="">Sélectionner</option>
              <option value="Mathématiques">Mathématiques</option>
              <option value="Physique-Chimie">Physique-Chimie</option>
              <option value="SVT">SVT</option>
              <option value="Français">Français</option>
              <option value="Anglais">Anglais</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Type de contrat</label>
            <select name="contrat" className="form-select" value={formData.contrat} onChange={handleChange}>
              <option value="CDI">CDI</option>
              <option value="CDD">CDD</option>
              <option value="Vacataire">Vacataire</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Salaire mensuel (MAD)</label>
            <input type="number" name="salaire" className="form-input" value={formData.salaire} onChange={handleChange} />
          </div>
        </div>

        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={onClose}>Annuler</button>
          <button type="submit" className="btn btn-primary">{enseignant ? 'Enregistrer' : 'Ajouter'}</button>
        </div>
      </form>
    </Modal>
  );
}

function EnseignantDetailModal({ enseignant, onClose, formatCurrency }) {
  return (
    <Modal title={`${enseignant.prenom} ${enseignant.nom}`} onClose={onClose} width="600px">
      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
        <div className="avatar-placeholder" style={{ width: '80px', height: '80px', fontSize: '1.5rem' }}>
          {(enseignant.prenom?.[0] || '')}{(enseignant.nom?.[0] || '')}
        </div>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '4px' }}>
            {enseignant.prenom} {enseignant.nom}
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Matricule: <strong>{enseignant.matricule}</strong>
          </p>
          <p style={{ marginTop: '8px' }}>
            <span className={`badge ${enseignant.statut === 'Actif' ? 'badge-success' : 'badge-warning'}`}>
              {enseignant.statut}
            </span>
            <span className="badge badge-info" style={{ marginLeft: '8px' }}>{enseignant.contrat}</span>
          </p>
        </div>
      </div>

      <h4 style={{ marginBottom: '12px' }}>Informations professionnelles</h4>
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Diplôme</label>
          <p>{enseignant.diplome || 'Non renseigné'}</p>
        </div>
        <div className="form-group">
          <label className="form-label">Salaire mensuel</label>
          <p>{formatCurrency(enseignant.salaire || 0)}</p>
        </div>
      </div>

      <div className="modal-footer">
        <button className="btn btn-secondary" onClick={onClose}>Fermer</button>
      </div>
    </Modal>
  );
}
