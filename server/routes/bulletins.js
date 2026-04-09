import express from 'express';
import db from '../models/database.js';

const router = express.Router();

router.get('/', (req, res) => {
  try {
    const bulletins = db.prepare(`
      SELECT b.*, e.prenom, e.nom, e.matricule, c.nom as classe_nom
      FROM bulletins b
      JOIN eleves e ON b.eleve_id = e.id
      LEFT JOIN classes c ON e.classe_id = c.id
      ORDER BY b.created_at DESC
    `).all();
    res.json(bulletins);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', (req, res) => {
  try {
    const bulletin = db.prepare(`
      SELECT b.*, e.prenom, e.nom, e.matricule, c.nom as classe_nom
      FROM bulletins b
      JOIN eleves e ON b.eleve_id = e.id
      LEFT JOIN classes c ON e.classe_id = c.id
      WHERE b.id = ?
    `).get(req.params.id);
    
    if (!bulletin) {
      return res.status(404).json({ error: 'Bulletin non trouvé' });
    }
    res.json(bulletin);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', (req, res) => {
  try {
    const { eleve_id, trimestre, annee, moyenne, rang, appreciation } = req.body;
    
    const result = db.prepare(`
      INSERT INTO bulletins (eleve_id, trimestre, annee, moyenne, rang, appreciation)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(eleve_id, trimestre, annee, moyenne, rang, appreciation);
    
    const newBulletin = db.prepare('SELECT * FROM bulletins WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json(newBulletin);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', (req, res) => {
  try {
    const { moyenne, rang, appreciation } = req.body;
    
    db.prepare(`
      UPDATE bulletins SET moyenne = ?, rang = ?, appreciation = ?
      WHERE id = ?
    `).run(moyenne, rang, appreciation, req.params.id);
    
    const updatedBulletin = db.prepare('SELECT * FROM bulletins WHERE id = ?').get(req.params.id);
    res.json(updatedBulletin);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', (req, res) => {
  try {
    db.prepare('DELETE FROM bulletins WHERE id = ?').run(req.params.id);
    res.json({ message: 'Bulletin supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
