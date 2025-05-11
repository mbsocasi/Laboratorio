const claseService = require('../services/claseService');

exports.getClases = async (req, res) => {
  try {
    const clases = await claseService.getAll();
    res.json(clases);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.createClase = async (req, res) => {
  try {
    const { profesor, ubicacion, actividad_id } = req.body;
    const clase = await claseService.create({ profesor, ubicacion, actividad_id });
    res.status(201).json(clase);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.updateClase = async (req, res) => {
  try {
    const { id } = req.params;
    const { profesor, ubicacion, actividad_id } = req.body;
    const clase = await claseService.update(id, { profesor, ubicacion, actividad_id });
    res.json(clase);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.deleteClase = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await claseService.delete(id);
    res.status(204).send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
