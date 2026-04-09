import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dbDir = join(__dirname, '..', 'database');
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const dbPath = join(dbDir, 'classconnect.db');
const db = new Database(dbPath);
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

export function initializeDatabase() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS etablissements (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nom TEXT NOT NULL,
      adresse TEXT,
      telephone TEXT,
      email TEXT,
      annee_scolaire TEXT DEFAULT '2025-2026',
      logo TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      nom TEXT NOT NULL,
      prenom TEXT NOT NULL,
      email TEXT,
      role TEXT DEFAULT 'user',
      actif INTEGER DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS niveaux (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nom TEXT NOT NULL,
      description TEXT
    );

    CREATE TABLE IF NOT EXISTS classes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nom TEXT NOT NULL,
      niveau_id INTEGER,
      FOREIGN KEY (niveau_id) REFERENCES niveaux(id)
    );

    CREATE TABLE IF NOT EXISTS parents (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nom TEXT NOT NULL,
      prenom TEXT NOT NULL,
      telephone TEXT,
      email TEXT,
      profession TEXT,
      adresse TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS eleves (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      matricule TEXT UNIQUE NOT NULL,
      prenom TEXT NOT NULL,
      nom TEXT NOT NULL,
      date_naissance TEXT,
      sexe TEXT DEFAULT 'M',
      classe_id INTEGER,
      niveau_id INTEGER,
      annee_inscription TEXT,
      adresse TEXT,
      telephone_parent TEXT,
      email_parent TEXT,
      parent_id INTEGER,
      transport INTEGER DEFAULT 0,
      itineraire TEXT,
      photo TEXT,
      statut TEXT DEFAULT 'Actif',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (parent_id) REFERENCES parents(id),
      FOREIGN KEY (classe_id) REFERENCES classes(id),
      FOREIGN KEY (niveau_id) REFERENCES niveaux(id)
    );

    CREATE TABLE IF NOT EXISTS matieres (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nom TEXT NOT NULL,
      coefficient INTEGER DEFAULT 1,
      description TEXT
    );

    CREATE TABLE IF NOT EXISTS enseignants (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      matricule TEXT UNIQUE NOT NULL,
      prenom TEXT NOT NULL,
      nom TEXT NOT NULL,
      date_naissance TEXT,
      sexe TEXT DEFAULT 'M',
      telephone TEXT,
      email TEXT,
      adresse TEXT,
      diplome TEXT,
      specialite TEXT,
      contrat TEXT DEFAULT 'CDI',
      salaire REAL DEFAULT 0,
      date_embauche TEXT,
      statut TEXT DEFAULT 'Actif',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS personnel (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      matricule TEXT UNIQUE NOT NULL,
      prenom TEXT NOT NULL,
      nom TEXT NOT NULL,
      poste TEXT NOT NULL,
      telephone TEXT,
      email TEXT,
      salaire REAL DEFAULT 0,
      statut TEXT DEFAULT 'Actif',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS cours (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      titre TEXT NOT NULL,
      matiere_id INTEGER,
      classe_id INTEGER,
      enseignant_id INTEGER,
      date TEXT,
      contenu TEXT,
      fichiers TEXT,
      statut TEXT DEFAULT 'Planifié',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (matiere_id) REFERENCES matieres(id),
      FOREIGN KEY (classe_id) REFERENCES classes(id),
      FOREIGN KEY (enseignant_id) REFERENCES enseignants(id)
    );

    CREATE TABLE IF NOT EXISTS evaluations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT NOT NULL,
      matiere_id INTEGER,
      classe_id INTEGER,
      date TEXT,
      duree TEXT,
      bareme TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (matiere_id) REFERENCES matieres(id),
      FOREIGN KEY (classe_id) REFERENCES classes(id)
    );

    CREATE TABLE IF NOT EXISTS notes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      eleve_id INTEGER NOT NULL,
      evaluation_id INTEGER NOT NULL,
      note REAL NOT NULL,
      appreciation TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (eleve_id) REFERENCES eleves(id),
      FOREIGN KEY (evaluation_id) REFERENCES evaluations(id)
    );

    CREATE TABLE IF NOT EXISTS bulletins (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      eleve_id INTEGER NOT NULL,
      trimestre TEXT NOT NULL,
      annee TEXT NOT NULL,
      moyenne REAL,
      rang INTEGER,
      appreciation TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (eleve_id) REFERENCES eleves(id)
    );

    CREATE TABLE IF NOT EXISTS frais_scolarite (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      niveau_id INTEGER,
      montant_mensuel REAL,
      montant_trimestriel REAL,
      montant_annuel REAL,
      FOREIGN KEY (niveau_id) REFERENCES niveaux(id)
    );

    CREATE TABLE IF NOT EXISTS factures (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      numero TEXT UNIQUE NOT NULL,
      eleve_id INTEGER NOT NULL,
      montant REAL NOT NULL,
      date_emission TEXT,
      date_echeance TEXT,
      statut TEXT DEFAULT 'En attente',
      mode_paiement TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (eleve_id) REFERENCES eleves(id)
    );

    CREATE TABLE IF NOT EXISTS paiements (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      facture_id INTEGER,
      montant REAL NOT NULL,
      date TEXT,
      mode TEXT,
      reference TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (facture_id) REFERENCES factures(id)
    );

    CREATE TABLE IF NOT EXISTS vehicules (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      numero TEXT NOT NULL,
      type TEXT,
      immatriculation TEXT,
      capacite INTEGER,
      chauffeur_nom TEXT,
      chauffeur_telephone TEXT,
      statut TEXT DEFAULT 'En service',
      prochain_controle TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS itineraires (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nom TEXT NOT NULL,
      zone TEXT,
      vehicule_id INTEGER,
      heure_depart TEXT,
      heure_arrivee TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (vehicule_id) REFERENCES vehicules(id)
    );

    CREATE TABLE IF NOT EXISTS arrets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      itineraire_id INTEGER NOT NULL,
      nom TEXT NOT NULL,
      ordre INTEGER,
      FOREIGN KEY (itineraire_id) REFERENCES itineraires(id)
    );

    CREATE TABLE IF NOT EXISTS evenements (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      titre TEXT NOT NULL,
      date TEXT NOT NULL,
      heure TEXT,
      lieu TEXT,
      type TEXT,
      description TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS absences (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      eleve_id INTEGER NOT NULL,
      date TEXT NOT NULL,
      motif TEXT,
      justifie INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (eleve_id) REFERENCES eleves(id)
    );

    CREATE TABLE IF NOT EXISTS settings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      key TEXT UNIQUE NOT NULL,
      value TEXT,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  seedData();
  console.log('✅ Database initialized successfully');
}

function seedData() {
  let elevesCount;
  try {
    elevesCount = db.prepare('SELECT COUNT(*) as count FROM eleves').get().count;
  } catch (e) {
    return;
  }
  
  if (elevesCount === 0) {
    console.log('📦 Seeding initial data...');
    
    db.prepare(`INSERT INTO etablissements (nom, adresse, telephone, email, annee_scolaire) VALUES (?, ?, ?, ?, ?)`).run(
      'École Privée Al Amal',
      '123 Boulevard Mohammed V, Marrakech 40000',
      '+212 524 123 456',
      'contact@ecole-alamal.ma',
      '2025-2026'
    );

    db.prepare(`INSERT OR IGNORE INTO users (username, password, nom, prenom, email, role) VALUES (?, ?, ?, ?, ?, ?)`).run(
      'admin', 'admin123', 'Benhima', 'Abdelkader', 'admin@ecole-alamal.ma', 'Administrateur'
    );

    db.prepare(`INSERT OR IGNORE INTO users (username, password, nom, prenom, email, role) VALUES (?, ?, ?, ?, ?, ?)`).run(
      'comptable', 'comptable123', 'Moulin', 'Tarik', 'tarik.moulin@ecole-alamal.ma', 'Comptable'
    );

    db.prepare(`INSERT OR IGNORE INTO users (username, password, nom, prenom, email, role) VALUES (?, ?, ?, ?, ?, ?)`).run(
      'direction', 'direction123', 'Alaoui', 'Karim', 'karim.alaoui@ecole-alamal.ma', 'Directeur'
    );

    const niveaux = [
      { nom: 'Primaire' },
      { nom: 'Collège' },
      { nom: 'Lycée' }
    ];
    
    const insertNiveau = db.prepare('INSERT OR IGNORE INTO niveaux (nom) VALUES (?)');
    niveaux.forEach(n => insertNiveau.run(n.nom));

    const classesData = [
      { nom: 'CP1', niveau: 1 }, { nom: 'CP2', niveau: 1 }, { nom: 'CE1', niveau: 1 },
      { nom: 'CE2', niveau: 1 }, { nom: 'CM1-A', niveau: 1 }, { nom: 'CM2-A', niveau: 1 },
      { nom: '6ème-A', niveau: 2 }, { nom: '5ème-A', niveau: 2 }, { nom: '4ème-A', niveau: 2 }, { nom: '3ème-A', niveau: 2 },
      { nom: '2nde-A', niveau: 3 }, { nom: '1ère-S', niveau: 3 }, { nom: 'Terminale', niveau: 3 }
    ];
    
    const insertClasse = db.prepare('INSERT OR IGNORE INTO classes (nom, niveau_id) VALUES (?, ?)');
    classesData.forEach(c => insertClasse.run(c.nom, c.niveau));

    const matieresData = [
      { nom: 'Mathématiques', coefficient: 4 },
      { nom: 'Physique-Chimie', coefficient: 3 },
      { nom: 'SVT', coefficient: 3 },
      { nom: 'Français', coefficient: 4 },
      { nom: 'Arabe', coefficient: 3 },
      { nom: 'Anglais', coefficient: 3 },
      { nom: 'Histoire-Géographie', coefficient: 2 },
      { nom: 'Éducation Islamique', coefficient: 2 },
      { nom: 'Informatique', coefficient: 2 },
      { nom: 'Éducation Physique', coefficient: 1 }
    ];
    
    const insertMatiere = db.prepare('INSERT OR IGNORE INTO matieres (nom, coefficient) VALUES (?, ?)');
    matieresData.forEach(m => insertMatiere.run(m.nom, m.coefficient));

    const fraisData = [
      { niveau: 1, mensuel: 3500, trimestriel: 9800, annuel: 35000 },
      { niveau: 2, mensuel: 4200, trimestriel: 11800, annuel: 42000 },
      { niveau: 3, mensuel: 5000, trimestriel: 14000, annuel: 50000 }
    ];
    
    const insertFrais = db.prepare('INSERT OR IGNORE INTO frais_scolarite (niveau_id, montant_mensuel, montant_trimestriel, montant_annuel) VALUES (?, ?, ?, ?)');
    fraisData.forEach(f => insertFrais.run(f.niveau, f.mensuel, f.trimestriel, f.annuel));

    const parentsData = [
      { nom: 'Benali', prenom: 'Omar', telephone: '0661111111', email: 'omar.benali@email.ma', profession: 'Commerçant', adresse: '45 Rue Fatima, Marrakech' },
      { nom: 'Tazi', prenom: 'Fatima', telephone: '0662222222', email: 'fatima.tazi@email.ma', profession: 'Enseignante', adresse: '78 Avenue Hassan II, Marrakech' },
      { nom: 'Cherkaoui', prenom: 'Ahmed', telephone: '0663333333', email: 'ahmed.cherkaoui@email.ma', profession: 'Médecin', adresse: '123 Boulevard Anoual, Marrakech' },
      { nom: 'Benjelloun', prenom: 'Karim', telephone: '0664444444', email: 'karim.benjelloun@email.ma', profession: 'Ingénieur', adresse: '56 Rue Ibn Sina, Marrakech' },
      { nom: 'El Amrani', prenom: 'Samira', telephone: '0665555555', email: 'samira.elamrani@email.ma', profession: 'Avocate', adresse: '89 Rue Al Moukaouama, Marrakech' },
      { nom: 'Fadili', prenom: 'Youssef', telephone: '0666666666', email: 'youssef.fadili@email.ma', profession: 'Architecte', adresse: '34 Rue Mehdi, Marrakech' },
      { nom: 'Ouahhabi', prenom: 'Khadija', telephone: '0667777777', email: 'khadija.ouahhabi@email.ma', profession: 'Comptable', adresse: '67 Avenue Abdelkrim Khattabi, Marrakech' },
      { nom: 'Belhaj', prenom: 'Mohammed', telephone: '0668888888', email: 'mohammed.belhaj@email.ma', profession: 'Fonctionnaire', adresse: '90 Rue Ibn Khaldoun, Marrakech' },
      { nom: 'Sefrioui', prenom: 'Nadia', telephone: '0669999999', email: 'nadia.sefrioui@email.ma', profession: 'Infirmière', adresse: '12 Rue Tizi Ousli, Marrakech' },
      { nom: 'Amrani', prenom: 'Hicham', telephone: '0670000000', email: 'hicham.amrani@email.ma', profession: 'Avocat', adresse: '23 Rue Tansift, Marrakech' },
      { nom: 'Benhaddou', prenom: 'Said', telephone: '0671111111', email: 'said.benhaddou@email.ma', profession: 'Commerçant', adresse: '56 Rue des Provinces, Marrakech' },
      { nom: 'Alaoui', prenom: 'Fatima', telephone: '0672222222', email: 'fatima.alaoui@email.ma', profession: 'Professeure', adresse: '78 Rue Ibn Battouta, Marrakech' },
      { nom: 'Idrissi', prenom: 'Mohammed', telephone: '0673333333', email: 'mohammed.idrissi@email.ma', profession: 'Pharmacien', adresse: '90 Boulevard Allal El Fassi, Marrakech' },
      { nom: 'Mansouri', prenom: 'Samira', telephone: '0674444444', email: 'samira.mansouri@email.ma', profession: 'Dentiste', adresse: '34 Rue Khalid Ibn Walid, Marrakech' },
      { nom: 'Kettani', prenom: 'Abdelaziz', telephone: '0675555555', email: 'abdelaziz.kettani@email.ma', profession: 'Avocat', adresse: '56 Rue Youssef Ibn Tachfine, Marrakech' }
    ];
    
    const insertParent = db.prepare('INSERT INTO parents (nom, prenom, telephone, email, profession, adresse) VALUES (?, ?, ?, ?, ?, ?)');
    parentsData.forEach(p => insertParent.run(p.nom, p.prenom, p.telephone, p.email, p.profession, p.adresse));

    const elevesData = [
      { matricule: 'ELV001', prenom: 'Ilyas', nom: 'Benali', date_naissance: '15/09/2012', sexe: 'M', classe_id: 6, niveau_id: 1, parent_id: 1, transport: 1, itineraire: 'Zone Guéliz' },
      { matricule: 'ELV002', prenom: 'Lina', nom: 'Tazi', date_naissance: '22/03/2013', sexe: 'F', classe_id: 5, niveau_id: 1, parent_id: 2, transport: 0, itineraire: null },
      { matricule: 'ELV003', prenom: 'Adam', nom: 'Cherkaoui', date_naissance: '10/07/2010', sexe: 'M', classe_id: 7, niveau_id: 2, parent_id: 3, transport: 1, itineraire: 'Zone Hivernage' },
      { matricule: 'ELV004', prenom: 'Salma', nom: 'Benjelloun', date_naissance: '05/11/2011', sexe: 'F', classe_id: 8, niveau_id: 2, parent_id: 4, transport: 0, itineraire: null },
      { matricule: 'ELV005', prenom: 'Yassine', nom: 'El Amrani', date_naissance: '18/04/2009', sexe: 'M', classe_id: 9, niveau_id: 2, parent_id: 5, transport: 1, itineraire: 'Zone Centre' },
      { matricule: 'ELV006', prenom: 'Amina', nom: 'Fadili', date_naissance: '30/06/2008', sexe: 'F', classe_id: 10, niveau_id: 2, parent_id: 6, transport: 0, itineraire: null },
      { matricule: 'ELV007', prenom: 'Rayan', nom: 'Ouahhabi', date_naissance: '12/02/2014', sexe: 'M', classe_id: 4, niveau_id: 1, parent_id: 7, transport: 1, itineraire: 'Zone Guéliz' },
      { matricule: 'ELV008', prenom: 'Hajar', nom: 'Belhaj', date_naissance: '25/09/2012', sexe: 'F', classe_id: 6, niveau_id: 1, parent_id: 8, transport: 0, itineraire: null },
      { matricule: 'ELV009', prenom: 'Mehdi', nom: 'Sefrioui', date_naissance: '08/01/2013', sexe: 'M', classe_id: 5, niveau_id: 1, parent_id: 9, transport: 1, itineraire: 'Zone Menara' },
      { matricule: 'ELV010', prenom: 'Nour', nom: 'Amrani', date_naissance: '17/05/2011', sexe: 'F', classe_id: 8, niveau_id: 2, parent_id: 10, transport: 0, itineraire: null },
      { matricule: 'ELV011', prenom: 'Hamza', nom: 'Benhaddou', date_naissance: '03/08/2010', sexe: 'M', classe_id: 7, niveau_id: 2, parent_id: 11, transport: 1, itineraire: 'Zone Guéliz' },
      { matricule: 'ELV012', prenom: 'Zineb', nom: 'Alaoui', date_naissance: '20/11/2012', sexe: 'F', classe_id: 6, niveau_id: 1, parent_id: 12, transport: 0, itineraire: null },
      { matricule: 'ELV013', prenom: 'Omar', nom: 'Idrissi', date_naissance: '14/04/2011', sexe: 'M', classe_id: 8, niveau_id: 2, parent_id: 13, transport: 1, itineraire: 'Zone Hivernage' },
      { matricule: 'ELV014', prenom: 'Layla', nom: 'Mansouri', date_naissance: '07/12/2009', sexe: 'F', classe_id: 9, niveau_id: 2, parent_id: 14, transport: 0, itineraire: null },
      { matricule: 'ELV015', prenom: 'Ibrahim', nom: 'Kettani', date_naissance: '28/06/2014', sexe: 'M', classe_id: 3, niveau_id: 1, parent_id: 15, transport: 1, itineraire: 'Zone Centre' },
      { matricule: 'ELV016', prenom: 'Sanae', nom: 'El Fassi', date_naissance: '02/03/2013', sexe: 'F', classe_id: 5, niveau_id: 1, parent_id: 1, transport: 0, itineraire: null },
      { matricule: 'ELV017', prenom: 'Khalid', nom: 'Tazi', date_naissance: '19/07/2010', sexe: 'M', classe_id: 11, niveau_id: 3, parent_id: 2, transport: 1, itineraire: 'Zone Menara' },
      { matricule: 'ELV018', prenom: 'Rania', nom: 'Cherkaoui', date_naissance: '25/10/2012', sexe: 'F', classe_id: 6, niveau_id: 1, parent_id: 3, transport: 0, itineraire: null },
      { matricule: 'ELV019', prenom: 'Ayoub', nom: 'Benjelloun', date_naissance: '08/05/2011', sexe: 'M', classe_id: 9, niveau_id: 2, parent_id: 4, transport: 1, itineraire: 'Zone Centre' },
      { matricule: 'ELV020', prenom: 'Meriem', nom: 'El Amrani', date_naissance: '12/09/2008', sexe: 'F', classe_id: 12, niveau_id: 3, parent_id: 5, transport: 0, itineraire: null }
    ];
    
    const insertEleve = db.prepare(`
      INSERT OR IGNORE INTO eleves (matricule, prenom, nom, date_naissance, sexe, classe_id, niveau_id, annee_inscription, adresse, telephone_parent, email_parent, parent_id, transport, itineraire, statut)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    elevesData.forEach(e => {
      const parent = parentsData[e.parent_id - 1];
      insertEleve.run(
        e.matricule, e.prenom, e.nom, e.date_naissance, e.sexe, e.classe_id, e.niveau_id, '2025-2026',
        parent.adresse, parent.telephone, parent.email, e.parent_id, e.transport, e.itineraire, 'Actif'
      );
    });

    const enseignantsData = [
      { matricule: 'ENS001', prenom: 'Ahmed', nom: 'Benali', date_naissance: '15/03/1980', sexe: 'M', telephone: '0661234567', email: 'ahmed.benali@ecole-alamal.ma', adresse: '45 Rue Fatima, Marrakech', diplome: 'Licence en Mathématiques', specialite: 'Mathématiques', contrat: 'CDI', salaire: 8500, statut: 'Actif' },
      { matricule: 'ENS002', prenom: 'Fatima', nom: 'El Amrani', date_naissance: '22/07/1985', sexe: 'F', telephone: '0672345678', email: 'fatima.elamrani@ecole-alamal.ma', adresse: '78 Avenue Hassan II, Marrakech', diplome: 'Maîtrise de Physique', specialite: 'Physique-Chimie', contrat: 'CDI', salaire: 9000, statut: 'Actif' },
      { matricule: 'ENS003', prenom: 'Mohammed', nom: 'Tazi', date_naissance: '10/11/1978', sexe: 'M', telephone: '0683456789', email: 'mohammed.tazi@ecole-alamal.ma', adresse: '123 Boulevard Anoual, Marrakech', diplome: 'Doctorat en Français', specialite: 'Français', contrat: 'CDI', salaire: 9500, statut: 'Actif' },
      { matricule: 'ENS004', prenom: 'Khadija', nom: 'Benjelloun', date_naissance: '05/04/1988', sexe: 'F', telephone: '0694567890', email: 'khadija.benjelloun@ecole-alamal.ma', adresse: '56 Rue Ibn Sina, Marrakech', diplome: 'Licence d\'Anglais', specialite: 'Anglais', contrat: 'CDI', salaire: 8000, statut: 'Actif' },
      { matricule: 'ENS005', prenom: 'Youssef', nom: 'Cherkaoui', date_naissance: '20/09/1975', sexe: 'M', telephone: '0665678901', email: 'youssef.cherkaoui@ecole-alamal.ma', adresse: '89 Rue Al Moukaouama, Marrakech', diplome: 'Ingénieur en Informatique', specialite: 'Informatique', contrat: 'CDI', salaire: 10000, statut: 'Actif' },
      { matricule: 'ENS006', prenom: 'Samira', nom: 'Fadili', date_naissance: '12/06/1982', sexe: 'F', telephone: '0676789012', email: 'samira.fadili@ecole-alamal.ma', adresse: '34 Rue Mehdi, Marrakech', diplome: 'Licence en SVT', specialite: 'SVT', contrat: 'CDD', salaire: 7500, statut: 'Actif' },
      { matricule: 'ENS007', prenom: 'Hicham', nom: 'Ouahhabi', date_naissance: '30/01/1970', sexe: 'M', telephone: '0687890123', email: 'hicham.ouahhabi@ecole-alamal.ma', adresse: '67 Avenue Abdelkrim Khattabi, Marrakech', diplome: 'DES en Histoire', specialite: 'Histoire-Géographie', contrat: 'CDI', salaire: 8500, statut: 'Actif' },
      { matricule: 'ENS008', prenom: 'Nadia', nom: 'Belhaj', date_naissance: '18/08/1990', sexe: 'F', telephone: '0698901234', email: 'nadia.belhaj@ecole-alamal.ma', adresse: '90 Rue Ibn Khaldoun, Marrakech', diplome: 'Licence en Éducation Islamique', specialite: 'Éducation Islamique', contrat: 'Vacataire', salaire: 5000, statut: 'Actif' },
      { matricule: 'ENS009', prenom: 'Khalid', nom: 'Sefrioui', date_naissance: '25/12/1983', sexe: 'M', telephone: '0669012345', email: 'khalid.sefrioui@ecole-alamal.ma', adresse: '12 Rue Tizi Ousli, Marrakech', diplome: 'Diplôme EPS', specialite: 'Éducation Physique', contrat: 'CDI', salaire: 7000, statut: 'Actif' },
      { matricule: 'ENS010', prenom: 'Rachida', nom: 'Amrani', date_naissance: '08/03/1977', sexe: 'F', telephone: '0670123456', email: 'rachida.amrani@ecole-alamal.ma', adresse: '23 Rue Tansift, Marrakech', diplome: 'Maîtrise de Physique', specialite: 'Physique-Chimie', contrat: 'CDI', salaire: 9200, statut: 'Congé' }
    ];
    
    const insertEnseignant = db.prepare(`
      INSERT OR IGNORE INTO enseignants (matricule, prenom, nom, date_naissance, sexe, telephone, email, adresse, diplome, specialite, contrat, salaire, statut)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    enseignantsData.forEach(e => insertEnseignant.run(e.matricule, e.prenom, e.nom, e.date_naissance, e.sexe, e.telephone, e.email, e.adresse, e.diplome, e.specialite, e.contrat, e.salaire, e.statut));

    const personnelData = [
      { matricule: 'EMP001', prenom: 'Abdelkader', nom: 'Benhima', poste: 'Directeur', telephone: '0661234567', email: 'abdelkader.benhima@ecole-alamal.ma', salaire: 15000, statut: 'Actif' },
      { matricule: 'EMP002', prenom: 'Houda', nom: 'Lahlou', poste: 'Secrétaire de direction', telephone: '0662345678', email: 'houda.lahlou@ecole-alamal.ma', salaire: 6000, statut: 'Actif' },
      { matricule: 'EMP003', prenom: 'Tarik', nom: 'Moulin', poste: 'Comptable', telephone: '0663456789', email: 'tarik.moulin@ecole-alamal.ma', salaire: 8000, statut: 'Actif' },
      { matricule: 'EMP004', prenom: 'Sanaa', nom: 'Tahiri', poste: 'Secrétaire', telephone: '0664567890', email: 'sanaa.tahiri@ecole-alamal.ma', salaire: 5000, statut: 'Actif' },
      { matricule: 'EMP005', prenom: 'Rachid', nom: 'Zaoui', poste: 'Agent d\'entretien', telephone: '0665678901', email: 'rachid.zaoui@ecole-alamal.ma', salaire: 4000, statut: 'Actif' }
    ];
    
    const insertPersonnel = db.prepare(`
      INSERT OR IGNORE INTO personnel (matricule, prenom, nom, poste, telephone, email, salaire, statut)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    personnelData.forEach(p => insertPersonnel.run(p.matricule, p.prenom, p.nom, p.poste, p.telephone, p.email, p.salaire, p.statut));

    const vehiculesData = [
      { numero: 'VH-001', type: 'Minibus', immatriculation: '1234-A-12', capacite: 24, chauffeur_nom: 'Ahmed Benjir', chauffeur_telephone: '0661234567', statut: 'En service', prochain_controle: '15/06/2026' },
      { numero: 'VH-002', type: 'Bus', immatriculation: '5678-B-12', capacite: 48, chauffeur_nom: 'Mohammed Tazi', chauffeur_telephone: '0662345678', statut: 'En service', prochain_controle: '20/05/2026' },
      { numero: 'VH-003', type: 'Minibus', immatriculation: '9012-C-12', capacite: 20, chauffeur_nom: 'Karim Sefrioui', chauffeur_telephone: '0663456789', statut: 'En maintenance', prochain_controle: '10/04/2026' }
    ];
    
    const insertVehicule = db.prepare(`
      INSERT OR IGNORE INTO vehicules (numero, type, immatriculation, capacite, chauffeur_nom, chauffeur_telephone, statut, prochain_controle)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    vehiculesData.forEach(v => insertVehicule.run(v.numero, v.type, v.immatriculation, v.capacite, v.chauffeur_nom, v.chauffeur_telephone, v.statut, v.prochain_controle));

    const itinerairesData = [
      { nom: 'Zone Guéliz', zone: 'Centre-ville', vehicule_id: 1, heure_depart: '07:30', heure_arrivee: '08:00', arrets: ['Place du 16 Novembre', 'Café de la Paix', 'Avenue Mohammed V'] },
      { nom: 'Zone Hivernage', zone: 'Hivernage', vehicule_id: 2, heure_depart: '07:15', heure_arrivee: '08:00', arrets: ['Avenue Mohammed VI', 'Palmeraie', 'Circuit de la Palmeraie'] },
      { nom: 'Zone Menara', zone: 'Menara', vehicule_id: 3, heure_depart: '07:45', heure_arrivee: '08:15', arrets: ['Avenue de la Ménara', 'Kasbah', 'Moulin'] }
    ];
    
    const insertItineraire = db.prepare(`
      INSERT OR IGNORE INTO itineraires (nom, zone, vehicule_id, heure_depart, heure_arrivee)
      VALUES (?, ?, ?, ?, ?)
    `);
    const insertArret = db.prepare('INSERT OR IGNORE INTO arrets (itineraire_id, nom, ordre) VALUES (?, ?, ?)');
    
    itinerairesData.forEach((it, idx) => {
      const result = insertItineraire.run(it.nom, it.zone, it.vehicule_id, it.heure_depart, it.heure_arrivee);
      it.arrets.forEach((arret, order) => {
        insertArret.run(result.lastInsertRowid, arret, order + 1);
      });
    });

    const evenementsData = [
      { titre: 'Fête de fin d\'année scolaire', date: '15/06/2026', heure: '10:00', lieu: 'Salle des fêtes', type: 'Événement' },
      { titre: 'Conseil de classe - Trimestre 2', date: '20/04/2026', heure: '15:00', lieu: 'Salle des réunions', type: 'Réunion' },
      { titre: 'Examens du 1er Trimestre', date: '12/05/2026', heure: '08:00', lieu: 'Salles de classe', type: 'Examen' },
      { titre: 'Journée portes ouvertes', date: '25/04/2026', heure: '09:00', lieu: 'École', type: 'Événement' },
      { titre: 'Réunion parents-profs', date: '18/04/2026', heure: '16:00', lieu: 'Salles de classe', type: 'Réunion' }
    ];
    
    const insertEvenement = db.prepare('INSERT OR IGNORE INTO evenements (titre, date, heure, lieu, type) VALUES (?, ?, ?, ?, ?)');
    evenementsData.forEach(e => insertEvenement.run(e.titre, e.date, e.heure, e.lieu, e.type));

    const insertFacture = db.prepare('INSERT OR IGNORE INTO factures (numero, eleve_id, montant, date_emission, date_echeance, statut, mode_paiement) VALUES (?, ?, ?, ?, ?, ?, ?)');
    const insertPaiement = db.prepare('INSERT OR IGNORE INTO paiements (facture_id, montant, date, mode, reference) VALUES (?, ?, ?, ?, ?)');

    elevesData.forEach((eleve, idx) => {
      const montant = eleve.niveau_id === 1 ? 9800 : 11800;
      const statut = idx < 10 ? 'Payée' : (idx < 17 ? 'En attente' : 'En retard');
      const modePaiement = statut === 'Payée' ? (idx % 2 === 0 ? 'Virement' : 'Espèces') : null;
      
      const factureResult = insertFacture.run(
        `FAC-2026-${String(idx + 1).padStart(4, '0')}`,
        idx + 1,
        montant,
        '01/04/2026',
        '15/04/2026',
        statut,
        modePaiement
      );
      
      if (statut === 'Payée') {
        insertPaiement.run(
          factureResult.lastInsertRowid,
          montant,
          `0${idx % 9 + 1}/04/2026`,
          modePaiement,
          `${modePaiement === 'Virement' ? 'VIR' : 'ESP'}-2026-${String(idx + 1).padStart(4, '0')}`
        );
      }
    });

    const settingsData = [
      { key: 'school_name', value: 'École Privée Al Amal' },
      { key: 'school_address', value: '123 Boulevard Mohammed V, Marrakech 40000' },
      { key: 'school_phone', value: '+212 524 123 456' },
      { key: 'school_email', value: 'contact@ecole-alamal.ma' },
      { key: 'academic_year', value: '2025-2026' },
      { key: 'notifications_email', value: 'true' },
      { key: 'notifications_sms', value: 'false' }
    ];
    
    const insertSetting = db.prepare('INSERT OR IGNORE INTO settings (key, value) VALUES (?, ?)');
    settingsData.forEach(s => insertSetting.run(s.key, s.value));

    console.log('✅ Seed data inserted successfully');
    console.log('   - 3 niveaux');
    console.log('   - 13 classes');
    console.log('   - 10 matières');
    console.log('   - 15 parents');
    console.log('   - 20 élèves');
    console.log('   - 10 enseignants');
    console.log('   - 5 personnel');
    console.log('   - 3 véhicules');
    console.log('   - 3 itinéraires');
    console.log('   - 5 événements');
    console.log('   - 20 factures');
    console.log('   - 10 paiements');
  }
}

export default db;
