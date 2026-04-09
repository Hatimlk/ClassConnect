import { useApp } from '../../context/AppContext';
import { 
  Users, UserCog, DollarSign, TrendingUp, 
  Calendar, AlertTriangle, ArrowUpRight, ArrowDownRight, Clock
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar, Legend
} from 'recharts';

export default function Dashboard() {
  const { data, loading } = useApp();

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('fr-MA', { 
      style: 'currency', 
      currency: 'MAD',
      minimumFractionDigits: 0 
    }).format(value);
  };

  const dashboardStats = data.dashboard?.stats || {};
  const recentInscriptions = data.eleves?.slice(0, 5) || [];
  const upcomingEvents = data.dashboard?.upcomingEvents || [];
  const repartitionNiveaux = data.dashboard?.repartitionNiveaux || [];

  const stats = [
    {
      label: 'Total Élèves',
      value: (dashboardStats.totalEleves || 0).toLocaleString('fr-FR'),
      change: 'inscrits',
      positive: true,
      icon: Users,
      color: 'blue'
    },
    {
      label: 'Total Enseignants',
      value: dashboardStats.totalEnseignants || 0,
      change: 'actifs',
      positive: true,
      icon: UserCog,
      color: 'green'
    },
    {
      label: 'Revenus du mois',
      value: formatCurrency(dashboardStats.revenusMois || 0),
      change: 'MAD',
      positive: true,
      icon: DollarSign,
      color: 'orange'
    },
    {
      label: 'Taux de recouvrement',
      value: `${dashboardStats.tauxRecouvrement || 0}%`,
      change: 'ce mois',
      positive: true,
      icon: TrendingUp,
      color: 'green'
    }
  ];

  const inscriptionsData = [
    { mois: 'Sep', nombre: 145 },
    { mois: 'Oct', nombre: 12 },
    { mois: 'Nov', nombre: 8 },
    { mois: 'Déc', nombre: 5 },
    { mois: 'Jan', nombre: 18 },
    { mois: 'Fév', nombre: 10 },
    { mois: 'Mar', nombre: 7 },
    { mois: 'Avr', nombre: 12 }
  ];

  const pieData = repartitionNiveaux.length > 0 
    ? repartitionNiveaux.map((n, i) => ({
        nom: n.nom || n.name || `Niveau ${i + 1}`,
        valeur: n.count || n.value || 0,
        color: ['#1E3A5F', '#F4A261', '#2A9D8F'][i % 3]
      }))
    : [
        { nom: 'Primaire', valeur: 520, color: '#1E3A5F' },
        { nom: 'Collège', valeur: 410, color: '#F4A261' },
        { nom: 'Lycée', valeur: 317, color: '#2A9D8F' }
      ];

  const paiementsData = [
    { mois: 'Jan', collecter: 420000, enAttente: 35000 },
    { mois: 'Fév', collecter: 415000, enAttente: 28000 },
    { mois: 'Mar', collecter: 430000, enAttente: 32000 },
    { mois: 'Avr', collecte: 245800, enAttente: 85000 }
  ];

  const topMatieres = [
    { matiere: 'Mathématiques', tauxReussite: 78 },
    { matiere: 'Français', tauxReussite: 72 },
    { matiere: 'Anglais', tauxReussite: 85 },
    { matiere: 'SVT', tauxReussite: 68 },
    { matiere: 'Physique', tauxReussite: 65 }
  ];

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '400px',
        flexDirection: 'column',
        gap: '16px'
      }}>
        <div style={{ 
          width: '40px', 
          height: '40px', 
          border: '4px solid #E5E7EB',
          borderTopColor: '#1E3A5F',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
        <p>Chargement des données...</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Tableau de bord</h1>
        <p className="page-subtitle">Vue d'ensemble de l'établissement - Année scolaire 2025-2026</p>
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="stat-card">
              <div className={`stat-icon ${stat.color}`}>
                <Icon size={24} />
              </div>
              <div className="stat-content">
                <div className="stat-label">{stat.label}</div>
                <div className="stat-value">{stat.value}</div>
                <div className={`stat-change ${stat.positive ? 'positive' : 'negative'}`}>
                  {stat.positive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                  {stat.change}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="charts-grid">
        <div className="chart-card">
          <div className="chart-header">
            <h3 className="chart-title">Évolution des inscriptions</h3>
            <div className="chart-actions">
              <button className="chart-btn active">12 mois</button>
              <button className="chart-btn">Trimestre</button>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={inscriptionsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="mois" stroke="#6B7280" fontSize={12} />
              <YAxis stroke="#6B7280" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  background: 'white', 
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  fontSize: '14px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="nombre" 
                stroke="#1E3A5F" 
                strokeWidth={3}
                dot={{ fill: '#F4A261', strokeWidth: 2, r: 5 }}
                activeDot={{ r: 7, fill: '#F4A261' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <div className="chart-header">
            <h3 className="chart-title">Répartition par niveau</h3>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="valeur"
              >
                {pieData.map((entry, index) => (
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
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="charts-grid" style={{ gridTemplateColumns: '1.5fr 1fr' }}>
        <div className="chart-card">
          <div className="chart-header">
            <h3 className="chart-title">Paiements collectés vs en attente (MAD)</h3>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={paiementsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="mois" stroke="#6B7280" fontSize={12} />
              <YAxis stroke="#6B7280" fontSize={12} />
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
              <Bar dataKey="collecter" name="Collectés" fill="#2A9D8F" radius={[4, 4, 0, 0]} />
              <Bar dataKey="enAttente" name="En attente" fill="#E76F51" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <div className="chart-header">
            <h3 className="chart-title">Top 5 matières par taux de réussite</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {topMatieres.map((matiere, index) => (
              <div key={index}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: '500' }}>{matiere.matiere}</span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--success)', fontWeight: '600' }}>{matiere.tauxReussite}%</span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill success" 
                    style={{ width: `${matiere.tauxReussite}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="widgets-grid">
        <div className="widget-card">
          <h3 className="widget-title">
            <Calendar size={18} />
            Prochains événements
          </h3>
          <div className="event-list">
            {upcomingEvents.length > 0 ? upcomingEvents.slice(0, 5).map((event, index) => {
              const [day, month] = event.date.split('/');
              return (
                <div key={index} className="event-item">
                  <div className="event-date">
                    <div className="day">{day}</div>
                    <div className="month">{['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Jul', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'][parseInt(month) - 1]}</div>
                  </div>
                  <div className="event-info">
                    <h4>{event.titre}</h4>
                    <p>{event.heure} - {event.lieu}</p>
                  </div>
                </div>
              );
            }) : (
              <p style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: '20px' }}>
                Aucun événement à venir
              </p>
            )}
          </div>
        </div>

        <div className="widget-card">
          <h3 className="widget-title">
            <Users size={18} />
            Dernières inscriptions
          </h3>
          {recentInscriptions.length > 0 ? (
            <table className="student-mini-table">
              <thead>
                <tr>
                  <th>Élève</th>
                  <th>Classe</th>
                  <th>Statut</th>
                </tr>
              </thead>
              <tbody>
                {recentInscriptions.map((eleve, index) => (
                  <tr key={index}>
                    <td>
                      <div className="student-cell">
                        <div className="avatar-placeholder">
                          {eleve.prenom?.[0]}{eleve.nom?.[0]}
                        </div>
                        <div>
                          <div style={{ fontWeight: '500' }}>{eleve.prenom} {eleve.nom}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{eleve.matricule}</div>
                        </div>
                      </div>
                    </td>
                    <td>{eleve.classe_id || 'N/A'}</td>
                    <td><span className="badge badge-success">{eleve.statut}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: '20px' }}>
              Aucune inscription récente
            </p>
          )}
        </div>

        <div className="widget-card">
          <h3 className="widget-title">
            <AlertTriangle size={18} />
            Alertes & Notifications
          </h3>
          <div className="alert-list">
            <div className="alert-item danger">
              <div className="alert-icon">🔴</div>
              <div className="alert-content">
                <strong>Factures en retard</strong> - Vérifier les paiements
              </div>
              <span className="alert-action">Voir</span>
            </div>
            <div className="alert-item warning">
              <div className="alert-icon">🟡</div>
              <div className="alert-content">
                <strong>Contrôles techniques</strong> - Véhicules à vérifier
              </div>
              <span className="alert-action">Voir</span>
            </div>
            <div className="alert-item info">
              <div className="alert-icon">🔵</div>
              <div className="alert-content">
                <strong>Conseil de classe</strong> prévu bientôt
              </div>
              <span className="alert-action">Voir</span>
            </div>
          </div>
        </div>

        <div className="widget-card">
          <h3 className="widget-title">
            <Clock size={18} />
            Statistiques rapides
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div style={{ padding: '12px', background: 'var(--bg)', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--primary)' }}>
                {dashboardStats.totalPersonnel || 0}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Personnel</div>
            </div>
            <div style={{ padding: '12px', background: 'var(--bg)', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--success)' }}>
                {dashboardStats.facturesPayees || 0}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Factures payées</div>
            </div>
            <div style={{ padding: '12px', background: 'var(--bg)', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--accent)' }}>
                {dashboardStats.elevesTransport || 0}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Transports</div>
            </div>
            <div style={{ padding: '12px', background: 'var(--bg)', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--danger)' }}>
                {dashboardStats.facturesEnAttente || 0}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>En attente</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
