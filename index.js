// Importaciones
import dotenv from 'dotenv';
import { initServer } from './configs/app.js';

// Configuración de variables de entorno
dotenv.config();

// ===================== MANEJO DE ERRORES =====================

// Errores no capturados (errores sin try/catch)
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    process.exit(1);
});

// Promesas rechazadas no manejadas
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection:', reason);
    process.exit(1);
});

// ===================== INICIO DEL SERVIDOR =====================
console.log('Iniciando servidor...');
initServer();
