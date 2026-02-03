'use strict';

import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'El nombre es obligatorio'],
      trim: true,
      maxlength: [100, 'El nombre no puede exceder 100 caracteres'],
    },

    email: {
      type: String,
      required: [true, 'El correo es obligatorio'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Correo electrónico no válido'],
      index: true,
    },

    phone: {
      type: String,
      required: [true, 'El teléfono es obligatorio'],
      trim: true,
      maxlength: [15, 'El teléfono no puede exceder 15 caracteres'],
    },

    photo: {
      type: String,
      default: 'contacts/default_profile',
    },

    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  {
    timestamps: true,
    versionKey: false, // elimina __v (más limpio para APIs)
  }
);

// Índices adicionales
contactSchema.index({ name: 1 });

// Exportar modelo
export default mongoose.model('Contact', contactSchema);
