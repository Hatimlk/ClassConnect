import express from 'express';
import db from '../models/database.js';

const router = express.Router();

router.get('/', (req, res) => {
  try {
    const paiements = db.prepare(`
      SELECT p.*, f.numero as facture_numero, e.prenom, e.nom
      FROM paiements p
      LEFT JOIN factures f ON p.facture_id = f.id
      LEFT JOIN eleves e ON f.eleve_id = e.id
      ORDER BY p.date DESC
    `).all();
    res.json(paiements);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', (req, res) => {
  try {
    const paiement = db.prepare(`
      SELECT p.*, f.numero as facture_numero, e.prenom, e.nom
      FROM paiements p
      LEFT JOIN factures f ON p.facture_id = f.id
      LEFT JOIN eleves e ON f.eleve_id = e.id
      WHERE p.id = ?
    `).get(req.params.id);
    
    if (!paiement) {
      return res.status(404).json({ error: 'Paiement non trouvé' });
    }
    res.json(paiement);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', (req, res) => {
  try {
    const { facture_id, montant, date, mode, reference } = req.body;
    
    const result = db.prepare(`
      INSERT INTO paiements (facture_id, montant, date, mode, reference)
      VALUES (?, ?, ?, ?, ?)
    `).run(facture_id, montant, date || new Date().toLocaleDateString('fr-FR'), mode, reference);
    
    if (facture_id) {
      db.prepare(`
        UPDATE factures SET statut = 'Payée', mode_paiement = ? WHERE id = ?
      `).run(mode, facture_id);
    }
    
    const newPaiement = db.prepare('SELECT * FROM paiements WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json(newPaiement);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', (req, res) => {
  try {
    const paiement = db.prepare('SELECT * FROM paiements WHERE id = ?').get(req.params.id);
    
    if (paiement && paiement.facture_id) {
      db.prepare(`
        UPDATE factures SET statut = 'En attente', mode_paiement = NULL WHERE id = ?
      `).run(paiement.facture_id);
    }
    
    db.prepare('DELETE FROM paiements WHERE id = ?').run(req.params.id);
    res.json({ message: 'Paiement supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
