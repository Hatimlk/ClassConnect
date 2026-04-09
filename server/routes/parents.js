import express from 'express';
import db from '../models/database.js';

const router = express.Router();

router.get('/', (req, res) => {
  try {
    const parents = db.prepare('SELECT * FROM parents ORDER BY nom, prenom').all();
    res.json(parents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', (req, res) => {
  try {
    const parent = db.prepare('SELECT * FROM parents WHERE id = ?').get(req.params.id);
    if (!parent) {
      return res.status(404).json({ error: 'Parent non trouvé' });
    }
    res.json(parent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', (req, res) => {
  try {
    const { nom, prenom, telephone, email, profession, adresse } = req.body;
    
    const result = db.prepare(`
      INSERT INTO parents (nom, prenom, telephone, email, profession, adresse)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(nom, prenom, telephone, email, profession, adresse);
    
    const newParent = db.prepare('SELECT * FROM parents WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json(newParent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', (req, res) => {
  try {
    const { nom, prenom, telephone, email, profession, adresse } = req.body;
    
    db.prepare(`
      UPDATE parents SET nom = ?, prenom = ?, telephone = ?, email = ?, profession = ?, adresse = ?
      WHERE id = ?
    `).run(nom, prenom, telephone, email, profession, adresse, req.params.id);
    
    const updatedParent = db.prepare('SELECT * FROM parents WHERE id = ?').get(req.params.id);
    res.json(updatedParent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', (req, res) => {
  try {
    db.prepare('DELETE FROM parents WHERE id = ?').run(req.params.id);
    res.json({ message: 'Parent supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
