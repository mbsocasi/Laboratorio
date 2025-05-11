const examenService = require('../services/examenService');

exports.getExamenes = async (req, res) => {
  try {
    const examenes = await examenService.getAll();
    res.json(examenes);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.createExamen = async (req, res) => {
  try {
    const { duracion, tipo, actividad_id } = req.body;
    const examen = await examenService.create({ duracion, tipo, actividad_id });
    res.status(201).json(examen);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.updateExamen = async (req, res) => {
  try {
    const { id } = req.params;
    const { duracion, tipo, actividad_id } = req.body;
    const examen = await examenService.update(id, { duracion, tipo, actividad_id });
    res.json(examen);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.deleteExamen = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await examenService.delete(id);
    res.status(204).send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
