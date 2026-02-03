'use strict';

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';

import { helmetConfiguration } from './helmet-configuration.js';
import { corsOptions } from './cors-configuration.js';
import { dbConnection } from './db.js';
import { requestLimit } from '../middlewares/request-limit.js';
import { errorHandler } from '../middlewares/handle-errors.js';

import contactsRoutes from '../src/contacts/contacts.routes.js';
import toDoListRoutes from '../src/toDoList/toDoList.routes.js';

const BASE_URL = '/api/v1';

const applyMiddlewares = (app) => {
  app.use(helmet(helmetConfiguration));
  app.use(express.urlencoded({ extended: false, limit: '10mb' }));
  app.use(express.json({ limit: '10mb' }));
  app.use(cors(corsOptions));
  app.use(requestLimit);
  app.use(morgan('dev'));
};

const applyRoutes = (app) => {
  app.use(`${BASE_URL}/contacts`, contactsRoutes);
  app.use(`${BASE_URL}/todolist`, toDoListRoutes);

  app.get(`${BASE_URL}/health`, (req, res) => {
    res.status(200).json({
      status: 'ok',
      service: 'Contacts & ToDoList API',
      version: '1.0.0',
    });
  });
};

const initServer = async () => {
  const app = express();
  const PORT = process.env.PORT || 3001;

  try {
    await dbConnection();

    applyMiddlewares(app);
    applyRoutes(app);
    app.use(errorHandler);

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
      console.log(`Contacts  → http://localhost:${PORT}${BASE_URL}/contacts`);
      console.log(`ToDoList  → http://localhost:${PORT}${BASE_URL}/todolist`);
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error.message);
    process.exit(1);
  }
};

export { initServer };
