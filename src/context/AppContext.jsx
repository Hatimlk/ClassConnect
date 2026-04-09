import { createContext, useContext, useState, useCallback, useEffect } from 'react';

const AppContext = createContext();

const API_URL = '/api';

export function AppProvider({ children }) {
  const [data, setData] = useState({
    eleves: [],
    enseignants: [],
    factures: [],
    paiements: [],
    employes: [],
    itineraires: [],
    vehicules: [],
    dashboard: {
      stats: {
        totalEleves: 0,
        totalEnseignants: 0,
        revenusMois: 0,
        tauxPresence: 0
      }
    }
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toasts, setToasts] = useState([]);
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const showToast = useCallback((type, title, message) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  }, []);

  const login = useCallback((userData) => {
    setUser(userData);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }, []);

  const loadInitialData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [eleves, enseignants, dashboard, factures, paiements, vehicules, itineraires] = await Promise.all([
        fetch(`${API_URL}/eleves`).then(r => r.ok ? r.json() : []).catch(() => []),
        fetch(`${API_URL}/enseignants`).then(r => r.ok ? r.json() : []).catch(() => []),
        fetch(`${API_URL}/dashboard`).then(r => r.ok ? r.json() : { stats: {}, upcomingEvents: [], repartitionNiveaux: [] }).catch(() => ({ stats: {}, upcomingEvents: [], repartitionNiveaux: [] })),
        fetch(`${API_URL}/factures`).then(r => r.ok ? r.json() : []).catch(() => []),
        fetch(`${API_URL}/paiements`).then(r => r.ok ? r.json() : []).catch(() => []),
        fetch(`${API_URL}/transport/vehicules`).then(r => r.ok ? r.json() : []).catch(() => []),
        fetch(`${API_URL}/transport/itineraires`).then(r => r.ok ? r.json() : []).catch(() => [])
      ]);

      setData({
        eleves,
        enseignants,
        factures,
        paiements,
        vehicules,
        itineraires,
        dashboard
      });
    } catch (err) {
      console.error('Error loading data:', err);
      setError('Impossible de charger les données depuis le serveur');
      showToast('warning', 'Attention', 'Certaines données peuvent ne pas être disponibles');
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  const addEleve = useCallback(async (eleve) => {
    try {
      const response = await fetch(`${API_URL}/eleves`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eleve)
      });
      if (!response.ok) throw new Error('Failed to add eleve');
      const newEleve = await response.json();
      setData(prev => ({ ...prev, eleves: [...prev.eleves, newEleve] }));
      showToast('success', 'Succès', 'Élève ajouté avec succès');
      return newEleve;
    } catch (error) {
      showToast('error', 'Erreur', 'Impossible d\'ajouter l\'élève');
      throw error;
    }
  }, [showToast]);

  const updateEleve = useCallback(async (id, updates) => {
    try {
      const response = await fetch(`${API_URL}/eleves/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
      if (!response.ok) throw new Error('Failed to update eleve');
      const updatedEleve = await response.json();
      setData(prev => ({
        ...prev,
        eleves: prev.eleves.map(e => e.id === id ? updatedEleve : e)
      }));
      showToast('success', 'Succès', 'Élève modifié avec succès');
    } catch (error) {
      showToast('error', 'Erreur', 'Impossible de modifier l\'élève');
      throw error;
    }
  }, [showToast]);

  const deleteEleve = useCallback(async (id) => {
    try {
      const response = await fetch(`${API_URL}/eleves/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete eleve');
      setData(prev => ({ ...prev, eleves: prev.eleves.filter(e => e.id !== id) }));
      showToast('success', 'Succès', 'Élève supprimé avec succès');
    } catch (error) {
      showToast('error', 'Erreur', 'Impossible de supprimer l\'élève');
      throw error;
    }
  }, [showToast]);

  const addEnseignant = useCallback(async (enseignant) => {
    try {
      const response = await fetch(`${API_URL}/enseignants`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(enseignant)
      });
      if (!response.ok) throw new Error('Failed to add enseignant');
      const newEnseignant = await response.json();
      setData(prev => ({ ...prev, enseignants: [...prev.enseignants, newEnseignant] }));
      showToast('success', 'Succès', 'Enseignant ajouté avec succès');
      return newEnseignant;
    } catch (error) {
      showToast('error', 'Erreur', 'Impossible d\'ajouter l\'enseignant');
      throw error;
    }
  }, [showToast]);

  const updateEnseignant = useCallback(async (id, updates) => {
    try {
      const response = await fetch(`${API_URL}/enseignants/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
      if (!response.ok) throw new Error('Failed to update enseignant');
      const updatedEnseignant = await response.json();
      setData(prev => ({
        ...prev,
        enseignants: prev.enseignants.map(e => e.id === id ? updatedEnseignant : e)
      }));
      showToast('success', 'Succès', 'Enseignant modifié avec succès');
    } catch (error) {
      showToast('error', 'Erreur', 'Impossible de modifier l\'enseignant');
      throw error;
    }
  }, [showToast]);

  const deleteEnseignant = useCallback(async (id) => {
    try {
      const response = await fetch(`${API_URL}/enseignants/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete enseignant');
      setData(prev => ({
        ...prev,
        enseignants: prev.enseignants.filter(e => e.id !== id)
      }));
      showToast('success', 'Succès', 'Enseignant supprimé avec succès');
    } catch (error) {
      showToast('error', 'Erreur', 'Impossible de supprimer l\'enseignant');
      throw error;
    }
  }, [showToast]);

  const addFacture = useCallback(async (facture) => {
    try {
      const response = await fetch(`${API_URL}/factures`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(facture)
      });
      if (!response.ok) throw new Error('Failed to add facture');
      const newFacture = await response.json();
      setData(prev => ({ ...prev, factures: [...prev.factures, newFacture] }));
      showToast('success', 'Succès', 'Facture créée avec succès');
      return newFacture;
    } catch (error) {
      showToast('error', 'Erreur', 'Impossible de créer la facture');
      throw error;
    }
  }, [showToast]);

  const updateFacture = useCallback(async (id, updates) => {
    try {
      const response = await fetch(`${API_URL}/factures/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
      if (!response.ok) throw new Error('Failed to update facture');
      const updatedFacture = await response.json();
      setData(prev => ({
        ...prev,
        factures: prev.factures.map(f => f.id === id ? updatedFacture : f)
      }));
      showToast('success', 'Succès', 'Facture modifiée avec succès');
    } catch (error) {
      showToast('error', 'Erreur', 'Impossible de modifier la facture');
      throw error;
    }
  }, [showToast]);

  const addPaiement = useCallback(async (paiement) => {
    try {
      const response = await fetch(`${API_URL}/paiements`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paiement)
      });
      if (!response.ok) throw new Error('Failed to add paiement');
      const newPaiement = await response.json();
      setData(prev => ({ ...prev, paiements: [...prev.paiements, newPaiement] }));
      
      if (paiement.factureId) {
        setData(prev => ({
          ...prev,
          factures: prev.factures.map(f => 
            f.id === paiement.factureId ? { ...f, statut: 'Payée', mode_paiement: paiement.mode } : f
          )
        }));
      }
      
      showToast('success', 'Succès', 'Paiement enregistré avec succès');
      return newPaiement;
    } catch (error) {
      showToast('error', 'Erreur', 'Impossible d\'enregistrer le paiement');
      throw error;
    }
  }, [showToast]);

  const refreshDashboard = useCallback(async () => {
    try {
      const dashboard = await fetch(`${API_URL}/dashboard`).then(r => r.ok ? r.json() : data.dashboard);
      setData(prev => ({ ...prev, dashboard }));
    } catch (error) {
      console.error('Error refreshing dashboard:', error);
    }
  }, [data.dashboard]);

  return (
    <AppContext.Provider value={{
      data,
      loading,
      error,
      toasts,
      showToast,
      user,
      login,
      logout,
      addEleve,
      updateEleve,
      deleteEleve,
      addEnseignant,
      updateEnseignant,
      deleteEnseignant,
      addFacture,
      updateFacture,
      addPaiement,
      refreshDashboard,
      loadInitialData
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
