import Task from './toDoList.model.js';

// ===================== GET ALL =====================
export const getTasks = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const tasks = await Task.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Task.countDocuments();

    res.status(200).json({
      success: true,
      data: tasks,
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
      message: 'Error al obtener las tareas',
      error: error.message,
    });
  }
};

// ===================== GET BY ID =====================
export const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Tarea no encontrada',
      });
    }

    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener la tarea',
      error: error.message,
    });
  }
};

// ===================== CREATE =====================
export const createTask = async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();

    res.status(201).json({
      success: true,
      message: 'Tarea creada exitosamente',
      data: task,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al crear la tarea',
      error: error.message,
    });
  }
};

// ===================== UPDATE =====================
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Tarea no encontrada',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Tarea actualizada exitosamente',
      data: task,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al actualizar la tarea',
      error: error.message,
    });
  }
};

// ===================== DELETE =====================
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Tarea no encontrada',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Tarea eliminada exitosamente',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al eliminar la tarea',
      error: error.message,
    });
  }
};
