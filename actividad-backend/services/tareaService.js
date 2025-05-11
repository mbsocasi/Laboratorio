const { Tarea } = require('../models');

class TareaService {
  async getAll() {
    try {
      return await Tarea.findAll();
    } catch (error) {
      throw new Error('Error al obtener tareas: ' + error.message);
    }
  }

  async create({ prioridad, actividad_id }) {
    try {
      return await Tarea.create({ prioridad, actividad_id });
    } catch (error) {
      throw new Error('Error al crear tarea: ' + error.message);
    }
  }

  async update(id, { prioridad, actividad_id }) {
    try {
      const tarea = await Tarea.findByPk(id);
      if (!tarea) throw new Error('Tarea no encontrada');
      return await tarea.update({ prioridad, actividad_id });
    } catch (error) {
      throw new Error('Error al actualizar tarea: ' + error.message);
    }
  }

  async delete(id) {
    try {
      const tarea = await Tarea.findByPk(id);
      if (!tarea) throw new Error('Tarea no encontrada');
      await tarea.destroy();
      return { message: 'Tarea eliminada' };
    } catch (error) {
      throw new Error('Error al eliminar tarea: ' + error.message);
    }
  }
}

module.exports = new TareaService();
