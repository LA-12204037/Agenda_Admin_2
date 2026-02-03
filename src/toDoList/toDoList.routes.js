import { Router } from 'express';
import {
    getTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
} from './toDoList.controller.js';

import {
    validateCreateTask,
    validateUpdateTask,
    validateGetTaskById,
} from '../../middlewares/todolist.validators.js';

const router = Router();

// ===================== GET =====================
router.get('/', getTasks);
router.get('/:id', validateGetTaskById, getTaskById);

// ===================== POST =====================
router.post(
    '/',
    validateCreateTask,
    createTask
);

// ===================== PUT =====================
router.put(
    '/:id',
    validateUpdateTask,
    updateTask
);

// ===================== DELETE =====================
router.delete(
    '/:id',
    validateGetTaskById,
    deleteTask
);

export default router;
