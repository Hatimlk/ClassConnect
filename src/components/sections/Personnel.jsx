import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserCheck } from 'lucide-react';

export default function Personnel() {
  const { data } = useApp();

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('fr-MA', { 
      style: 'currency', 
      currency: 'MAD',
      minimumFractionDigits: 0 
    }).format(value);
  };

  const employes = data.employes || [];

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Personnel Administratif</h1>
        <p className="page-subtitle">{employes.length} employés</p>
      </div>

      <div className="card-grid">
        {employes.map((emp) => (
          <div key={emp.id} className="info-card">
            <div className="info-card-header">
              <div className="info-card-icon" style={{ background: 'rgba(30, 58, 95, 0.1)', color: 'var(--primary)' }}>
                <UserCheck size={22} />
              </div>
              <div>
                <h3>{emp.prenom} {emp.nom}</h3>
                <p>{emp.poste}</p>
              </div>
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              <p style={{ marginBottom: '4px' }}><strong>Matricule:</strong> {emp.matricule}</p>
              <p style={{ marginBottom: '4px' }}><strong>Téléphone:</strong> {emp.telephone}</p>
              <p style={{ marginBottom: '4px' }}><strong>Email:</strong> {emp.email}</p>
              <p style={{ marginBottom: '8px' }}><strong>Salaire:</strong> {formatCurrency(emp.salaire)}/mois</p>
              <span className={`badge ${emp.statut === 'Actif' ? 'badge-success' : 'badge-danger'}`}>
                {emp.statut}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
