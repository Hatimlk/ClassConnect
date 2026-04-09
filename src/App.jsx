import { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Landing from './components/Landing';
import Login from './components/Login';
import Layout from './components/Layout';
import Dashboard from './components/sections/Dashboard';
import Eleves from './components/sections/Eleves';
import Enseignants from './components/sections/Enseignants';
import Personnel from './components/sections/Personnel';
import Parents from './components/sections/Parents';
import CoursMatieres from './components/sections/CoursMatieres';
import EmploisDuTemps from './components/sections/EmploisDuTemps';
import Evaluations from './components/sections/Evaluations';
import Bulletins from './components/sections/Bulletins';
import FraisScolarite from './components/sections/FraisScolarite';
import Factures from './components/sections/Factures';
import Paiements from './components/sections/Paiements';
import RapportsFinanciers from './components/sections/RapportsFinanciers';
import Transport from './components/sections/Transport';
import Agenda from './components/sections/Agenda';
import Parametres from './components/sections/Parametres';

function AppContent() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [view, setView] = useState('landing');
  const { loading, user, login, logout } = useApp();

  const handleLoginSuccess = (userData) => {
    login(userData);
    setView('app');
  };

  const handleLogout = () => {
    logout();
    setView('landing');
    setCurrentPage('dashboard');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'eleves':
        return <Eleves />;
      case 'enseignants':
        return <Enseignants />;
      case 'personnel':
        return <Personnel />;
      case 'parents':
        return <Parents />;
      case 'cours':
        return <CoursMatieres />;
      case 'emploitemps':
        return <EmploisDuTemps />;
      case 'evaluations':
        return <Evaluations />;
      case 'bulletins':
        return <Bulletins />;
      case 'frais':
        return <FraisScolarite />;
      case 'factures':
        return <Factures />;
      case 'paiements':
        return <Paiements />;
      case 'rapports':
        return <RapportsFinanciers />;
      case 'transport':
        return <Transport />;
      case 'agenda':
        return <Agenda />;
      case 'parametres':
        return <Parametres />;
      default:
        return <Dashboard />;
    }
  };

  if (view === 'landing') {
    return (
      <Landing onLoginClick={() => setView('login')} />
    );
  }

  if (view === 'login') {
    return (
      <Login onBackToLanding={() => setView('landing')} onLoginSuccess={handleLoginSuccess} />
    );
  }

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: '#F8F9FC',
        flexDirection: 'column',
        gap: '16px'
      }}>
        <div style={{
          width: '50px',
          height: '50px',
          border: '4px solid #E5E7EB',
          borderTopColor: '#1E3A5F',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
        <p style={{ color: '#1E3A5F', fontSize: '18px', fontWeight: '500' }}>
          Chargement de ClassConnect...
        </p>
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <Layout 
      currentPage={currentPage} 
      setCurrentPage={setCurrentPage}
      user={user}
      onLogout={handleLogout}
    >
      {renderPage()}
    </Layout>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
