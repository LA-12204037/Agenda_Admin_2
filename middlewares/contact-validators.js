import { body, param } from 'express-validator';
import { checkValidators } from './check-validators.js';

// =========================
// Crear contacto
// =========================
export const validateCreateContact = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('El nombre es obligatorio'),

    body('email')
        .isEmail()
        .withMessage('Correo no válido'),

    body('phone')
        .notEmpty()
        .withMessage('El teléfono es obligatorio'),

    checkValidators,
];

// =========================
// Actualizar contacto
// =========================
export const validateUpdateContact = [
    param('id')
        .isMongoId()
        .withMessage('ID no válido'),

    body('name')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('El nombre no puede ir vacío'),

    body('email')
        .optional()
        .isEmail()
        .withMessage('Correo no válido'),

    body('phone')
        .optional()
        .notEmpty()
        .withMessage('El teléfono no puede ir vacío'),

    checkValidators,
];

// =========================
// Activar / desactivar contacto
// =========================
export const validateContactStatusChange = [
    param('id')
        .isMongoId()
        .withMessage('ID no válido'),

    checkValidators,
];

// =========================
// Obtener contacto por ID
// =========================
export const validateGetContactById = [
    param('id')
        .isMongoId()
        .withMessage('ID no válido'),

    checkValidators,
];
