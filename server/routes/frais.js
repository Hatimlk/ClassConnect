import express from 'express';
import db from '../models/database.js';

const router = express.Router();

router.get('/', (req, res) => {
  try {
    const frais = db.prepare(`
      SELECT f.*, n.nom as niveau_nom
      FROM frais_scolarite f
      LEFT JOIN niveaux n ON f.niveau_id = n.id
    `).all();
    res.json(frais);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', (req, res) => {
  try {
    const frais = db.prepare(`
      SELECT f.*, n.nom as niveau_nom
      FROM frais_scolarite f
      LEFT JOIN niveaux n ON f.niveau_id = n.id
      WHERE f.id = ?
    `).get(req.params.id);
    
    if (!frais) {
      return res.status(404).json({ error: 'Frais non trouvés' });
    }
    res.json(frais);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', (req, res) => {
  try {
    const { montant_mensuel, montant_trimestriel, montant_annuel } = req.body;
    
    db.prepare(`
      UPDATE frais_scolarite SET montant_mensuel = ?, montant_trimestriel = ?, montant_annuel = ?
      WHERE id = ?
    `).run(montant_mensuel, montant_trimestriel, montant_annuel, req.params.id);
    
    const updatedFrais = db.prepare('SELECT * FROM frais_scolarite WHERE id = ?').get(req.params.id);
    res.json(updatedFrais);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
