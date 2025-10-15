import { Sequelize } from 'sequelize';
import { env } from './env';

const sequelize = new Sequelize(env.dbName, env.dbUser, env.dbPass, {
  host: env.dbHost,
  port: Number(env.dbPort),
  dialect: 'postgres', // Mets ton SGBD ici si besoin
  logging: false,      // Mets true pour voir les requêtes SQL
});

export default sequelize;