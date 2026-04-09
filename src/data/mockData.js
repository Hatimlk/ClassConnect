export const etablissement = {
  nom: "École Privée Al Amal",
  adresse: "123 Boulevard Mohammed V, Marrakech 40000",
  telephone: "+212 524 123 456",
  email: "contact@ecole-alamal.ma",
  anneeScolaire: "2025-2026",
  logo: null
};

export const niveaux = [
  { id: 1, nom: "Primaire", classes: ["CP1", "CP2", "CE1", "CE2", "CM1", "CM2"] },
  { id: 2, nom: "Collège", classes: ["6ème", "5ème", "4ème", "3ème"] },
  { id: 3, nom: "Lycée", classes: ["2nde", "1ère", "Terminale"] }
];

export const matieres = [
  { id: 1, nom: "Mathématiques", coefficient: 4 },
  { id: 2, nom: "Physique-Chimie", coefficient: 3 },
  { id: 3, nom: "SVT", coefficient: 3 },
  { id: 4, nom: "Français", coefficient: 4 },
  { id: 5, nom: "Arabe", coefficient: 3 },
  { id: 6, nom: "Anglais", coefficient: 3 },
  { id: 7, nom: "Histoire-Géographie", coefficient: 2 },
  { id: 8, nom: "Éducation Islamique", coefficient: 2 },
  { id: 9, nom: "Informatique", coefficient: 2 },
  { id: 10, nom: "Éducation Physique", coefficient: 1 }
];

