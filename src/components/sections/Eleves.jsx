import { useState, useMemo } from 'react';
import { Search, Plus, Eye, Edit2, Trash2, Filter, Download } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import Modal from '../Modal';

export default function Eleves() {
  const { data, loading, addEleve, updateEleve, deleteEleve } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatut, setFilterStatut] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedEleve, setSelectedEleve] = useState(null);
  const [editingEleve, setEditingEleve] = useState(null);
  const itemsPerPage = 10;

  const eleves = data.eleves || [];

  const filteredEleves = useMemo(() => {
    return eleves.filter(eleve => {
      const matchesSearch = 
        (eleve.prenom?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (eleve.nom?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (eleve.matricule?.toLowerCase() || '').includes(searchTerm.toLowerCase());
      const matchesStatut = !filterStatut || eleve.statut === filterStatut;
      return matchesSearch && matchesStatut;
    });
  }, [eleves, searchTerm, filterStatut]);

  const paginatedEleves = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredEleves.slice(start, start + itemsPerPage);
  }, [filteredEleves, currentPage]);

  const totalPages = Math.ceil(filteredEleves.length / itemsPerPage);

  const handleSubmit = async (formData) => {
    try {
      if (editingEleve) {
        await updateEleve(editingEleve.id, formData);
      } else {
        await addEleve(formData);
      }
      setShowModal(false);
      setEditingEleve(null);
    } catch (error) {
      console.error('Error saving eleve:', error);
    }
  };

  const handleEdit = (eleve) => {
    setEditingEleve(eleve);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet élève ?')) {
      try {
        await deleteEleve(id);
      } catch (error) {
        console.error('Error deleting eleve:', error);
      }
    }
  };

  const handleView = (eleve) => {
    setSelectedEleve(eleve);
    setShowDetailModal(true);
  };

  if (loading) {
    return <div className="loading">Chargement...</div>;
  }

  return (
    <div>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 className="page-title">Gestion des Élèves</h1>
          <p className="page-subtitle">{eleves.length} élèves inscrits</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="btn btn-secondary">
            <Download size={18} />
            Exporter
          </button>
          <button className="btn btn-primary" onClick={() => { setEditingEleve(null); setShowModal(true); }}>
            <Plus size={18} />
            Nouvel Élève
          </button>
        </div>
      </div>

      <div className="filters-bar">
        <div className="search-input">
          <Search size={18} color="var(--text-muted)" />
          <input 
            type="text" 
            placeholder="Rechercher par nom, prénom, matricule..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-group">
          <label>Statut:</label>
          <select className="filter-select" value={filterStatut} onChange={(e) => setFilterStatut(e.target.value)}>
            <option value="">Tous</option>
            <option value="Actif">Actif</option>
            <option value="Inactif">Inactif</option>
          </select>
        </div>
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>Élève</th>
            <th>Matricule</th>
            <th>Classe</th>
            <th>Niveau</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedEleves.map((eleve) => (
            <tr key={eleve.id}>
              <td>
                <div className="student-cell">
                  <div className="avatar-placeholder">
                    {(eleve.prenom?.[0] || '')}{(eleve.nom?.[0] || '')}
                  </div>
                  <div>
                    <div style={{ fontWeight: '500' }}>{eleve.prenom} {eleve.nom}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                      {eleve.parent_prenom} {eleve.parent_nom}
                    </div>
                  </div>
                </div>
              </td>
              <td style={{ fontFamily: 'monospace' }}>{eleve.matricule}</td>
              <td>{eleve.classe_id || 'N/A'}</td>
              <td>{eleve.niveau_id || 'N/A'}</td>
              <td>
                <span className={`badge ${eleve.statut === 'Actif' ? 'badge-success' : 'badge-danger'}`}>
                  {eleve.statut}
                </span>
              </td>
              <td>
                <div className="actions-cell">
                  <button className="action-btn" onClick={() => handleView(eleve)} title="Voir détails">
                    <Eye size={16} />
                  </button>
                  <button className="action-btn" onClick={() => handleEdit(eleve)} title="Modifier">
                    <Edit2 size={16} />
                  </button>
                  <button className="action-btn danger" onClick={() => handleDelete(eleve.id)} title="Supprimer">
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
            Affichage de {(currentPage - 1) * itemsPerPage + 1} à {Math.min(currentPage * itemsPerPage, filteredEleves.length)} sur {filteredEleves.length} élèves
          </div>
          <div className="pagination-buttons">
            <button 
              className="page-btn" 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => p - 1)}
            >
              ←
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button 
                key={page}
                className={`page-btn ${currentPage === page ? 'active' : ''}`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
            <button 
              className="page-btn" 
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(p => p + 1)}
            >
              →
            </button>
          </div>
        </div>
      )}

      {showModal && (
        <EleveModal 
          eleve={editingEleve}
          onClose={() => { setShowModal(false); setEditingEleve(null); }}
          onSubmit={handleSubmit}
        />
      )}

      {showDetailModal && selectedEleve && (
        <EleveDetailModal 
          eleve={selectedEleve}
          onClose={() => { setShowDetailModal(false); setSelectedEleve(null); }}
        />
      )}
    </div>
  );
}

