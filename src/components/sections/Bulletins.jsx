import { useState } from 'react';
import { Search, Download, FileText } from 'lucide-react';
import { bulletins } from '../../data/mockData';
import Modal from '../Modal';

export default function Bulletins() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedBulletin, setSelectedBulletin] = useState(null);

  const filteredBulletins = bulletins.filter(b => 
    `${b.eleve.prenom} ${b.eleve.nom}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleView = (bulletin) => {
    setSelectedBulletin(bulletin);
    setShowDetailModal(true);
  };

  const getMention = (moyenne) => {
    const m = parseFloat(moyenne);
    if (m >= 16) return { text: 'Excellent', color: 'var(--success)' };
    if (m >= 14) return { text: 'Très Bien', color: 'var(--success)' };
    if (m >= 12) return { text: 'Bien', color: 'var(--accent)' };
    if (m >= 10) return { text: 'Assez Bien', color: 'var(--warning)' };
    return { text: 'Insuffisant', color: 'var(--danger)' };
  };

  return (
    <div>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 className="page-title">Bulletins Scolaires</h1>
          <p className="page-subtitle">Trimestre 2 - Année 2025-2026</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="btn btn-secondary">
            <Download size={18} />
            Export en masse
          </button>
        </div>
      </div>

      <div className="filters-bar">
        <div className="search-input">
          <Search size={18} color="var(--text-muted)" />
          <input 
            type="text" 
            placeholder="Rechercher un élève..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>Élève</th>
            <th>Classe</th>
            <th>Trimestre</th>
            <th>Moyenne</th>
            <th>Rang</th>
            <th>Mention</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredBulletins.map((bulletin) => {
            const mention = getMention(bulletin.moyenne);
            return (
              <tr key={bulletin.id}>
                <td>
                  <div className="student-cell">
                    <div className="avatar-placeholder">
                      {bulletin.eleve.prenom[0]}{bulletin.eleve.nom[0]}
                    </div>
                    <span style={{ fontWeight: '500' }}>{bulletin.eleve.prenom} {bulletin.eleve.nom}</span>
                  </div>
                </td>
                <td>{bulletin.eleve.classe}</td>
                <td>{bulletin.trimestre}</td>
                <td style={{ fontWeight: '600', fontSize: '1.1rem' }}>{bulletin.moyenne}/20</td>
                <td>{bulletin.rang}{bulletin.rang === 1 ? 'er' : 'ème'}</td>
                <td>
                  <span className="badge" style={{ background: `${mention.color}20`, color: mention.color }}>
                    {mention.text}
                  </span>
                </td>
                <td>
                  <div className="actions-cell">
                    <button className="action-btn" onClick={() => handleView(bulletin)} title="Voir bulletin">
                      <FileText size={16} />
                    </button>
                    <button className="action-btn" title="Télécharger PDF">
                      <Download size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {showDetailModal && selectedBulletin && (
        <BulletinDetailModal 
          bulletin={selectedBulletin} 
          onClose={() => { setShowDetailModal(false); setSelectedBulletin(null); }}
        />
      )}
    </div>
  );
}

function BulletinDetailModal({ bulletin, onClose }) {
  const notes = [
    { matiere: 'Mathématiques', coef: 4, note: 14.5 },
    { matiere: 'Français', coef: 4, note: 13.0 },
    { matiere: 'Anglais', coef: 3, note: 15.0 },
    { matiere: 'Physique-Chimie', coef: 3, note: 12.5 },
    { matiere: 'SVT', coef: 3, note: 13.5 },
    { matiere: 'Histoire-Géographie', coef: 2, note: 14.0 },
    { matiere: 'Éducation Islamique', coef: 2, note: 15.5 },
    { matiere: 'Arabe', coef: 3, note: 14.0 },
    { matiere: 'Informatique', coef: 2, note: 16.0 },
    { matiere: 'Éducation Physique', coef: 1, note: 17.0 }
  ];

  const totalCoef = notes.reduce((sum, n) => sum + n.coef, 0);
  const moyenneGenerale = (notes.reduce((sum, n) => sum + n.note * n.coef, 0) / totalCoef).toFixed(2);

  return (
    <Modal title={`Bulletin de ${bulletin.eleve.prenom} ${bulletin.eleve.nom}`} onClose={onClose} width="700px">
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '1.1rem', marginBottom: '4px' }}>École Privée Al Amal</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
          {bulletin.trimestre} - Année scolaire 2025-2026
        </p>
      </div>

      <table className="data-table" style={{ marginBottom: '20px' }}>
        <thead>
          <tr>
            <th>Matière</th>
            <th>Coef</th>
            <th>Note/20</th>
          </tr>
        </thead>
        <tbody>
          {notes.map((n, idx) => (
            <tr key={idx}>
              <td style={{ fontWeight: '500' }}>{n.matiere}</td>
              <td>{n.coef}</td>
              <td style={{ fontWeight: '600', color: n.note >= 10 ? 'var(--success)' : 'var(--danger)' }}>
                {n.note}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
        <div style={{ padding: '16px', background: 'var(--bg)', borderRadius: '12px', textAlign: 'center' }}>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Moyenne Générale</div>
          <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--primary)' }}>{moyenneGenerale}/20</div>
        </div>
        <div style={{ padding: '16px', background: 'var(--bg)', borderRadius: '12px', textAlign: 'center' }}>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Rang</div>
          <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--accent)' }}>{bulletin.rang}{bulletin.rang === 1 ? 'er' : 'ème'}</div>
        </div>
      </div>

      <div style={{ padding: '16px', background: 'var(--bg)', borderRadius: '12px' }}>
        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>Appréciation</div>
        <p style={{ fontStyle: 'italic' }}>"{bulletin.appreciation}"</p>
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