export const enseignants = [
  {
    id: 1,
    matricule: "ENS001",
    prenom: "Ahmed",
    nom: "Benali",
    dateNaissance: "15/03/1980",
    sexe: "M",
    telephone: "0661234567",
    email: "ahmed.benali@ecole-alamal.ma",
    adresse: "45 Rue Fatima, Marrakech",
    diplome: "Licence en Mathématiques",
    specialite: "Mathématiques",
    matieres: [1],
    classes: ["CM2-A", "6ème-A"],
    contrat: "CDI",
    salaire: 8500,
    dateEmbauche: "01/09/2015",
    statut: "Actif"
  },
  {
    id: 2,
    matricule: "ENS002",
    prenom: "Fatima",
    nom: "El Amrani",
    dateNaissance: "22/07/1985",
    sexe: "F",
    telephone: "0672345678",
    email: "fatima.elamrani@ecole-alamal.ma",
    adresse: "78 Avenue Hassan II, Marrakech",
    diplome: "Maîtrise de Physique",
    specialite: "Physique-Chimie",
    matieres: [2],
    classes: ["3ème-A", "4ème-A"],
    contrat: "CDI",
    salaire: 9000,
    dateEmbauche: "15/09/2013",
    statut: "Actif"
  },
  {
    id: 3,
    matricule: "ENS003",
    prenom: "Mohammed",
    nom: "Tazi",
    dateNaissance: "10/11/1978",
    sexe: "M",
    telephone: "0683456789",
    email: "mohammed.tazi@ecole-alamal.ma",
    adresse: "123 Boulevard Anoual, Marrakech",
    diplome: "Doctorat en Français",
    specialite: "Français",
    matieres: [4, 5],
    classes: ["CM1-A", "CE2-A"],
    contrat: "CDI",
    salaire: 9500,
    dateEmbauche: "01/09/2010",
    statut: "Actif"
  },
  {
    id: 4,
    matricule: "ENS004",
    prenom: "Khadija",
    nom: "Benjelloun",
    dateNaissance: "05/04/1988",
    sexe: "F",
    telephone: "0694567890",
    email: "khadija.benjelloun@ecole-alamal.ma",
    adresse: "56 Rue Ibn Sina, Marrakech",
    diplome: "Licence d'Anglais",
    specialite: "Anglais",
    matieres: [6],
    classes: ["5ème-A", "2nde-A"],
    contrat: "CDI",
    salaire: 8000,
    dateEmbauche: "01/09/2018",
    statut: "Actif"
  },
  {
    id: 5,
    matricule: "ENS005",
    prenom: "Youssef",
    nom: "Cherkaoui",
    dateNaissance: "20/09/1975",
    sexe: "M",
    telephone: "0665678901",
    email: "youssef.cherkaoui@ecole-alamal.ma",
    adresse: "89 Rue Al Moukaouama, Marrakech",
    diplome: "Ingénieur en Informatique",
    specialite: "Informatique",
    matieres: [9],
    classes: ["CM2-A", "3ème-A"],
    contrat: "CDI",
    salaire: 10000,
    dateEmbauche: "01/09/2012",
    statut: "Actif"
  },
  {
    id: 6,
    matricule: "ENS006",
    prenom: "Samira",
    nom: "Fadili",
    dateNaissance: "12/06/1982",
    sexe: "F",
    telephone: "0676789012",
    email: "samira.fadili@ecole-alamal.ma",
    adresse: "34 Rue Mehdi, Marrakech",
    diplome: "Licence en SVT",
    specialite: "SVT",
    matieres: [3],
    classes: ["4ème-A", "5ème-A"],
    contrat: "CDD",
    salaire: 7500,
    dateEmbauche: "15/01/2024",
    statut: "Actif"
  },
  {
    id: 7,
    matricule: "ENS007",
    prenom: "Hicham",
    nom: "Ouahhabi",
    dateNaissance: "30/01/1970",
    sexe: "M",
    telephone: "0687890123",
    email: "hicham.ouahhabi@ecole-alamal.ma",
    adresse: "67 Avenue Abdelkrim Khattabi, Marrakech",
    diplome: "DES en Histoire",
    specialite: "Histoire-Géographie",
    matieres: [7],
    classes: ["6ème-A", "3ème-A"],
    contrat: "CDI",
    salaire: 8500,
    dateEmbauche: "01/09/2008",
    statut: "Actif"
  },
  {
    id: 8,
    matricule: "ENS008",
    prenom: "Nadia",
    nom: "Belhaj",
    dateNaissance: "18/08/1990",
    sexe: "F",
    telephone: "0698901234",
    email: "nadia.belhaj@ecole-alamal.ma",
    adresse: "90 Rue Ibn Khaldoun, Marrakech",
    diplome: "Licence en Éducation Islamique",
    specialite: "Éducation Islamique",
    matieres: [8],
    classes: ["CM1-A", "4ème-A"],
    contrat: "Vacataire",
    salaire: 5000,
    dateEmbauche: "01/09/2020",
    statut: "Actif"
  },
  {
    id: 9,
    matricule: "ENS009",
    prenom: "Khalid",
    nom: "Sefrioui",
    dateNaissance: "25/12/1983",
    sexe: "M",
    telephone: "0669012345",
    email: "khalid.sefrioui@ecole-alamal.ma",
    adresse: "12 Rue Tizi Ousli, Marrakech",
    diplome: "Diplôme EPS",
    specialite: "Éducation Physique",
    matieres: [10],
    classes: ["Toutes classes"],
    contrat: "CDI",
    salaire: 7000,
    dateEmbauche: "01/09/2016",
    statut: "Actif"
  },
  {
    id: 10,
    matricule: "ENS010",
    prenom: "Rachida",
    nom: "Amrani",
    dateNaissance: "08/03/1977",
    sexe: "F",
    telephone: "0670123456",
    email: "rachida.amrani@ecole-alamal.ma",
    adresse: "23 Rue Tansift, Marrakech",
    diplome: "Maîtrise de Physique",
    specialite: "Physique-Chimie",
    matieres: [2],
    classes: ["2nde-A", "1ère-S"],
    contrat: "CDI",
    salaire: 9200,
    dateEmbauche: "01/09/2011",
    statut: "Congé"
  }
];

