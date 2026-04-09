import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initializeDatabase } from './models/database.js';
import elevesRoutes from './routes/eleves.js';
import enseignantsRoutes from './routes/enseignants.js';
import personnelRoutes from './routes/personnel.js';
import parentsRoutes from './routes/parents.js';
import matieresRoutes from './routes/matieres.js';
import coursRoutes from './routes/cours.js';
import evaluationsRoutes from './routes/evaluations.js';
import bulletinsRoutes from './routes/bulletins.js';
import fraisRoutes from './routes/frais.js';
import facturesRoutes from './routes/factures.js';
import paiementsRoutes from './routes/paiements.js';
import transportRoutes from './routes/transport.js';
import evenementsRoutes from './routes/evenements.js';
import parametresRoutes from './routes/parametres.js';
import dashboardRoutes from './routes/dashboard.js';
import authRoutes from './routes/auth.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/eleves', elevesRoutes);
app.use('/api/enseignants', enseignantsRoutes);
app.use('/api/personnel', personnelRoutes);
app.use('/api/parents', parentsRoutes);
app.use('/api/matieres', matieresRoutes);
app.use('/api/cours', coursRoutes);
app.use('/api/evaluations', evaluationsRoutes);
app.use('/api/bulletins', bulletinsRoutes);
app.use('/api/frais', fraisRoutes);
app.use('/api/factures', facturesRoutes);
app.use('/api/paiements', paiementsRoutes);
app.use('/api/transport', transportRoutes);
app.use('/api/evenements', evenementsRoutes);
app.use('/api/parametres', parametresRoutes);
app.use('/api/dashboard', dashboardRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'ClassConnect API is running' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!', message: err.message });
});

initializeDatabase();

app.listen(PORT, () => {
  console.log(`🚀 ClassConnect API running on port ${PORT}`);
  console.log(`📚 API Documentation: http://localhost:${PORT}/api/health`);
});
