'use strict';

import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'El título de la tarea es obligatorio'],
      trim: true,
      minlength: [3, 'El título debe tener al menos 3 caracteres'],
      maxlength: [200, 'El título no puede exceder 200 caracteres'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'La descripción no puede exceder 500 caracteres'],
    },
    completed: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true, // createdAt y updatedAt
  }
);

// ===================== ÍNDICES =====================
taskSchema.index({ completed: 1 });
taskSchema.index({ isActive: 1 });
taskSchema.index({ title: 1 });

// ===================== EXPORT =====================
export default mongoose.model('Task', taskSchema);