export const parents = [
  { id: 1, nom: "Benali", prenom: "Omar", telephone: "0661111111", email: "omar.benali@email.ma", profession: "Commerçant" },
  { id: 2, nom: "Tazi", prenom: "Fatima", telephone: "0662222222", email: "fatima.tazi@email.ma", profession: "Enseignante" },
  { id: 3, nom: "Cherkaoui", prenom: "Ahmed", telephone: "0663333333", email: "ahmed.cherkaoui@email.ma", profession: "Médecin" },
  { id: 4, nom: "Benjelloun", prenom: "Karim", telephone: "0664444444", email: "karim.benjelloun@email.ma", profession: "Ingénieur" },
  { id: 5, nom: "El Amrani", prenom: "Samira", telephone: "0665555555", email: "samira.elamrani@email.ma", profession: "Avocate" },
  { id: 6, nom: "Fadili", prenom: "Youssef", telephone: "0666666666", email: "youssef.fadili@email.ma", profession: "Architecte" },
  { id: 7, nom: "Ouahhabi", prenom: "Khadija", telephone: "0667777777", email: "khadija.ouahhabi@email.ma", profession: "Comptable" },
  { id: 8, nom: "Belhaj", prenom: "Mohammed", telephone: "0668888888", email: "mohammed.belhaj@email.ma", profession: "Fonctionnaire" },
  { id: 9, nom: "Sefrioui", prenom: "Nadia", telephone: "0669999999", email: "nadia.sefrioui@email.ma", profession: "Infirmière" },
  { id: 10, nom: "Amrani", prenom: "Hicham", telephone: "0670000000", email: "hicham.amrani@email.ma", profession: "Avocat" }
];

