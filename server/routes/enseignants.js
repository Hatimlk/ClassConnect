import express from 'express';
import db from '../models/database.js';

const router = express.Router();

router.get('/', (req, res) => {
  try {
    const enseignants = db.prepare('SELECT * FROM enseignants ORDER BY nom, prenom').all();
    res.json(enseignants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', (req, res) => {
  try {
    const enseignant = db.prepare('SELECT * FROM enseignants WHERE id = ?').get(req.params.id);
    if (!enseignant) {
      return res.status(404).json({ error: 'Enseignant non trouvé' });
    }
    res.json(enseignant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', (req, res) => {
  try {
    const { prenom, nom, date_naissance, sexe, telephone, email, adresse, diplome, specialite, contrat, salaire, statut } = req.body;
    
    const result = db.prepare(`
      INSERT INTO enseignants (matricule, prenom, nom, date_naissance, sexe, telephone, email, adresse, diplome, specialite, contrat, salaire, statut)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      `ENS${Date.now()}`,
      prenom, nom, date_naissance, sexe || 'M', telephone, email, adresse, diplome, specialite, contrat || 'CDI', salaire || 0, statut || 'Actif'
    );
    
    const newEnseignant = db.prepare('SELECT * FROM enseignants WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json(newEnseignant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', (req, res) => {
  try {
    const { prenom, nom, date_naissance, sexe, telephone, email, adresse, diplome, specialite, contrat, salaire, statut } = req.body;
    
    db.prepare(`
      UPDATE enseignants SET prenom = ?, nom = ?, date_naissance = ?, sexe = ?, telephone = ?, email = ?, 
      adresse = ?, diplome = ?, specialite = ?, contrat = ?, salaire = ?, statut = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(prenom, nom, date_naissance, sexe, telephone, email, adresse, diplome, specialite, contrat, salaire, statut, req.params.id);
    
    const updatedEnseignant = db.prepare('SELECT * FROM enseignants WHERE id = ?').get(req.params.id);
    res.json(updatedEnseignant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', (req, res) => {
  try {
    db.prepare('DELETE FROM enseignants WHERE id = ?').run(req.params.id);
    res.json({ message: 'Enseignant supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
