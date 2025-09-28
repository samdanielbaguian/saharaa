import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import { errorHandler } from './middleware/errorHandler';
import routes from './routes'; // <-- index.ts qui centralise toutes les routes
import { env } from './config/env';

dotenv.config();

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(env.port, () => {
  console.log(`Serveur lancé sur le port ${env.port}`);
});


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Centralisation des routes
app.use('/api', routes); // Toutes tes routes seront en /api/xxx

// Route de test
app.get('/', (req, res) => {
  res.send('API Saharaa OK');
});

// Middleware d'erreur global
app.use(errorHandler);

export default app;