export const eleves = [
  {
    id: 1,
    matricule: "ELV001",
    prenom: "Ilyas",
    nom: "Benali",
    dateNaissance: "15/09/2012",
    sexe: "M",
    classe: "CM2-A",
    niveau: "Primaire",
    anneeInscription: "2025-2026",
    adresse: "45 Rue Fatima, Marrakech",
    telephoneParent: "0661111111",
    emailParent: "omar.benali@email.ma",
    parent: parents[0],
    transport: true,
    itineraire: "Zone Guéliz",
    statut: "Actif",
    photo: null
  },
  {
    id: 2,
    matricule: "ELV002",
    prenom: "Lina",
    nom: "Tazi",
    dateNaissance: "22/03/2013",
    sexe: "F",
    classe: "CM1-A",
    niveau: "Primaire",
    anneeInscription: "2025-2026",
    adresse: "78 Avenue Hassan II, Marrakech",
    telephoneParent: "0662222222",
    emailParent: "fatima.tazi@email.ma",
    parent: parents[1],
    transport: false,
    statut: "Actif",
    photo: null
  },
  {
    id: 3,
    matricule: "ELV003",
    prenom: "Adam",
    nom: "Cherkaoui",
    dateNaissance: "10/07/2010",
    sexe: "M",
    classe: "6ème-A",
    niveau: "Collège",
    anneeInscription: "2025-2026",
    adresse: "123 Boulevard Anoual, Marrakech",
    telephoneParent: "0663333333",
    emailParent: "ahmed.cherkaoui@email.ma",
    parent: parents[2],
    transport: true,
    itineraire: "Zone Hivernage",
    statut: "Actif",
    photo: null
  },
  {
    id: 4,
    matricule: "ELV004",
    prenom: "Salma",
    nom: "Benjelloun",
    dateNaissance: "05/11/2011",
    sexe: "F",
    classe: "5ème-A",
    niveau: "Collège",
    anneeInscription: "2025-2026",
    adresse: "56 Rue Ibn Sina, Marrakech",
    telephoneParent: "0664444444",
    emailParent: "karim.benjelloun@email.ma",
    parent: parents[3],
    transport: false,
    statut: "Actif",
    photo: null
  },
  {
    id: 5,
    matricule: "ELV005",
    prenom: "Yassine",
    nom: "El Amrani",
    dateNaissance: "18/04/2009",
    sexe: "M",
    classe: "4ème-A",
    niveau: "Collège",
    anneeInscription: "2025-2026",
    adresse: "89 Rue Al Moukaouama, Marrakech",
    telephoneParent: "0665555555",
    emailParent: "samira.elamrani@email.ma",
    parent: parents[4],
    transport: true,
    itineraire: "Zone Centre",
    statut: "Actif",
    photo: null
  },
  {
    id: 6,
    matricule: "ELV006",
    prenom: "Amina",
    nom: "Fadili",
    dateNaissance: "30/06/2008",
    sexe: "F",
    classe: "3ème-A",
    niveau: "Collège",
    anneeInscription: "2025-2026",
    adresse: "34 Rue Mehdi, Marrakech",
    telephoneParent: "0666666666",
    emailParent: "youssef.fadili@email.ma",
    parent: parents[5],
    transport: false,
    statut: "Actif",
    photo: null
  },
  {
    id: 7,
    matricule: "ELV007",
    prenom: "Rayan",
    nom: "Ouahhabi",
    dateNaissance: "12/02/2014",
    sexe: "M",
    classe: "CE2-A",
    niveau: "Primaire",
    anneeInscription: "2025-2026",
    adresse: "67 Avenue Abdelkrim Khattabi, Marrakech",
    telephoneParent: "0667777777",
    emailParent: "khadija.ouahhabi@email.ma",
    parent: parents[6],
    transport: true,
    itineraire: "Zone Guéliz",
    statut: "Actif",
    photo: null
  },
  {
    id: 8,
    matricule: "ELV008",
    prenom: "Hajar",
    nom: "Belhaj",
    dateNaissance: "25/09/2012",
    sexe: "F",
    classe: "CM2-A",
    niveau: "Primaire",
    anneeInscription: "2025-2026",
    adresse: "90 Rue Ibn Khaldoun, Marrakech",
    telephoneParent: "0668888888",
    emailParent: "mohammed.belhaj@email.ma",
    parent: parents[7],
    transport: false,
    statut: "Actif",
    photo: null
  },
  {
    id: 9,
    matricule: "ELV009",
    prenom: "Mehdi",
    nom: "Sefrioui",
    dateNaissance: "08/01/2013",
    sexe: "M",
    classe: "CM1-A",
    niveau: "Primaire",
    anneeInscription: "2025-2026",
    adresse: "12 Rue Tizi Ousli, Marrakech",
    telephoneParent: "0669999999",
    emailParent: "nadia.sefrioui@email.ma",
    parent: parents[8],
    transport: true,
    itineraire: "Zone Menara",
    statut: "Actif",
    photo: null
  },
  {
    id: 10,
    matricule: "ELV010",
    prenom: "Nour",
    nom: "Amrani",
    dateNaissance: "17/05/2011",
    sexe: "F",
    classe: "5ème-A",
    niveau: "Collège",
    anneeInscription: "2025-2026",
    adresse: "23 Rue Tansift, Marrakech",
    telephoneParent: "0670000000",
    emailParent: "hicham.amrani@email.ma",
    parent: parents[9],
    transport: false,
    statut: "Actif",
    photo: null
  },
  {
    id: 11,
    matricule: "ELV011",
    prenom: "Hamza",
    nom: "Benhaddou",
    dateNaissance: "03/08/2010",
    sexe: "M",
    classe: "6ème-A",
    niveau: "Collège",
    anneeInscription: "2025-2026",
    adresse: "56 Rue des Provinces, Marrakech",
    telephoneParent: "0671111111",
    emailParent: "said.benhaddou@email.ma",
    parent: { id: 11, nom: "Benhaddou", prenom: "Said", telephone: "0671111111", email: "said.benhaddou@email.ma", profession: "Commerçant" },
    transport: true,
    itineraire: "Zone Guéliz",
    statut: "Actif",
    photo: null
  },
  {
    id: 12,
    matricule: "ELV012",
    prenom: "Zineb",
    nom: "Alaoui",
    dateNaissance: "20/11/2012",
    sexe: "F",
    classe: "CM2-A",
    niveau: "Primaire",
    anneeInscription: "2025-2026",
    adresse: "78 Rue Ibn Battouta, Marrakech",
    telephoneParent: "0672222222",
    emailParent: "fatima.alaoui@email.ma",
    parent: { id: 12, nom: "Alaoui", prenom: "Fatima", telephone: "0672222222", email: "fatima.alaoui@email.ma", profession: "Professeure" },
    transport: false,
    statut: "Actif",
    photo: null
  },
  {
    id: 13,
    matricule: "ELV013",
    prenom: "Omar",
    nom: "Idrissi",
    dateNaissance: "14/04/2011",
    sexe: "M",
    classe: "5ème-A",
    niveau: "Collège",
    anneeInscription: "2025-2026",
    adresse: "90 Boulevard Allal El Fassi, Marrakech",
    telephoneParent: "0673333333",
    emailParent: "mohammed.idrissi@email.ma",
    parent: { id: 13, nom: "Idrissi", prenom: "Mohammed", telephone: "0673333333", email: "mohammed.idrissi@email.ma", profession: "Pharmacien" },
    transport: true,
    itineraire: "Zone Hivernage",
    statut: "Actif",
    photo: null
  },
  {
    id: 14,
    matricule: "ELV014",
    prenom: "Layla",
    nom: "Mansouri",
    dateNaissance: "07/12/2009",
    sexe: "F",
    classe: "4ème-A",
    niveau: "Collège",
    anneeInscription: "2025-2026",
    adresse: "34 Rue Khalid Ibn Walid, Marrakech",
    telephoneParent: "0674444444",
    emailParent: "samira.mansouri@email.ma",
    parent: { id: 14, nom: "Mansouri", prenom: "Samira", telephone: "0674444444", email: "samira.mansouri@email.ma", profession: "Dentiste" },
    transport: false,
    statut: "Actif",
    photo: null
  },
  {
    id: 15,
    matricule: "ELV015",
    prenom: "Ibrahim",
    nom: "Kettani",
    dateNaissance: "28/06/2014",
    sexe: "M",
    classe: "CE1-A",
    niveau: "Primaire",
    anneeInscription: "2025-2026",
    adresse: "56 Rue Youssef Ibn Tachfine, Marrakech",
    telephoneParent: "0675555555",
    emailParent: "abdelaziz.kettani@email.ma",
    parent: { id: 15, nom: "Kettani", prenom: "Abdelaziz", telephone: "0675555555", email: "abdelaziz.kettani@email.ma", profession: "Avocat" },
    transport: true,
    itineraire: "Zone Centre",
    statut: "Actif",
    photo: null
  }
];

