import express from 'express';
import db from '../models/database.js';

const router = express.Router();

router.get('/', (req, res) => {
  try {
    const totalEleves = db.prepare('SELECT COUNT(*) as count FROM eleves WHERE statut = ?').get('Actif').count;
    const totalEnseignants = db.prepare('SELECT COUNT(*) as count FROM enseignants WHERE statut = ?').get('Actif').count;
    const totalPersonnel = db.prepare('SELECT COUNT(*) as count FROM personnel WHERE statut = ?').get('Actif').count;
    
    const revenusMois = db.prepare(`
      SELECT COALESCE(SUM(montant), 0) as total 
      FROM paiements 
      WHERE strftime('%m', date) = strftime('%m', 'now')
    `).get().total;
    
    const facturesPayees = db.prepare('SELECT COUNT(*) as count FROM factures WHERE statut = ?').get('Payée').count;
    const facturesEnAttente = db.prepare('SELECT COUNT(*) as count FROM factures WHERE statut IN (?, ?)').get('En attente', 'En retard').count;
    
    const elevesTransport = db.prepare('SELECT COUNT(*) as count FROM eleves WHERE transport = 1').get().count;
    const vehiculesEnService = db.prepare('SELECT COUNT(*) as count FROM vehicules WHERE statut = ?').get('En service').count;
    
    const recentEleves = db.prepare(`
      SELECT * FROM eleves ORDER BY created_at DESC LIMIT 5
    `).all();
    
    const upcomingEvents = db.prepare(`
      SELECT * FROM evenements WHERE date >= date('now') ORDER BY date ASC LIMIT 5
    `).all();
    
    const repartitionNiveaux = db.prepare(`
      SELECT n.nom, COUNT(e.id) as count
      FROM niveaux n
      LEFT JOIN eleves e ON e.niveau_id = n.id AND e.statut = 'Actif'
      GROUP BY n.id
    `).all();
    
    const monthlyPayments = db.prepare(`
      SELECT strftime('%m', date) as month, SUM(montant) as total
      FROM paiements
      WHERE strftime('%Y', date) = strftime('%Y', 'now')
      GROUP BY strftime('%m', date)
      ORDER BY month
    `).all();
    
    res.json({
      stats: {
        totalEleves,
        totalEnseignants,
        totalPersonnel,
        revenusMois,
        facturesPayees,
        facturesEnAttente,
        elevesTransport,
        vehiculesEnService,
        tauxRecouvrement: revenusMois > 0 ? ((facturesPayees / (facturesPayees + facturesEnAttente)) * 100).toFixed(1) : 0
      },
      recentEleves,
      upcomingEvents,
      repartitionNiveaux,
      monthlyPayments
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/stats', (req, res) => {
  try {
    const totalEleves = db.prepare('SELECT COUNT(*) as count FROM eleves WHERE statut = ?').get('Actif').count;
    const totalEnseignants = db.prepare('SELECT COUNT(*) as count FROM enseignants WHERE statut = ?').get('Actif').count;
    const totalPersonnel = db.prepare('SELECT COUNT(*) as count FROM personnel WHERE statut = ?').get('Actif').count;
    
    const revenusMois = db.prepare(`
      SELECT COALESCE(SUM(montant), 0) as total 
      FROM paiements 
      WHERE strftime('%m', date) = strftime('%m', 'now')
    `).get().total;
    
    res.json({
      totalEleves,
      totalEnseignants,
      totalPersonnel,
      revenusMois
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
