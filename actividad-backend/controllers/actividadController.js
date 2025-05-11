const actividadService = require('../services/actividadService');

exports.getActivities = async (req, res) => {
  try {
    const actividades = await actividadService.getAll();
    res.json(actividades);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.createActivity = async (req, res) => {
  try {
    const { titulo, descripcion, fecha_inicio, fecha_vencimiento, tipo, materia, estudiante_id } = req.body;
    const actividad = await actividadService.create({ titulo, descripcion, fecha_inicio, fecha_vencimiento, tipo, materia, estudiante_id });
    res.status(201).json(actividad);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.updateActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, descripcion, fecha_inicio, fecha_vencimiento, tipo, materia, estudiante_id } = req.body;
    const actividad = await actividadService.update(id, { titulo, descripcion, fecha_inicio, fecha_vencimiento, tipo, materia, estudiante_id });
    res.json(actividad);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.deleteActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await actividadService.delete(id);
    res.status(204).send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
