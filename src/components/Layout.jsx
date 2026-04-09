import { useState } from 'react';
import { 
  LayoutDashboard, Users, UserCog, UserCheck, BookOpen, Clock, FileText, 
  DollarSign, Receipt, CreditCard, BarChart3, Truck, Calendar, Settings,
  Bell, Search, Menu, GraduationCap, ChevronDown
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { etablissement } from '../data/mockData';

export default function Layout({ children, currentPage, setCurrentPage, user, onLogout }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState({});
  const { toasts } = useApp();

  const toggleMenu = (menu) => {
    setExpandedMenus(prev => ({ ...prev, [menu]: !prev[menu] }));
  };

  const handleNavClick = (page) => {
    setCurrentPage(page);
    setSidebarOpen(false);
  };

  const navItems = [
    {
      section: 'Tableau de bord',
      items: [{ id: 'dashboard', label: 'Tableau de bord', icon: LayoutDashboard }]
    },
    {
      section: 'Gestion',
      items: [
        { id: 'eleves', label: 'Élèves', icon: Users },
        { id: 'enseignants', label: 'Enseignants', icon: UserCog },
        { id: 'personnel', label: 'Personnel administratif', icon: UserCheck },
        { id: 'parents', label: 'Parents', icon: Users }
      ]
    },
    {
      section: 'Pédagogie',
      items: [
        { id: 'cours', label: 'Cours & Matières', icon: BookOpen },
        { id: 'emploitemps', label: 'Emplois du temps', icon: Clock },
        { id: 'evaluations', label: 'Devoirs & Évaluations', icon: FileText },
        { id: 'bulletins', label: 'Bulletins scolaires', icon: FileText }
      ]
    },
    {
      section: 'Finance',
      items: [
        { id: 'frais', label: 'Frais de scolarité', icon: DollarSign },
        { id: 'factures', label: 'Factures', icon: Receipt },
        { id: 'paiements', label: 'Paiements', icon: CreditCard },
        { id: 'rapports', label: 'Rapport financier', icon: BarChart3 }
      ]
    },
    {
      section: 'Transport',
      items: [
        { id: 'transport', label: 'Transport scolaire', icon: Truck }
      ]
    },
    {
      section: 'Extra',
      items: [
        { id: 'agenda', label: 'Agenda & Événements', icon: Calendar },
        { id: 'parametres', label: 'Paramètres', icon: Settings }
      ]
    }
  ];

  return (
    <div className="app-container">
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="logo">
            <div className="logo-icon">
              <GraduationCap size={24} />
            </div>
            <h1>ClassConnect</h1>
          </div>
        </div>
        
        <nav className="sidebar-nav">
          {navItems.map((section, idx) => (
            <div key={idx} className="nav-section">
              <div className="nav-section-title">{section.section}</div>
              {section.items.map(item => {
                const Icon = item.icon;
                const hasSubmenu = item.submenu && item.submenu.length > 0;
                const isExpanded = expandedMenus[item.id];
                
                return (
                  <div key={item.id}>
                    <div 
                      className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
                      onClick={() => hasSubmenu ? toggleMenu(item.id) : handleNavClick(item.id)}
                    >
                      <Icon size={20} />
                      <span>{item.label}</span>
                      {hasSubmenu && <ChevronDown size={16} className={isExpanded ? 'rotated' : ''} style={{ marginLeft: 'auto', transition: 'transform 0.2s' }} />}
                    </div>
                    {hasSubmenu && isExpanded && (
                      <div className="submenu">
                        {item.submenu.map(sub => (
                          <div 
                            key={sub.id}
                            className={`nav-item ${currentPage === sub.id ? 'active' : ''}`}
                            onClick={() => handleNavClick(sub.id)}
                          >
                            {sub.label}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </nav>
      </aside>

      <main className="main-content">
        <header className="header">
          <div className="header-left">
            <button className="menu-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <Menu size={24} />
            </button>
            <div className="search-bar">
              <Search size={18} color="var(--text-muted)" />
              <input type="text" placeholder="Rechercher un élève, enseignant..." />
            </div>
          </div>
          
          <div className="header-right">
            <button className="header-btn">
              <Bell size={20} />
              <span className="notification-badge"></span>
            </button>
            <div className="user-avatar" onClick={onLogout} style={{ cursor: 'pointer' }}>
              <div className="avatar">{user ? user.nom.split(' ').map(n => n[0]).join('') : 'AB'}</div>
              <div className="user-info">
                <span className="user-name">{user ? `${user.prenom} ${user.nom}` : 'Utilisateur'}</span>
                <span className="user-role">{user?.role || 'Utilisateur'}</span>
              </div>
              <button className="logout-btn" onClick={(e) => { e.stopPropagation(); onLogout(); }} title="Déconnexion">
                ↩
              </button>
            </div>
          </div>
        </header>

        <div className="content">
          {children}
        </div>
      </main>

      <div className="toast-container">
        {toasts.map(toast => (
          <div key={toast.id} className={`toast toast-${toast.type}`}>
            <div className="toast-icon">
              {toast.type === 'success' && <span style={{ color: 'var(--success)' }}>✓</span>}
              {toast.type === 'error' && <span style={{ color: 'var(--danger)' }}>✕</span>}
              {toast.type === 'warning' && <span style={{ color: 'var(--warning)' }}>⚠</span>}
              {toast.type === 'info' && <span style={{ color: 'var(--primary)' }}>ℹ</span>}
            </div>
            <div className="toast-content">
              <div className="toast-title">{toast.title}</div>
              <div className="toast-message">{toast.message}</div>
            </div>
          </div>
        ))}
      </div>

      {sidebarOpen && (
        <div 
          style={{ 
            position: 'fixed', 
            inset: 0, 
            background: 'rgba(0,0,0,0.5)', 
            zIndex: 99,
            display: 'none'
          }} 
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
