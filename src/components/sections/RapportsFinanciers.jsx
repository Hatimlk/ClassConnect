import { Download, TrendingUp, DollarSign, PieChart } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RePie, Pie, Cell, Legend } from 'recharts';

export default function RapportsFinanciers() {
  const { data } = useApp();

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('fr-MA', { 
      style: 'currency', 
      currency: 'MAD',
      minimumFractionDigits: 0 
    }).format(value);
  };

  const factures = data.factures || [];
  const paiements = data.paiements || [];

  const revenusData = [
    { mois: 'Jan', previsionnel: 450000, reel: 420000 },
    { mois: 'Fév', previsionnel: 450000, reel: 415000 },
    { mois: 'Mar', previsionnel: 450000, reel: 430000 },
    { mois: 'Avr', previsionnel: 450000, reel: 245800 }
  ];

  const totalReel = paiements.reduce((sum, p) => sum + (p.montant || 0), 0);
  const totalPrevision = 1800000;
  const tauxRecouvrement = totalReel > 0 ? ((totalReel / totalPrevision) * 100).toFixed(1) : 0;

  const impayes = factures.filter(f => f.statut !== 'Payée');
  const totalImpayes = impayes.reduce((sum, f) => sum + (f.montant || 0), 0);

  const depensesData = [
    { name: 'Salaires', value: 650000, color: '#1E3A5F' },
    { name: 'Fournitures', value: 45000, color: '#F4A261' },
    { name: 'Énergie', value: 25000, color: '#2A9D8F' },
    { name: 'Transport', value: 35000, color: '#E76F51' },
    { name: 'Autre', value: 20000, color: '#9CA3AF' }
  ];

  return (
    <div>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 className="page-title">Rapport Financier</h1>
          <p className="page-subtitle">Année scolaire 2025-2026</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="btn btn-secondary">
            <Download size={18} />
            Export Excel
          </button>
          <button className="btn btn-primary">
            <Download size={18} />
            Rapport PDF
          </button>
        </div>
      </div>

      <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        <div className="stat-card">
          <div className="stat-icon green">
            <TrendingUp size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-label">Revenus totaux</div>
            <div className="stat-value">{formatCurrency(totalReel)}</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon blue">
            <DollarSign size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-label">Prévisionnel</div>
            <div className="stat-value">{formatCurrency(totalPrevision)}</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(233, 196, 106, 0.1)', color: '#b8860b' }}>
            <PieChart size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-label">Taux de recouvrement</div>
            <div className="stat-value">{tauxRecouvrement}%</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon red">
            <TrendingUp size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-label">Créances en cours</div>
            <div className="stat-value">{formatCurrency(totalImpayes)}</div>
          </div>
        </div>
      </div>

      <div className="charts-grid" style={{ gridTemplateColumns: '2fr 1fr' }}>
        <div className="chart-card">
          <div className="chart-header">
            <h3 className="chart-title">Revenus réels vs prévisionnels (MAD)</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenusData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="mois" stroke="#6B7280" fontSize={12} />
              <YAxis stroke="#6B7280" fontSize={12} tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} />
              <Tooltip 
                contentStyle={{ 
                  background: 'white', 
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  fontSize: '14px'
                }}
                formatter={(value) => formatCurrency(value)}
              />
              <Legend />
              <Bar dataKey="previsionnel" name="Prévisionnel" fill="#1E3A5F" radius={[4, 4, 0, 0]} />
              <Bar dataKey="reel" name="Réel" fill="#2A9D8F" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <div className="chart-header">
            <h3 className="chart-title">Répartition des dépenses</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <RePie>
              <Pie
                data={depensesData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={90}
                paddingAngle={5}
                dataKey="value"
              >
                {depensesData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  background: 'white', 
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  fontSize: '14px'
                }}
                formatter={(value) => formatCurrency(value)}
              />
              <Legend />
            </RePie>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="chart-card" style={{ marginTop: '20px' }}>
        <div className="chart-header">
          <h3 className="chart-title">Créances en cours par élève</h3>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Élève</th>
              <th>N° Facture</th>
              <th>Montant</th>
              <th>Date échéance</th>
              <th>Statut</th>
            </tr>
          </thead>
          <tbody>
            {impayes.slice(0, 10).map((fac) => (
              <tr key={fac.id}>
                <td>
                  <span>{fac.prenom} {fac.nom}</span>
                </td>
                <td style={{ fontFamily: 'monospace' }}>{fac.numero}</td>
                <td style={{ fontWeight: '600' }}>{formatCurrency(fac.montant)}</td>
                <td>{fac.date_echeance}</td>
                <td>
                  <span className={`badge ${fac.statut === 'En retard' ? 'badge-danger' : 'badge-warning'}`}>
                    {fac.statut}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
