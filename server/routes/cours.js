import express from 'express';
import db from '../models/database.js';

const router = express.Router();

router.get('/', (req, res) => {
  try {
    const cours = db.prepare(`
      SELECT c.*, m.nom as matiere_nom, cl.nom as classe_nom, e.nom as enseignant_nom, e.prenom as enseignant_prenom
      FROM cours c
      LEFT JOIN matieres m ON c.matiere_id = m.id
      LEFT JOIN classes cl ON c.classe_id = cl.id
      LEFT JOIN enseignants e ON c.enseignant_id = e.id
      ORDER BY c.date DESC
    `).all();
    res.json(cours);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', (req, res) => {
  try {
    const cours = db.prepare(`
      SELECT c.*, m.nom as matiere_nom, cl.nom as classe_nom, e.nom as enseignant_nom, e.prenom as enseignant_prenom
      FROM cours c
      LEFT JOIN matieres m ON c.matiere_id = m.id
      LEFT JOIN classes cl ON c.classe_id = cl.id
      LEFT JOIN enseignants e ON c.enseignant_id = e.id
      WHERE c.id = ?
    `).get(req.params.id);
    
    if (!cours) {
      return res.status(404).json({ error: 'Cours non trouvé' });
    }
    res.json(cours);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', (req, res) => {
  try {
    const { titre, matiere_id, classe_id, enseignant_id, date, contenu, statut } = req.body;
    
    const result = db.prepare(`
      INSERT INTO cours (titre, matiere_id, classe_id, enseignant_id, date, contenu, statut)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(titre, matiere_id, classe_id, enseignant_id, date, contenu, statut || 'Planifié');
    
    const newCours = db.prepare('SELECT * FROM cours WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json(newCours);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', (req, res) => {
  try {
    const { titre, matiere_id, classe_id, enseignant_id, date, contenu, statut } = req.body;
    
    db.prepare(`
      UPDATE cours SET titre = ?, matiere_id = ?, classe_id = ?, enseignant_id = ?, date = ?, contenu = ?, statut = ?
      WHERE id = ?
    `).run(titre, matiere_id, classe_id, enseignant_id, date, contenu, statut, req.params.id);
    
    const updatedCours = db.prepare('SELECT * FROM cours WHERE id = ?').get(req.params.id);
    res.json(updatedCours);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', (req, res) => {
  try {
    db.prepare('DELETE FROM cours WHERE id = ?').run(req.params.id);
    res.json({ message: 'Cours supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
