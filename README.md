# ClassConnect - Système de Gestion Scolaire

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Status](https://img.shields.io/badge/status-En%20production-green)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)
![License](https://img.shields.io/badge/license-MIT-orange)

Application web complète de gestion scolaire pour les établissements marocains. ClassConnect permet de gérer efficacement les élèves, enseignants, finances, transport et bien plus encore.

---

## 🎯 Fonctionnalités

### Gestion des Élèves
- Inscription et suivi des dossiers scolaires
- Gestion des absences et présences
- Notes et évaluations
- Génération automatique des bulletins

### Espace Enseignants
- Gestion des cours et matières
- Saisie des notes
- Emplois du temps
- Suivi des évaluations

### Finance & Facturation
- Frais de scolarité (en MAD)
- Facturation automatique
- Suivi des paiements
- Rapports financiers détaillés

### Transport Scolaire
- Gestion des véhicules
- Itinéraires et arrêts
- Suivi des élèves transportés

### Tableau de Bord
- KPIs en temps réel
- Graphiques et statistiques
- Événements à venir

---

## 🛠️ Technologies

| Frontend | Backend | Base de données |
|----------|---------|-----------------|
| React 18 | Express.js | SQLite |
| Vite | Node.js | better-sqlite3 |
| Recharts | CORS | |
| Lucide Icons | Dotenv | |

---

## 📋 Prérequis

- **Node.js** >= 18.0.0
- **npm** ou **yarn**

---

## 🚀 Installation

### 1. Cloner le repository

```bash
git clone https://github.com/Hatimlk/ClassConnect.git
cd ClassConnect
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configurer l'environnement

Le fichier `.env` est déjà configuré:

```env
PORT=3001
```

### 4. Lancer l'application

```bash
# Mode développement (frontend + backend)
npm run dev

# Backend uniquement
npm run dev:server

# Frontend uniquement
npm run dev:client
```

---

## 👥 Comptes de démonstration

| Utilisateur | Mot de passe | Rôle |
|------------|--------------|------|
| admin | admin123 | Administrateur |
| direction | direction123 | Directeur |
| comptable | comptable123 | Comptable |

---

## 📁 Structure du projet

```
ClassConnect/
├── src/
│   ├── components/
│   │   ├── sections/        # Pages de l'application
│   │   ├── Landing.jsx      # Page d'accueil
│   │   ├── Login.jsx        # Page de connexion
│   │   ├── Layout.jsx      # Layout principal
│   │   └── Modal.jsx        # Composant modal
│   ├── context/
│   │   └── AppContext.jsx   # Gestion d'état global
│   ├── data/
│   │   └── mockData.js      # Données de test
│   └── styles/
│       └── index.css         # Styles globaux
├── server/
│   ├── models/
│   │   └── database.js      # Modèle de base de données
│   ├── routes/              # Routes API
│   │   ├── auth.js
│   │   ├── eleves.js
│   │   ├── enseignants.js
│   │   ├── factures.js
│   │   └── ...
│   └── index.js             # Serveur Express
├── index.html
├── package.json
└── vite.config.js
```

---

## 🌐 API Endpoints

### Authentification
| Méthode | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/auth/login` | Connexion utilisateur |
| POST | `/api/auth/register` | Inscription |
| GET | `/api/auth/users` | Liste des utilisateurs |

### Ressources
| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET/POST | `/api/eleves` | Élèves |
| GET/POST | `/api/enseignants` | Enseignants |
| GET/POST | `/api/personnel` | Personnel |
| GET/POST | `/api/factures` | Factures |
| GET/POST | `/api/paiements` | Paiements |
| GET/POST | `/api/transport` | Transport |

---

## 💰 Tarifs

| Plan | Prix | Élèves |
|------|------|--------|
| Essentiel | 500 MAD/mois | Jusqu'à 50 |
| Professionnel | 1 500 MAD/mois | Jusqu'à 200 |
| Entreprise | Sur devis | Illimités |

---

## 🎨 Design

- **Palette de couleurs:**
  - Primaire: `#1E3A5F`
  - Accent: `#F4A261`
  - Succès: `#2A9D8F`
  - Danger: `#E76F51`

- **Typographie:**
  - Titres: DM Serif Display
  - Corps: DM Sans / Nunito

---

## 📱 Responsive

L'application est entièrement responsive et fonctionne sur:
- 💻 Desktop
- 📱 Tablette
- 📲 Mobile

---

## 🔒 Sécurité

- Gestion des utilisateurs avec rôles
- Protection des routes par authentification
- Validation des données côté serveur

---

## 🤝 Contribution

Les contributions sont les bienvenues ! Veuillez d'abord discuter des changements que vous souhaitez effectuer via une issue.

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit (`git commit -m 'Add AmazingFeature'`)
4. Push (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

---

## 📝 License

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

## 📧 Contact

- **Email:** contact@classconnect.ma
- **Site web:** https://classconnect.ma

**Fait avec ❤️ au Maroc 🇲🇦**

---

<p align="center">
  <a href="https://github.com/Hatimlk/ClassConnect">
    <img src="https://img.shields.io/badge/GitHub-ClassConnect-blue?style=for-the-badge&logo=github" alt="GitHub">
  </a>
</p>