export const fraisScolarite = [
  { niveau: "Primaire", montantMensuel: 3500, montantTrimestriel: 9800, montantAnnuel: 35000 },
  { niveau: "Collège", montantMensuel: 4200, montantTrimestriel: 11800, montantAnnuel: 42000 },
  { niveau: "Lycée", montantMensuel: 5000, montantTrimestriel: 14000, montantAnnuel: 50000 }
];

export const factures = [
  { id: 1, numero: "FAC-2026-0001", eleve: eleves[0], montant: 9800, dateEmission: "01/04/2026", dateEcheance: "15/04/2026", statut: "Payée", modePaiement: "Virement" },
  { id: 2, numero: "FAC-2026-0002", eleve: eleves[1], montant: 9800, dateEmission: "01/04/2026", dateEcheance: "15/04/2026", statut: "Payée", modePaiement: "Espèces" },
  { id: 3, numero: "FAC-2026-0003", eleve: eleves[2], montant: 11800, dateEmission: "01/04/2026", dateEcheance: "15/04/2026", statut: "En attente", modePaiement: null },
  { id: 4, numero: "FAC-2026-0004", eleve: eleves[3], montant: 11800, dateEmission: "01/04/2026", dateEcheance: "15/04/2026", statut: "En attente", modePaiement: null },
  { id: 5, numero: "FAC-2026-0005", eleve: eleves[4], montant: 11800, dateEmission: "01/04/2026", dateEcheance: "15/04/2026", statut: "En retard", modePaiement: null },
  { id: 6, numero: "FAC-2026-0006", eleve: eleves[5], montant: 11800, dateEmission: "01/04/2026", dateEcheance: "15/04/2026", statut: "Payée", modePaiement: "Chèque" },
  { id: 7, numero: "FAC-2026-0007", eleve: eleves[6], montant: 9800, dateEmission: "01/04/2026", dateEcheance: "15/04/2026", statut: "Payée", modePaiement: "Virement" },
  { id: 8, numero: "FAC-2026-0008", eleve: eleves[7], montant: 9800, dateEmission: "01/04/2026", dateEcheance: "15/04/2026", statut: "En attente", modePaiement: null },
  { id: 9, numero: "FAC-2026-0009", eleve: eleves[8], montant: 9800, dateEmission: "01/04/2026", dateEcheance: "15/04/2026", statut: "Payée", modePaiement: "Mobile (Orange Money)" },
  { id: 10, numero: "FAC-2026-0010", eleve: eleves[9], montant: 11800, dateEmission: "01/04/2026", dateEcheance: "15/04/2026", statut: "Payée", modePaiement: "Virement" },
  { id: 11, numero: "FAC-2026-0011", eleve: eleves[10], montant: 11800, dateEmission: "01/04/2026", dateEcheance: "15/04/2026", statut: "En retard", modePaiement: null },
  { id: 12, numero: "FAC-2026-0012", eleve: eleves[11], montant: 9800, dateEmission: "01/04/2026", dateEcheance: "15/04/2026", statut: "Payée", modePaiement: "Espèces" },
  { id: 13, numero: "FAC-2026-0013", eleve: eleves[12], montant: 11800, dateEmission: "01/04/2026", dateEcheance: "15/04/2026", statut: "En attente", modePaiement: null },
  { id: 14, numero: "FAC-2026-0014", eleve: eleves[13], montant: 11800, dateEmission: "01/04/2026", dateEcheance: "15/04/2026", statut: "Annulée", modePaiement: null },
  { id: 15, numero: "FAC-2026-0015", eleve: eleves[14], montant: 9800, dateEmission: "01/04/2026", dateEcheance: "15/04/2026", statut: "Payée", modePaiement: "Virement" }
];

