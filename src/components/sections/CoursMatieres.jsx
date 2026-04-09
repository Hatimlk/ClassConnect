import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BookOpen, Users } from 'lucide-react';
import { matieres as allMatieres } from '../../data/mockData';

export default function CoursMatieres() {
  const { data } = useApp();
  const [activeTab, setActiveTab] = useState('matieres');

  const enseignants = data.enseignants || [];

  const getEnseignantByMatiere = (matiereNom) => {
    return enseignants.find(ens => 
      ens.specialite === matiereNom
    );
  };

  const cours = [
    { id: 1, titre: 'Introduction aux fractions', matiere_nom: 'Mathématiques', classe: 'CM2-A', date: '10/04/2026', statut: 'Terminé' },
    { id: 2, titre: 'La photosynthèse', matiere_nom: 'SVT', classe: '4ème-A', date: '12/04/2026', statut: 'Planifié' },
    { id: 3, titre: 'Grammaire: les types de phrases', matiere_nom: 'Français', classe: '5ème-A', date: '11/04/2026', statut: 'En cours' },
    { id: 4, titre: 'Les lois de Newton', matiere_nom: 'Physique-Chimie', classe: '3ème-A', date: '13/04/2026', statut: 'Planifié' },
    { id: 5, titre: 'Present Perfect', matiere_nom: 'Anglais', classe: '2nde-A', date: '14/04/2026', statut: 'Planifié' }
  ];

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Cours & Matières</h1>
        <p className="page-subtitle">Gestion des matières et des cours</p>
      </div>

      <div className="tabs">
        <button className={`tab ${activeTab === 'matieres' ? 'active' : ''}`} onClick={() => setActiveTab('matieres')}>
          Matières
        </button>
        <button className={`tab ${activeTab === 'cours' ? 'active' : ''}`} onClick={() => setActiveTab('cours')}>
          Cours
        </button>
      </div>

      {activeTab === 'matieres' && (
        <div className="card-grid">
          {allMatieres.map((matiere) => {
            const ens = getEnseignantByMatiere(matiere.nom);
            return (
              <div key={matiere.id} className="info-card">
                <div className="info-card-header">
                  <div className="info-card-icon" style={{ background: 'rgba(244, 162, 97, 0.1)', color: 'var(--accent)' }}>
                    <BookOpen size={22} />
                  </div>
                  <div>
                    <h3>{matiere.nom}</h3>
                    <p>Coefficient: {matiere.coefficient}</p>
                  </div>
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  {ens ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Users size={14} />
                      <span>{ens.prenom} {ens.nom}</span>
                    </div>
                  ) : (
                    <span style={{ color: 'var(--danger)' }}>Aucun enseignant assigné</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {activeTab === 'cours' && (
        <div>
          <table className="data-table">
            <thead>
              <tr>
                <th>Titre</th>
                <th>Matière</th>
                <th>Classe</th>
                <th>Date</th>
                <th>Statut</th>
              </tr>
            </thead>
            <tbody>
              {cours.map((c) => (
                <tr key={c.id}>
                  <td style={{ fontWeight: '500' }}>{c.titre}</td>
                  <td>{c.matiere_nom}</td>
                  <td>{c.classe}</td>
                  <td>{c.date}</td>
                  <td>
                    <span className={`badge ${
                      c.statut === 'Terminé' ? 'badge-success' :
                      c.statut === 'En cours' ? 'badge-warning' : 'badge-info'
                    }`}>
                      {c.statut}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
