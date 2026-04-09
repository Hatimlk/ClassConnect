import express from 'express';
import db from '../models/database.js';

const router = express.Router();

router.get('/vehicules', (req, res) => {
  try {
    const vehicules = db.prepare('SELECT * FROM vehicules ORDER BY numero').all();
    res.json(vehicules);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/vehicules/:id', (req, res) => {
  try {
    const vehicule = db.prepare('SELECT * FROM vehicules WHERE id = ?').get(req.params.id);
    if (!vehicule) {
      return res.status(404).json({ error: 'Véhicule non trouvé' });
    }
    res.json(vehicule);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/vehicules', (req, res) => {
  try {
    const { numero, type, immatriculation, capacite, chauffeur_nom, chauffeur_telephone, statut, prochain_controle } = req.body;
    
    const result = db.prepare(`
      INSERT INTO vehicules (numero, type, immatriculation, capacite, chauffeur_nom, chauffeur_telephone, statut, prochain_controle)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(numero, type, immatriculation, capacite, chauffeur_nom, chauffeur_telephone, statut || 'En service', prochain_controle);
    
    const newVehicule = db.prepare('SELECT * FROM vehicules WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json(newVehicule);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/vehicules/:id', (req, res) => {
  try {
    const { numero, type, immatriculation, capacite, chauffeur_nom, chauffeur_telephone, statut, prochain_controle } = req.body;
    
    db.prepare(`
      UPDATE vehicules SET numero = ?, type = ?, immatriculation = ?, capacite = ?, chauffeur_nom = ?, chauffeur_telephone = ?, statut = ?, prochain_controle = ?
      WHERE id = ?
    `).run(numero, type, immatriculation, capacite, chauffeur_nom, chauffeur_telephone, statut, prochain_controle, req.params.id);
    
    const updatedVehicule = db.prepare('SELECT * FROM vehicules WHERE id = ?').get(req.params.id);
    res.json(updatedVehicule);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/itineraires', (req, res) => {
  try {
    const itineraires = db.prepare(`
      SELECT i.*, v.numero as vehicule_numero, v.type as vehicule_type
      FROM itineraires i
      LEFT JOIN vehicules v ON i.vehicule_id = v.id
    `).all();
    
    const result = itineraires.map(itin => {
      const arrets = db.prepare('SELECT * FROM arrets WHERE itineraire_id = ? ORDER BY ordre').all(itin.id);
      return { ...itin, arrets };
    });
    
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/itineraires', (req, res) => {
  try {
    const { nom, zone, vehicule_id, heure_depart, heure_arrivee, arrets } = req.body;
    
    const result = db.prepare(`
      INSERT INTO itineraires (nom, zone, vehicule_id, heure_depart, heure_arrivee)
      VALUES (?, ?, ?, ?, ?)
    `).run(nom, zone, vehicule_id, heure_depart, heure_arrivee);
    
    const itineraireId = result.lastInsertRowid;
    
    if (arrets && arrets.length > 0) {
      const insertArret = db.prepare('INSERT INTO arrets (itineraire_id, nom, ordre) VALUES (?, ?, ?)');
      arrets.forEach((arret, index) => {
        insertArret.run(itineraireId, arrest.nom, index + 1);
      });
    }
    
    const newItineraire = db.prepare('SELECT * FROM itineraires WHERE id = ?').get(itineraireId);
    res.status(201).json(newItineraire);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
