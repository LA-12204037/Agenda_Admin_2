'use strict';

import Contact from './contacts.model.js';
import { cloudinary } from '../../middlewares/file-uploader.js';

// =========================
// Obtener todos los contactos (paginado)
// =========================
export const getContacts = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const contacts = await Contact.find({ isActive: true })
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Contact.countDocuments({ isActive: true });

    res.status(200).json({
      success: true,
      data: contacts,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalRecords: total,
        limit,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener los contactos',
      error: error.message,
    });
  }
};

// =========================
// Obtener contacto por ID
// =========================
export const getContactById = async (req, res) => {
  try {
    const { id } = req.params;

    const contact = await Contact.findOne({ _id: id, isActive: true });

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contacto no encontrado',
      });
    }

    res.status(200).json({
      success: true,
      data: contact,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener el contacto',
      error: error.message,
    });
  }
};

// =========================
// Crear contacto
// =========================
export const createContact = async (req, res) => {
  try {
    const contactData = req.body;

    if (req.file) {
      // 🔴 CLAVE: usar public_id (NO filename)
      contactData.photo = req.file.public_id;
    } else {
      contactData.photo = 'contacts/default_profile';
    }

    const contact = new Contact(contactData);
    await contact.save();

    res.status(201).json({
      success: true,
      message: 'Contacto creado exitosamente',
      data: contact,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al crear el contacto',
      error: error.message,
    });
  }
};

// =========================
// Actualizar contacto
// =========================
export const updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    const currentContact = await Contact.findById(id);

    if (!currentContact || !currentContact.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Contacto no encontrado',
      });
    }

    if (req.file) {
      if (currentContact.photo) {
        await cloudinary.uploader.destroy(currentContact.photo);
      }

      updateData.photo = req.file.public_id;
    }

    const updatedContact = await Contact.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Contacto actualizado exitosamente',
      data: updatedContact,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al actualizar el contacto',
      error: error.message,
    });
  }
};

// =========================
// Eliminar contacto (soft delete)
// =========================
export const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;

    const contact = await Contact.findById(id);

    if (!contact || !contact.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Contacto no encontrado',
      });
    }

    contact.isActive = false;
    await contact.save();

    res.status(200).json({
      success: true,
      message: 'Contacto eliminado exitosamente',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al eliminar el contacto',
      error: error.message,
    });
  }
};
