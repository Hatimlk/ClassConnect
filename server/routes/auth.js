import express from 'express';
import db from '../models/database.js';

const router = express.Router();

router.post('/login', (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ error: 'Nom d\'utilisateur et mot de passe requis' });
    }
    
    const user = db.prepare('SELECT * FROM users WHERE username = ? AND password = ? AND actif = 1').get(username, password);
    
    if (!user) {
      return res.status(401).json({ error: 'Identifiants incorrects' });
    }
    
    const { password: _, ...userWithoutPassword } = user;
    
    res.json({
      message: 'Connexion réussie',
      user: userWithoutPassword,
      token: `token_${user.id}_${Date.now()}`
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/register', (req, res) => {
  try {
    const { username, password, nom, prenom, email, role } = req.body;
    
    const existing = db.prepare('SELECT id FROM users WHERE username = ?').get(username);
    if (existing) {
      return res.status(400).json({ error: 'Ce nom d\'utilisateur existe déjà' });
    }
    
    const result = db.prepare(`
      INSERT INTO users (username, password, nom, prenom, email, role)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(username, password, nom, prenom, email, role || 'user');
    
    const newUser = db.prepare('SELECT id, username, nom, prenom, email, role, actif FROM users WHERE id = ?').get(result.lastInsertRowid);
    
    res.status(201).json({
      message: 'Utilisateur créé avec succès',
      user: newUser
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/users', (req, res) => {
  try {
    const users = db.prepare('SELECT id, username, nom, prenom, email, role, actif, created_at FROM users ORDER BY created_at DESC').all();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/users/:id', (req, res) => {
  try {
    const user = db.prepare('SELECT id, username, nom, prenom, email, role, actif, created_at FROM users WHERE id = ?').get(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/users/:id', (req, res) => {
  try {
    const { username, nom, prenom, email, role, actif, password } = req.body;
    
    if (password) {
      db.prepare(`
        UPDATE users SET username = ?, password = ?, nom = ?, prenom = ?, email = ?, role = ?, actif = ?
        WHERE id = ?
      `).run(username, password, nom, prenom, email, role, actif ? 1 : 0, req.params.id);
    } else {
      db.prepare(`
        UPDATE users SET username = ?, nom = ?, prenom = ?, email = ?, role = ?, actif = ?
        WHERE id = ?
      `).run(username, nom, prenom, email, role, actif ? 1 : 0, req.params.id);
    }
    
    const updatedUser = db.prepare('SELECT id, username, nom, prenom, email, role, actif, created_at FROM users WHERE id = ?').get(req.params.id);
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/users/:id', (req, res) => {
  try {
    db.prepare('DELETE FROM users WHERE id = ?').run(req.params.id);
    res.json({ message: 'Utilisateur supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