export const paiements = [
  { id: 1, facture: factures[0], montant: 9800, date: "05/04/2026", mode: "Virement", reference: "VIR-2026-0456" },
  { id: 2, facture: factures[1], montant: 9800, date: "03/04/2026", mode: "Espèces", reference: "ESP-2026-0123" },
  { id: 3, facture: factures[5], montant: 11800, date: "08/04/2026", mode: "Chèque", reference: "CHQ-2026-0089" },
  { id: 4, facture: factures[6], montant: 9800, date: "02/04/2026", mode: "Virement", reference: "VIR-2026-0423" },
  { id: 5, facture: factures[8], montant: 9800, date: "10/04/2026", mode: "Mobile", reference: "OM-2026-1567" },
  { id: 6, facture: factures[9], montant: 11800, date: "04/04/2026", mode: "Virement", reference: "VIR-2026-0489" },
  { id: 7, facture: factures[11], montant: 9800, date: "06/04/2026", mode: "Espèces", reference: "ESP-2026-0156" },
  { id: 8, facture: factures[14], montant: 9800, date: "01/04/2026", mode: "Virement", reference: "VIR-2026-0398" }
];

export const evaluations = [
  { id: 1, type: "Contrôle", matiere: "Mathématiques", classe: "CM2-A", date: "08/04/2026", duree: "60 min", bareme: "20" },
  { id: 2, type: "Devoir", matiere: "Français", classe: "CM2-A", date: "05/04/2026", duree: "45 min", bareme: "20" },
  { id: 3, type: "Examen", matiere: "Physique-Chimie", classe: "3ème-A", date: "10/04/2026", duree: "90 min", bareme: "40" },
  { id: 4, type: "Contrôle", matiere: "Anglais", classe: "5ème-A", date: "07/04/2026", duree: "30 min", bareme: "20" },
  { id: 5, type: "Devoir", matiere: "SVT", classe: "4ème-A", date: "03/04/2026", duree: "45 min", bareme: "20" }
];

