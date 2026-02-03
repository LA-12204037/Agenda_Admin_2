import { Router } from 'express';
import {
    getContacts,
    getContactById,
    createContact,
    updateContact,
    deleteContact,
} from './contacts.controller.js';

import {
    validateCreateContact,
    validateUpdateContact,
    validateGetContactById,
} from '../../middlewares/contact-validators.js';

import { uploadContactImage } from '../../middlewares/file-uploader.js';
import { cleanupUploadedFileOnFinish } from '../../middlewares/delete-file-on-error.js';

const router = Router();

router.get('/', getContacts);
router.get('/:id', validateGetContactById, getContactById);

router.post(
    '/',
    uploadContactImage.single('photo'),
    cleanupUploadedFileOnFinish,
    validateCreateContact,
    createContact
);

router.put(
    '/:id',
    uploadContactImage.single('photo'),
    validateUpdateContact,
    updateContact
);

router.delete('/:id', validateGetContactById, deleteContact);

export default router;
