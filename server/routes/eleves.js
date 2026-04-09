import express from 'express';
import db from '../models/database.js';

const router = express.Router();

router.get('/', (req, res) => {
  try {
    const eleves = db.prepare(`
      SELECT e.*, p.nom as parent_nom, p.prenom as parent_prenom, p.telephone as parent_tel, p.email as parent_email, p.profession as parent_profession
      FROM eleves e
      LEFT JOIN parents p ON e.parent_id = p.id
      ORDER BY e.created_at DESC
    `).all();
    
    res.json(eleves);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', (req, res) => {
  try {
    const eleve = db.prepare(`
      SELECT e.*, p.nom as parent_nom, p.prenom as parent_prenom, p.telephone as parent_tel, p.email as parent_email, p.profession as parent_profession,
             c.nom as classe_nom, n.nom as niveau_nom
      FROM eleves e
      LEFT JOIN parents p ON e.parent_id = p.id
      LEFT JOIN classes c ON e.classe_id = c.id
      LEFT JOIN niveaux n ON e.niveau_id = n.id
      WHERE e.id = ?
    `).get(req.params.id);
    
    if (!eleve) {
      return res.status(404).json({ error: 'Élève non trouvé' });
    }
    
    res.json(eleve);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', (req, res) => {
  try {
    const { prenom, nom, date_naissance, sexe, classe_id, niveau_id, annee_inscription, adresse, telephone_parent, email_parent, transport, itineraire, statut } = req.body;
    
    const result = db.prepare(`
      INSERT INTO eleves (matricule, prenom, nom, date_naissance, sexe, classe_id, niveau_id, annee_inscription, adresse, telephone_parent, email_parent, transport, itineraire, statut)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      `ELV${Date.now()}`,
      prenom, nom, date_naissance, sexe, classe_id, niveau_id, annee_inscription, adresse, telephone_parent, email_parent, transport ? 1 : 0, itineraire, statut || 'Actif'
    );
    
    const newEleve = db.prepare('SELECT * FROM eleves WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json(newEleve);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', (req, res) => {
  try {
    const { prenom, nom, date_naissance, sexe, classe_id, niveau_id, annee_inscription, adresse, telephone_parent, email_parent, transport, itineraire, statut } = req.body;
    
    db.prepare(`
      UPDATE eleves SET prenom = ?, nom = ?, date_naissance = ?, sexe = ?, classe_id = ?, niveau_id = ?, 
      annee_inscription = ?, adresse = ?, telephone_parent = ?, email_parent = ?, transport = ?, itineraire = ?, 
      statut = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?
    `).run(prenom, nom, date_naissance, sexe, classe_id, niveau_id, annee_inscription, adresse, telephone_parent, email_parent, transport ? 1 : 0, itineraire, statut, req.params.id);
    
    const updatedEleve = db.prepare('SELECT * FROM eleves WHERE id = ?').get(req.params.id);
    res.json(updatedEleve);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', (req, res) => {
  try {
    db.prepare('DELETE FROM eleves WHERE id = ?').run(req.params.id);
    res.json({ message: 'Élève supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/search/:query', (req, res) => {
  try {
    const searchTerm = `%${req.params.query}%`;
    const eleves = db.prepare(`
      SELECT * FROM eleves 
      WHERE prenom LIKE ? OR nom LIKE ? OR matricule LIKE ?
      LIMIT 20
    `).all(searchTerm, searchTerm, searchTerm);
    
    res.json(eleves);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
