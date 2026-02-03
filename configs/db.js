'use strict';

import mongoose from 'mongoose';

export const dbConnection = async () => {
  try {
    // ========================= MONITOREO =========================

    mongoose.connection.on('error', (error) => {
      console.error('MongoDB | Error de conexión:', error.message);
      mongoose.disconnect();
    });

    mongoose.connection.on('connecting', () => {
      console.log('MongoDB | Intentando conectar a MongoDB...');
    });

    mongoose.connection.on('connected', () => {
      console.log('MongoDB | Conectado a MongoDB');
    });

    mongoose.connection.on('open', () => {
      console.log('MongoDB | Conectado a la base de datos Contacts-ToDoList');
    });

    mongoose.connection.on('reconnected', () => {
      console.log('MongoDB | Reconectado a MongoDB');
    });

    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB | Desconectado de MongoDB');
    });

    // ========================= CONEXIÓN =========================
    // URI_MONGODB debe venir del archivo .env

    await mongoose.connect(process.env.URI_MONGODB, {
      serverSelectionTimeoutMS: 5000,
      maxPoolSize: 10,
      autoIndex: true, // recomendado en desarrollo
    });

  } catch (error) {
    console.error('MongoDB | Error al conectar:', error.message);
    process.exit(1);
  }
};

// ========================= CIERRE CONTROLADO =========================

const gracefulShutdown = async (signal) => {
  console.log(`MongoDB | Señal recibida: ${signal}. Cerrando conexión...`);
  try {
    await mongoose.connection.close();
    console.log('MongoDB | Conexión cerrada correctamente');
    process.exit(0);
  } catch (error) {
    console.error('MongoDB | Error al cerrar la conexión:', error.message);
    process.exit(1);
  }
};

// ========================= MANEJO DE SEÑALES =========================

process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGUSR2', () => gracefulShutdown('SIGUSR2')); // nodemon
