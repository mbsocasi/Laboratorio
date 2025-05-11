const tareaService = require('../services/tareaService');

exports.getTareas = async (req, res) => {
  try {
    const tareas = await tareaService.getAll();
    res.json(tareas);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.createTarea = async (req, res) => {
  try {
    const { prioridad, actividad_id } = req.body;
    const tarea = await tareaService.create({ prioridad, actividad_id });
    res.status(201).json(tarea);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.updateTarea = async (req, res) => {
  try {
    const { id } = req.params;
    const { prioridad, actividad_id } = req.body;
    const tarea = await tareaService.update(id, { prioridad, actividad_id });
    res.json(tarea);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.deleteTarea = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await tareaService.delete(id);
    res.status(204).send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
