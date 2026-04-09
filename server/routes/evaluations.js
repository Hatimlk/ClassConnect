import express from 'express';
import db from '../models/database.js';

const router = express.Router();

router.get('/', (req, res) => {
  try {
    const evaluations = db.prepare(`
      SELECT ev.*, m.nom as matiere_nom, c.nom as classe_nom
      FROM evaluations ev
      LEFT JOIN matieres m ON ev.matiere_id = m.id
      LEFT JOIN classes c ON ev.classe_id = c.id
      ORDER BY ev.date DESC
    `).all();
    res.json(evaluations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', (req, res) => {
  try {
    const evaluation = db.prepare(`
      SELECT ev.*, m.nom as matiere_nom, c.nom as classe_nom
      FROM evaluations ev
      LEFT JOIN matieres m ON ev.matiere_id = m.id
      LEFT JOIN classes c ON ev.classe_id = c.id
      WHERE ev.id = ?
    `).get(req.params.id);
    
    if (!evaluation) {
      return res.status(404).json({ error: 'Évaluation non trouvée' });
    }
    res.json(evaluation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', (req, res) => {
  try {
    const { type, matiere_id, classe_id, date, duree, bareme } = req.body;
    
    const result = db.prepare(`
      INSERT INTO evaluations (type, matiere_id, classe_id, date, duree, bareme)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(type, matiere_id, classe_id, date, duree, bareme);
    
    const newEvaluation = db.prepare('SELECT * FROM evaluations WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json(newEvaluation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', (req, res) => {
  try {
    const { type, matiere_id, classe_id, date, duree, bareme } = req.body;
    
    db.prepare(`
      UPDATE evaluations SET type = ?, matiere_id = ?, classe_id = ?, date = ?, duree = ?, bareme = ?
      WHERE id = ?
    `).run(type, matiere_id, classe_id, date, duree, bareme, req.params.id);
    
    const updatedEvaluation = db.prepare('SELECT * FROM evaluations WHERE id = ?').get(req.params.id);
    res.json(updatedEvaluation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', (req, res) => {
  try {
    db.prepare('DELETE FROM evaluations WHERE id = ?').run(req.params.id);
    res.json({ message: 'Évaluation supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
