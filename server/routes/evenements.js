import express from 'express';
import db from '../models/database.js';

const router = express.Router();

router.get('/', (req, res) => {
  try {
    const evenements = db.prepare('SELECT * FROM evenements ORDER BY date ASC').all();
    res.json(evenements);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', (req, res) => {
  try {
    const evenement = db.prepare('SELECT * FROM evenements WHERE id = ?').get(req.params.id);
    if (!evenement) {
      return res.status(404).json({ error: 'Événement non trouvé' });
    }
    res.json(evenement);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', (req, res) => {
  try {
    const { titre, date, heure, lieu, type, description } = req.body;
    
    const result = db.prepare(`
      INSERT INTO evenements (titre, date, heure, lieu, type, description)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(titre, date, heure, lieu, type, description);
    
    const newEvenement = db.prepare('SELECT * FROM evenements WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json(newEvenement);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', (req, res) => {
  try {
    const { titre, date, heure, lieu, type, description } = req.body;
    
    db.prepare(`
      UPDATE evenements SET titre = ?, date = ?, heure = ?, lieu = ?, type = ?, description = ?
      WHERE id = ?
    `).run(titre, date, heure, lieu, type, description, req.params.id);
    
    const updatedEvenement = db.prepare('SELECT * FROM evenements WHERE id = ?').get(req.params.id);
    res.json(updatedEvenement);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', (req, res) => {
  try {
    db.prepare('DELETE FROM evenements WHERE id = ?').run(req.params.id);
    res.json({ message: 'Événement supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
