import express from 'express';
import db from '../models/database.js';

const router = express.Router();

router.get('/', (req, res) => {
  try {
    const settings = db.prepare('SELECT * FROM settings').all();
    const settingsObj = {};
    settings.forEach(s => {
      settingsObj[s.key] = s.value;
    });
    res.json(settingsObj);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/etablissement', (req, res) => {
  try {
    const etablissement = db.prepare('SELECT * FROM etablissements LIMIT 1').get();
    res.json(etablissement || {});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/etablissement', (req, res) => {
  try {
    const { nom, adresse, telephone, email, annee_scolaire } = req.body;
    
    const existing = db.prepare('SELECT id FROM etablissements LIMIT 1').get();
    
    if (existing) {
      db.prepare(`
        UPDATE etablissements SET nom = ?, adresse = ?, telephone = ?, email = ?, annee_scolaire = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `).run(nom, adresse, telephone, email, annee_scolaire, existing.id);
      
      const updated = db.prepare('SELECT * FROM etablissements WHERE id = ?').get(existing.id);
      res.json(updated);
    } else {
      const result = db.prepare(`
        INSERT INTO etablissements (nom, adresse, telephone, email, annee_scolaire)
        VALUES (?, ?, ?, ?, ?)
      `).run(nom, adresse, telephone, email, annee_scolaire);
      
      const newEtab = db.prepare('SELECT * FROM etablissements WHERE id = ?').get(result.lastInsertRowid);
      res.json(newEtab);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:key', (req, res) => {
  try {
    const { key } = req.params;
    const { value } = req.body;
    
    const existing = db.prepare('SELECT id FROM settings WHERE key = ?').get(key);
    
    if (existing) {
      db.prepare('UPDATE settings SET value = ?, updated_at = CURRENT_TIMESTAMP WHERE key = ?').run(value, key);
    } else {
      db.prepare('INSERT INTO settings (key, value) VALUES (?, ?)').run(key, value);
    }
    
    const setting = db.prepare('SELECT * FROM settings WHERE key = ?').get(key);
    res.json(setting);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/niveaux', (req, res) => {
  try {
    const niveaux = db.prepare('SELECT * FROM niveaux').all();
    const result = niveaux.map(n => {
      const classes = db.prepare('SELECT * FROM classes WHERE niveau_id = ?').all(n.id);
      return { ...n, classes };
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/classes', (req, res) => {
  try {
    const classes = db.prepare(`
      SELECT c.*, n.nom as niveau_nom
      FROM classes c
      LEFT JOIN niveaux n ON c.niveau_id = n.id
    `).all();
    res.json(classes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