export const bulletins = eleves.slice(0, 5).map((eleve, index) => ({
  id: index + 1,
  eleve: eleve,
  trimestre: "Trimestre 2",
  annee: "2025-2026",
  moyenne: (12 + Math.random() * 5).toFixed(1),
  rang: index + 1,
  appreciation: ["Bon travail, continuez ainsi!", "Excellents résultats, félicitations!", "Progrès notables, persévérez!", "Travail satisfaisant, quelques efforts à fournir.", "Bon trimestre, encourageant!"][index]
}));

export const transporteurs = [
  { id: 1, nom: "Ahmed Benjir", telephone: "0661234567", permis: "B" },
  { id: 2, nom: "Mohammed Tazi", telephone: "0662345678", permis: "B" },
  { id: 3, nom: "Karim Sefrioui", telephone: "0663456789", permis: "B" }
];

export const vehicules = [
  { id: 1, numero: "VH-001", type: "Minibus", immatriculation: "1234-A-12", capacite: 24, chauffeur: transporteurs[0], statut: "En service", prochainContrôle: "15/06/2026" },
  { id: 2, numero: "VH-002", type: "Bus", immatriculation: "5678-B-12", capacite: 48, chauffeur: transporteurs[1], statut: "En service", prochainContrôle: "20/05/2026" },
  { id: 3, numero: "VH-003", type: "Minibus", immatriculation: "9012-C-12", capacite: 20, chauffeur: transporteurs[2], statut: "En maintenance", prochainContrôle: "10/04/2026" }
];

export const itineraires = [
  { id: 1, nom: "Zone Guéliz", zone: "Centre-ville", vehicule: vehicules[0], heureDepart: "07:30", heureArrivee: "08:00", arrets: ["Place du 16 Novembre", "Café de la Paix", "Avenue Mohammed V"] },
  { id: 2, nom: "Zone Hivernage", zone: "Hivernage", vehicule: vehicules[1], heureDepart: "07:15", heureArrivee: "08:00", arrets: ["Avenue Mohammed VI", "Palmeraie", "Circuit de la Palmeraie"] },
  { id: 3, nom: "Zone Menara", zone: "Menara", vehicule: vehicules[2], heureDepart: "07:45", heureArrivee: "08:15", arrets: ["Avenue de la Ménara", "Kasbah", "Moulin"] }
];

export const evenements = [
  { id: 1, titre: "Fête de fin d'année scolaire", date: "15/06/2026", heure: "10:00", lieu: "Salle des fêtes", type: "Événement" },
  { id: 2, titre: "Conseil de classe - Trimestre 2", date: "20/04/2026", heure: "15:00", lieu: "Salle des réunions", type: "Réunion" },
  { id: 3, titre: "Examens du 1er Trimestre", date: "12/05/2026", heure: "08:00", lieu: "Salles de classe", type: "Examen" },
  { id: 4, titre: "Journée portes ouvertes", date: "25/04/2026", heure: "09:00", lieu: "École", type: "Événement" },
  { id: 5, titre: "Réunion parents-profs", date: "18/04/2026", heure: "16:00", lieu: "Salles de classe", type: "Réunion" }
];

