const { Clase } = require('../models');

class ClaseService {
  async getAll() {
    try {
      return await Clase.findAll();
    } catch (error) {
      throw new Error('Error al obtener clases: ' + error.message);
    }
  }

  async create({ profesor, ubicacion, actividad_id }) {
    try {
      return await Clase.create({ profesor, ubicacion, actividad_id });
    } catch (error) {
      throw new Error('Error al crear clase: ' + error.message);
    }
  }

  async update(id, { profesor, ubicacion, actividad_id }) {
    try {
      const clase = await Clase.findByPk(id);
      if (!clase) throw new Error('Clase no encontrada');
      return await clase.update({ profesor, ubicacion, actividad_id });
    } catch (error) {
      throw new Error('Error al actualizar clase: ' + error.message);
    }
  }

  async delete(id) {
    try {
      const clase = await Clase.findByPk(id);
      if (!clase) throw new Error('Clase no encontrada');
      await clase.destroy();
      return { message: 'Clase eliminada' };
    } catch (error) {
      throw new Error('Error al eliminar clase: ' + error.message);
    }
  }
}

module.exports = new ClaseService();
