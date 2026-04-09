import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Users, Phone, Mail } from 'lucide-react';

export default function Parents() {
  const { data } = useApp();

  const eleves = data.eleves || [];

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Gestion des Parents</h1>
        <p className="page-subtitle">Annuaire des parents d'élèves</p>
      </div>

      <div className="card-grid">
        {eleves.filter(eleve => eleve.parent_id).map((eleve) => (
          <div key={eleve.id} className="info-card">
            <div className="info-card-header">
              <div className="avatar-placeholder" style={{ width: '50px', height: '50px', fontSize: '1rem' }}>
                {(eleve.parent_prenom?.[0] || '')}{(eleve.parent_nom?.[0] || '')}
              </div>
              <div>
                <h3>{eleve.parent_prenom} {eleve.parent_nom}</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{eleve.parent_profession}</p>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Phone size={14} color="var(--text-secondary)" />
                <span>{eleve.telephone_parent}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Mail size={14} color="var(--text-secondary)" />
                <span>{eleve.email_parent}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px', padding: '8px', background: 'var(--bg)', borderRadius: '8px' }}>
                <Users size={14} color="var(--text-secondary)" />
                <span style={{ fontWeight: '500' }}>{eleve.prenom} {eleve.nom}</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>({eleve.classe_id})</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
