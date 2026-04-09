import express from 'express';
import db from '../models/database.js';

const router = express.Router();

router.get('/', (req, res) => {
  try {
    const personnel = db.prepare('SELECT * FROM personnel ORDER BY nom, prenom').all();
    res.json(personnel);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', (req, res) => {
  try {
    const personnel = db.prepare('SELECT * FROM personnel WHERE id = ?').get(req.params.id);
    if (!personnel) {
      return res.status(404).json({ error: 'Personnel non trouvé' });
    }
    res.json(personnel);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', (req, res) => {
  try {
    const { prenom, nom, poste, telephone, email, salaire, statut } = req.body;
    
    const result = db.prepare(`
      INSERT INTO personnel (matricule, prenom, nom, poste, telephone, email, salaire, statut)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      `EMP${Date.now()}`,
      prenom, nom, poste, telephone, email, salaire || 0, statut || 'Actif'
    );
    
    const newPersonnel = db.prepare('SELECT * FROM personnel WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json(newPersonnel);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', (req, res) => {
  try {
    const { prenom, nom, poste, telephone, email, salaire, statut } = req.body;
    
    db.prepare(`
      UPDATE personnel SET prenom = ?, nom = ?, poste = ?, telephone = ?, email = ?, salaire = ?, statut = ?
      WHERE id = ?
    `).run(prenom, nom, poste, telephone, email, salaire, statut, req.params.id);
    
    const updatedPersonnel = db.prepare('SELECT * FROM personnel WHERE id = ?').get(req.params.id);
    res.json(updatedPersonnel);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', (req, res) => {
  try {
    db.prepare('DELETE FROM personnel WHERE id = ?').run(req.params.id);
    res.json({ message: 'Personnel supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
