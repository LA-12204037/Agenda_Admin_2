// middlewares/check-validators.js
import { validationResult } from 'express-validator';

export const checkValidators = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: 'Error de validación',
            errors: errors.array().map(error => error.msg)
        });
    }

    next();
};
