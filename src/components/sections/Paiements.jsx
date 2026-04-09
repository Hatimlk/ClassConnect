import { useState, useMemo } from 'react';
import { Search, Plus, Download, Receipt, CreditCard, Banknote, Smartphone } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import Modal from '../Modal';

export default function Paiements() {
  const { data, addPaiement } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMode, setFilterMode] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    factureId: '',
    montant: 0,
    mode: 'Virement',
    reference: ''
  });
  const itemsPerPage = 10;

  const paiements = data.paiements || [];
  const factures = data.factures || [];

  const filteredPaiements = useMemo(() => {
    return paiements.filter(p => {
      const searchLower = searchTerm.toLowerCase();
      return (
        (p.prenom?.toLowerCase() || '').includes(searchLower) ||
        (p.nom?.toLowerCase() || '').includes(searchLower) ||
        (p.reference?.toLowerCase() || '').includes(searchLower)
      );
    });
  }, [paiements, searchTerm]);

  const paginatedPaiements = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredPaiements.slice(start, start + itemsPerPage);
  }, [filteredPaiements, currentPage]);

  const totalPages = Math.ceil(filteredPaiements.length / itemsPerPage) || 1;

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('fr-MA', { 
      style: 'currency', 
      currency: 'MAD',
      minimumFractionDigits: 0 
    }).format(value);
  };

  const totalCollecte = paiements.reduce((sum, p) => sum + (p.montant || 0), 0);
  const unpaidFactures = factures.filter(f => f.statut !== 'Payée');

  const getModeIcon = (mode) => {
    switch (mode) {
      case 'Espèces': return <Banknote size={16} />;
      case 'Mobile': return <Smartphone size={16} />;
      case 'Chèque': return <Receipt size={16} />;
      default: return <CreditCard size={16} />;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addPaiement({
        factureId: parseInt(formData.factureId),
        montant: parseFloat(formData.montant),
        date: new Date().toLocaleDateString('fr-FR'),
        mode: formData.mode,
        reference: formData.reference || undefined
      });
      setShowModal(false);
      setFormData({ factureId: '', montant: 0, mode: 'Virement', reference: '' });
    } catch (error) {
      console.error('Error submitting paiement:', error);
    }
  };

  return (
    <div>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 className="page-title">Paiements</h1>
          <p className="page-subtitle">{paiements.length} paiements enregistrés</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="btn btn-secondary">
            <Download size={18} />
            Export
          </button>
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            <Plus size={18} />
            Nouveau paiement
          </button>
        </div>
      </div>

      <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', marginBottom: '20px' }}>
        <div className="stat-card">
          <div className="stat-icon green">
            <CreditCard size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-label">Total collecté</div>
            <div className="stat-value">{formatCurrency(totalCollecte)}</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon blue">
            <Banknote size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-label">En attente</div>
            <div className="stat-value">{formatCurrency(unpaidFactures.reduce((sum, f) => sum + (f.montant || 0), 0))}</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon orange">
            <Receipt size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-label">Factures impayées</div>
            <div className="stat-value">{unpaidFactures.length}</div>
          </div>
        </div>
      </div>

      <div className="filters-bar">
        <div className="search-input">
          <Search size={18} color="var(--text-muted)" />
          <input 
            type="text" 
            placeholder="Rechercher..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-group">
          <label>Mode:</label>
          <select className="filter-select" value={filterMode} onChange={(e) => setFilterMode(e.target.value)}>
            <option value="">Tous</option>
            <option value="Virement">Virement</option>
            <option value="Espèces">Espèces</option>
            <option value="Chèque">Chèque</option>
            <option value="Mobile">Mobile</option>
          </select>
        </div>
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>Référence</th>
            <th>Facture</th>
            <th>Élève</th>
            <th>Montant</th>
            <th>Date</th>
            <th>Mode</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedPaiements.map((paiement) => (
            <tr key={paiement.id}>
              <td style={{ fontFamily: 'monospace', fontWeight: '500' }}>{paiement.reference || 'N/A'}</td>
              <td style={{ fontFamily: 'monospace', fontSize: '0.85rem' }}>{paiement.facture_numero || 'N/A'}</td>
              <td>
                <span>{paiement.prenom} {paiement.nom}</span>
              </td>
              <td style={{ fontWeight: '600', color: 'var(--success)' }}>{formatCurrency(paiement.montant)}</td>
              <td>{paiement.date}</td>
              <td>
                <span className="badge badge-info" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  {getModeIcon(paiement.mode)}
                  {paiement.mode}
                </span>
              </td>
              <td>
                <div className="actions-cell">
                  <button className="action-btn" title="Reçu">
                    <Receipt size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <Modal title="Enregistrer un paiement" onClose={() => setShowModal(false)}>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Facture *</label>
              <select name="factureId" className="form-select" value={formData.factureId} onChange={handleChange} required>
                <option value="">Sélectionner une facture</option>
                {unpaidFactures.map(f => (
                  <option key={f.id} value={f.id}>
                    {f.numero} - {f.prenom} {f.nom} - {formatCurrency(f.montant)}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Montant (MAD) *</label>
                <input
                  type="number"
                  name="montant"
                  className="form-input"
                  value={formData.montant}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Mode de paiement *</label>
                <select name="mode" className="form-select" value={formData.mode} onChange={handleChange}>
                  <option value="Virement">Virement bancaire</option>
                  <option value="Espèces">Espèces</option>
                  <option value="Chèque">Chèque</option>
                  <option value="Mobile">Mobile (Orange Money, CIH)</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Référence (optionnel)</label>
              <input
                type="text"
                name="reference"
                className="form-input"
                placeholder="N° chèque, transaction..."
                value={formData.reference}
                onChange={handleChange}
              />
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Annuler</button>
              <button type="submit" className="btn btn-success">Enregistrer</button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
