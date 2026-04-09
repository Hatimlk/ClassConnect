import express from 'express';
import db from '../models/database.js';

const router = express.Router();

router.get('/', (req, res) => {
  try {
    const factures = db.prepare(`
      SELECT f.*, e.prenom, e.nom, e.matricule
      FROM factures f
      JOIN eleves e ON f.eleve_id = e.id
      ORDER BY f.date_emission DESC
    `).all();
    res.json(factures);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', (req, res) => {
  try {
    const facture = db.prepare(`
      SELECT f.*, e.prenom, e.nom, e.matricule
      FROM factures f
      JOIN eleves e ON f.eleve_id = e.id
      WHERE f.id = ?
    `).get(req.params.id);
    
    if (!facture) {
      return res.status(404).json({ error: 'Facture non trouvée' });
    }
    res.json(facture);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', (req, res) => {
  try {
    const { eleve_id, montant, date_emission, date_echeance } = req.body;
    
    const year = new Date().getFullYear();
    const count = db.prepare('SELECT COUNT(*) as count FROM factures').get().count + 1;
    const numero = `FAC-${year}-${String(count).padStart(4, '0')}`;
    
    const result = db.prepare(`
      INSERT INTO factures (numero, eleve_id, montant, date_emission, date_echeance, statut)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(numero, eleve_id, montant, date_emission, date_echeance, 'En attente');
    
    const newFacture = db.prepare('SELECT * FROM factures WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json(newFacture);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', (req, res) => {
  try {
    const { montant, date_emission, date_echeance, statut, mode_paiement } = req.body;
    
    db.prepare(`
      UPDATE factures SET montant = ?, date_emission = ?, date_echeance = ?, statut = ?, mode_paiement = ?
      WHERE id = ?
    `).run(montant, date_emission, date_echeance, statut, mode_paiement, req.params.id);
    
    const updatedFacture = db.prepare('SELECT * FROM factures WHERE id = ?').get(req.params.id);
    res.json(updatedFacture);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', (req, res) => {
  try {
    db.prepare('DELETE FROM factures WHERE id = ?').run(req.params.id);
    res.json({ message: 'Facture supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
