const { Examen } = require('../models');

class ExamenService {
  async getAll() {
    try {
      return await Examen.findAll();
    } catch (error) {
      throw new Error('Error al obtener exámenes: ' + error.message);
    }
  }

  async create({ duracion, tipo, actividad_id }) {
    try {
      return await Examen.create({ duracion, tipo, actividad_id });
    } catch (error) {
      throw new Error('Error al crear examen: ' + error.message);
    }
  }

  async update(id, { duracion, tipo, actividad_id }) {
    try {
      const examen = await Examen.findByPk(id);
      if (!examen) throw new Error('Examen no encontrado');
      return await examen.update({ duracion, tipo, actividad_id });
    } catch (error) {
      throw new Error('Error al actualizar examen: ' + error.message);
    }
  }

  async delete(id) {
    try {
      const examen = await Examen.findByPk(id);
      if (!examen) throw new Error('Examen no encontrado');
      await examen.destroy();
      return { message: 'Examen eliminado' };
    } catch (error) {
      throw new Error('Error al eliminar examen: ' + error.message);
    }
  }
}

module.exports = new ExamenService();
