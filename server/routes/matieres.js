import express from 'express';
import db from '../models/database.js';

const router = express.Router();

router.get('/', (req, res) => {
  try {
    const matieres = db.prepare('SELECT * FROM matieres ORDER BY nom').all();
    res.json(matieres);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', (req, res) => {
  try {
    const matiere = db.prepare('SELECT * FROM matieres WHERE id = ?').get(req.params.id);
    if (!matiere) {
      return res.status(404).json({ error: 'Matière non trouvée' });
    }
    res.json(matiere);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', (req, res) => {
  try {
    const { nom, coefficient, description } = req.body;
    
    const result = db.prepare(`
      INSERT INTO matieres (nom, coefficient, description)
      VALUES (?, ?, ?)
    `).run(nom, coefficient || 1, description);
    
    const newMatiere = db.prepare('SELECT * FROM matieres WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json(newMatiere);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', (req, res) => {
  try {
    const { nom, coefficient, description } = req.body;
    
    db.prepare(`
      UPDATE matieres SET nom = ?, coefficient = ?, description = ?
      WHERE id = ?
    `).run(nom, coefficient, description, req.params.id);
    
    const updatedMatiere = db.prepare('SELECT * FROM matieres WHERE id = ?').get(req.params.id);
    res.json(updatedMatiere);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', (req, res) => {
  try {
    db.prepare('DELETE FROM matieres WHERE id = ?').run(req.params.id);
    res.json({ message: 'Matière supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