function EleveModal({ eleve, onClose, onSubmit }) {
  const [formData, setFormData] = useState(eleve || {
    prenom: '',
    nom: '',
    date_naissance: '',
    sexe: 'M',
    classe_id: '',
    niveau_id: '',
    annee_inscription: '2025-2026',
    adresse: '',
    telephone_parent: '',
    email_parent: '',
    transport: false,
    itineraire: '',
    statut: 'Actif'
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Modal title={eleve ? 'Modifier un élève' : 'Nouvel Élève'} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Prénom *</label>
            <input
              type="text"
              name="prenom"
              className="form-input"
              value={formData.prenom}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Nom *</label>
            <input
              type="text"
              name="nom"
              className="form-input"
              value={formData.nom}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Date de naissance *</label>
            <input
              type="text"
              name="date_naissance"
              className="form-input"
              placeholder="JJ/MM/AAAA"
              value={formData.date_naissance}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Sexe *</label>
            <select name="sexe" className="form-select" value={formData.sexe} onChange={handleChange}>
              <option value="M">Masculin</option>
              <option value="F">Féminin</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Adresse</label>
          <input
            type="text"
            name="adresse"
            className="form-input"
            value={formData.adresse}
            onChange={handleChange}
          />
        </div>

        <h4 style={{ marginTop: '20px', marginBottom: '12px', fontSize: '0.95rem' }}>Informations du parent/tuteur</h4>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Téléphone parent</label>
            <input
              type="tel"
              name="telephone_parent"
              className="form-input"
              placeholder="06XXXXXXXX"
              value={formData.telephone_parent}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Email parent</label>
            <input
              type="email"
              name="email_parent"
              className="form-input"
              value={formData.email_parent}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group" style={{ marginTop: '16px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input
              type="checkbox"
              name="transport"
              checked={formData.transport}
              onChange={handleChange}
            />
            <span>Utilise le transport scolaire</span>
          </label>
        </div>

        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={onClose}>Annuler</button>
          <button type="submit" className="btn btn-primary">
            {eleve ? 'Enregistrer' : 'Ajouter'}
          </button>
        </div>
      </form>
    </Modal>
  );
}

function EleveDetailModal({ eleve, onClose }) {
  return (
    <Modal title={`${eleve.prenom} ${eleve.nom}`} onClose={onClose} width="600px">
      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
        <div className="avatar-placeholder" style={{ width: '80px', height: '80px', fontSize: '1.5rem' }}>
          {(eleve.prenom?.[0] || '')}{(eleve.nom?.[0] || '')}
        </div>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '4px' }}>
            {eleve.prenom} {eleve.nom}
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Matricule: <strong>{eleve.matricule}</strong>
          </p>
          <p style={{ marginTop: '8px' }}>
            <span className={`badge ${eleve.statut === 'Actif' ? 'badge-success' : 'badge-danger'}`}>
              {eleve.statut}
            </span>
          </p>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Date de naissance</label>
          <p>{eleve.date_naissance || 'Non renseignée'}</p>
        </div>
        <div className="form-group">
          <label className="form-label">Sexe</label>
          <p>{eleve.sexe === 'M' ? 'Masculin' : 'Féminin'}</p>
        </div>
      </div>

      <h4 style={{ marginTop: '20px', marginBottom: '12px' }}>Contact parent</h4>
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Parent/Tuteur</label>
          <p>{eleve.parent_prenom} {eleve.parent_nom}</p>
        </div>
        <div className="form-group">
          <label className="form-label">Téléphone</label>
          <p>{eleve.telephone_parent || 'Non renseigné'}</p>
        </div>
      </div>

      <div className="modal-footer">
        <button className="btn btn-secondary" onClick={onClose}>Fermer</button>
      </div>
    </Modal>
  );
}
