import { body, param } from 'express-validator';
import { checkValidators } from './check-validators.js';

// =========================
// Crear tarea
// =========================
export const validateCreateTask = [
    body('title')
        .trim()
        .notEmpty()
        .withMessage('El título es obligatorio')
        .isLength({ min: 3, max: 200 })
        .withMessage('El título debe tener entre 3 y 200 caracteres'),

    body('completed')
        .optional()
        .isBoolean()
        .withMessage('El estado debe ser verdadero o falso'),

    checkValidators,
];

// =========================
// Actualizar tarea
// =========================
export const validateUpdateTask = [
    param('id')
        .isMongoId()
        .withMessage('ID no válido'),

    body('title')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('El título no puede ir vacío')
        .isLength({ min: 3, max: 200 })
        .withMessage('El título debe tener entre 3 y 200 caracteres'),

    body('completed')
        .optional()
        .isBoolean()
        .withMessage('El estado debe ser verdadero o falso'),

    checkValidators,
];

// =========================
// Obtener tarea por ID
// =========================
export const validateGetTaskById = [
    param('id')
        .isMongoId()
        .withMessage('ID no válido'),

    checkValidators,
];