export const donneesDashboard = {
  stats: {
    totalEleves: 1247,
    nouveauxEleves: 12,
    totalEnseignants: 84,
    revenusMois: 245800,
    tauxPresence: 94.2
  },
  inscriptionsParMois: [
    { mois: "Sep", nombre: 145 },
    { mois: "Oct", nombre: 12 },
    { mois: "Nov", nombre: 8 },
    { mois: "Déc", nombre: 5 },
    { mois: "Jan", nombre: 18 },
    { mois: "Fév", nombre: 10 },
    { mois: "Mar", nombre: 7 },
    { mois: "Avr", nombre: 12 }
  ],
  repartitionNiveaux: [
    { nom: "Primaire", valeur: 520, color: "#1E3A5F" },
    { nom: "Collège", valeur: 410, color: "#F4A261" },
    { nom: "Lycée", valeur: 317, color: "#2A9D8F" }
  ],
  paiements: [
    { mois: "Jan", collecter: 420000, enAttente: 35000 },
    { mois: "Fév", collecter: 415000, enAttente: 28000 },
    { mois: "Mar", collecter: 430000, enAttente: 32000 },
    { mois: "Avr", collecter: 245800, enAttente: 85000 }
  ],
  topMatieres: [
    { matiere: "Mathématiques", tauxReussite: 78 },
    { matiere: "Français", tauxReussite: 72 },
    { matiere: "Anglais", tauxReussite: 85 },
    { matiere: "SVT", tauxReussite: 68 },
    { matiere: "Physique", tauxReussite: 65 }
  ]
};

export const employes = [
  { id: 1, matricule: "EMP001", prenom: "Abdelkader", nom: "Benhima", poste: "Directeur", telephone: "0661234567", email: "abdelkader.benhima@ecole-alamal.ma", salaire: 15000, statut: "Actif" },
  { id: 2, matricule: "EMP002", prenom: "Houda", nom: "Lahlou", poste: "Secrétaire de direction", telephone: "0662345678", email: "houda.lahlou@ecole-alamal.ma", salaire: 6000, statut: "Actif" },
  { id: 3, matricule: "EMP003", prenom: "Tarik", nom: "Moulin", poste: "Comptable", telephone: "0663456789", email: "tarik.moulin@ecole-alamal.ma", salaire: 8000, statut: "Actif" },
  { id: 4, matricule: "EMP004", prenom: "Sanaa", nom: "Tahiri", poste: "Secrétaire", telephone: "0664567890", email: "sanaa.tahiri@ecole-alamal.ma", salaire: 5000, statut: "Actif" },
  { id: 5, matricule: "EMP005", prenom: "Rachid", nom: "Zaoui", poste: "Agent d'entretien", telephone: "0665678901", email: "rachid.zaoui@ecole-alamal.ma", salaire: 4000, statut: "Actif" }
];

export const users = [
  { id: 1, username: "admin", nom: "Benhima", prenom: "Abdelkader", role: "Administrateur", email: "admin@ecole-alamal.ma" },
  { id: 2, username: "comptable", nom: "Moulin", prenom: "Tarik", role: "Comptable", email: "tarik.moulin@ecole-alamal.ma" },
  { id: 3, username: "direction", nom: "Alaoui", prenom: "Karim", role: "Directeur", email: "karim.alaoui@ecole-alamal.ma" }
];

export const absences = [
  { id: 1, eleve: eleves[0], date: "08/04/2026", motif: "Maladie", justifie: true },
  { id: 2, eleve: eleves[2], date: "07/04/2026", motif: "Raison familiale", justifie: false },
  { id: 3, eleve: eleves[4], date: "05/04/2026", motif: "Rendez-vous médical", justifie: true },
  { id: 4, eleve: eleves[6], date: "03/04/2026", motif: "Maladie", justifie: true }
];

export const competences = [
  { id: 1, nom: "Administrateur", permissions: ["*"] },
  { id: 2, nom: "Directeur", permissions: ["gestion.*", "pedagogie.*", "rapports.*"] },
  { id: 3, nom: "Comptable", permissions: ["finance.*", "rapports.financier"] },
  { id: 4, nom: "Enseignant", permissions: ["pedagogie.evaluations", "pedagogie.cours", "bulletins.*"] },
  { id: 5, nom: "Parent", permissions: ["eleve.bulletin", "eleve.presence"] }
];
