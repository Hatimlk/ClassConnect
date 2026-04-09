import { useState } from 'react';
import { Plus, Search, FileText } from 'lucide-react';
import { matieres as allMatieres } from '../../data/mockData';
import Modal from '../Modal';

export default function Evaluations() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    type: 'Contrôle',
    matiere: '',
    classe: '',
    date: '',
    duree: '60',
    bareme: '20'
  });

  const evaluations = [
    { id: 1, type: 'Contrôle', matiere_nom: 'Mathématiques', classe_nom: 'CM2-A', date: '08/04/2026', duree: '60 min', bareme: '20' },
    { id: 2, type: 'Devoir', matiere_nom: 'Français', classe_nom: 'CM2-A', date: '05/04/2026', duree: '45 min', bareme: '20' },
    { id: 3, type: 'Examen', matiere_nom: 'Physique-Chimie', classe_nom: '3ème-A', date: '10/04/2026', duree: '90 min', bareme: '40' },
    { id: 4, type: 'Contrôle', matiere_nom: 'Anglais', classe_nom: '5ème-A', date: '07/04/2026', duree: '30 min', bareme: '20' },
    { id: 5, type: 'Devoir', matiere_nom: 'SVT', classe_nom: '4ème-A', date: '03/04/2026', duree: '45 min', bareme: '20' }
  ];

  const filteredEvaluations = evaluations.filter(ev => 
    (ev.matiere_nom?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (ev.classe_nom?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(false);
    setFormData({ type: 'Contrôle', matiere: '', classe: '', date: '', duree: '60', bareme: '20' });
  };

  return (
    <div>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 className="page-title">Devoirs & Évaluations</h1>
          <p className="page-subtitle">Gestion des évaluations et des notes</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          <Plus size={18} />
          Nouvelle évaluation
        </button>
      </div>

      <div className="filters-bar">
        <div className="search-input">
          <Search size={18} color="var(--text-muted)" />
          <input 
            type="text" 
            placeholder="Rechercher par matière ou classe..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>Type</th>
            <th>Matière</th>
            <th>Classe</th>
            <th>Date</th>
            <th>Durée</th>
            <th>Bareme</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEvaluations.map((ev) => (
            <tr key={ev.id}>
              <td>
                <span className={`badge ${
                  ev.type === 'Examen' ? 'badge-danger' :
                  ev.type === 'Contrôle' ? 'badge-warning' : 'badge-info'
                }`}>
                  {ev.type}
                </span>
              </td>
              <td style={{ fontWeight: '500' }}>{ev.matiere_nom}</td>
              <td>{ev.classe_nom}</td>
              <td>{ev.date}</td>
              <td>{ev.duree}</td>
              <td>/{ev.bareme}</td>
              <td>
                <div className="actions-cell">
                  <button className="action-btn" title="Saisir les notes">
                    <FileText size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <Modal title="Nouvelle évaluation" onClose={() => setShowModal(false)}>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Type *</label>
                <select name="type" className="form-select" value={formData.type} onChange={handleChange}>
                  <option value="Devoir">Devoir</option>
                  <option value="Contrôle">Contrôle</option>
                  <option value="Examen">Examen</option>
                  <option value="Rattrapage">Rattrapage</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Matière *</label>
                <select name="matiere" className="form-select" value={formData.matiere} onChange={handleChange} required>
                  <option value="">Sélectionner</option>
                  {allMatieres.map(m => (
                    <option key={m.id} value={m.nom}>{m.nom}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Classe *</label>
                <select name="classe" className="form-select" value={formData.classe} onChange={handleChange} required>
                  <option value="">Sélectionner</option>
                  <option value="CM2-A">CM2-A</option>
                  <option value="CM1-A">CM1-A</option>
                  <option value="5ème-A">5ème-A</option>
                  <option value="4ème-A">4ème-A</option>
                  <option value="3ème-A">3ème-A</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Date *</label>
                <input
                  type="text"
                  name="date"
                  className="form-input"
                  placeholder="JJ/MM/AAAA"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Durée (minutes)</label>
                <input
                  type="number"
                  name="duree"
                  className="form-input"
                  value={formData.duree}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Barème /</label>
                <input
                  type="number"
                  name="bareme"
                  className="form-input"
                  value={formData.bareme}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Annuler</button>
              <button type="submit" className="btn btn-primary">Créer</button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
