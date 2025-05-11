// const { Actividad, Tarea, Examen, Clase } = require('../models');

// class ActividadService {
//   async getAll() {
//     try {
//       const actividades = await Actividad.findAll({
//         include: [
//           { model: Tarea },
//           { model: Examen },
//           { model: Clase }
//         ]
//       });
//       return actividades;
//     } catch (error) {
//       throw new Error('Error al obtener actividades: ' + error.message);
//     }
//   }

//   async create({ titulo, descripcion, fecha_inicio, fecha_vencimiento, tipo, materia, estudiante_id }) {
//     try {
//       const actividad = await Actividad.create({ titulo, descripcion, fecha_inicio, fecha_vencimiento, tipo, materia, estudiante_id });
//       return actividad;
//     } catch (error) {
//       throw new Error('Error al crear actividad: ' + error.message);
//     }
//   }

//   async update(id, { titulo, descripcion, fecha_inicio, fecha_vencimiento, tipo, materia, estudiante_id }) {
//     try {
//       const actividad = await Actividad.findByPk(id);
//       if (!actividad) {
//         throw new Error('Actividad no encontrada');
//       }
//       await actividad.update({ titulo, descripcion, fecha_inicio, fecha_vencimiento, tipo, materia, estudiante_id });
//       return actividad;
//     } catch (error) {
//       throw new Error('Error al actualizar actividad: ' + error.message);
//     }
//   }

//   async delete(id) {
//     try {
//       const actividad = await Actividad.findByPk(id);
//       if (!actividad) {
//         throw new Error('Actividad no encontrada');
//       }
//       await actividad.destroy();
//       return { message: 'Actividad eliminada' };
//     } catch (error) {
//       throw new Error('Error al eliminar actividad: ' + error.message);
//     }
//   }
// }

// module.exports = new ActividadService();

const { Actividad, Estudiante, Tarea, Examen, Clase } = require('../models');

class ActividadService {
  async getAll() {
    try {
      const actividades = await Actividad.findAll({
        include: [
          { model: Tarea },
          { model: Examen },
          { model: Clase }
        ]
      });
      return actividades;
    } catch (error) {
      throw new Error('Error al obtener actividades: ' + error.message);
    }
  }

  async create({ titulo, descripcion, fecha_inicio, fecha_vencimiento, tipo, materia, estudiante_id }) {
    try {
      // Verificar si el estudiante existe. Si no, lo creamos con id 1
      let estudiante = await Estudiante.findByPk(estudiante_id);
      
      if (!estudiante) {
        // Si no se encuentra el estudiante, creamos uno con id 1
        estudiante = await Estudiante.create({
          id: 1,  // Aseguramos que el id sea 1
          nombre: 'Estudiante Default',
          createdAt: new Date(),
          updatedAt: new Date()
        });
      }

      // Crear la actividad si el estudiante existe (o fue creado)
      const actividad = await Actividad.create({ 
        titulo, 
        descripcion, 
        fecha_inicio, 
        fecha_vencimiento, 
        tipo, 
        materia, 
        estudiante_id: estudiante.id 
      });

      return actividad;
    } catch (error) {
      throw new Error('Error al crear actividad: ' + error.message);
    }
  }

  async update(id, { titulo, descripcion, fecha_inicio, fecha_vencimiento, tipo, materia, estudiante_id }) {
    try {
      const actividad = await Actividad.findByPk(id);
      if (!actividad) {
        throw new Error('Actividad no encontrada');
      }

      // Verificar si el estudiante existe antes de actualizar
      const estudiante = await Estudiante.findByPk(estudiante_id);
      if (!estudiante) {
        throw new Error('El estudiante con el id proporcionado no existe.');
      }

      await actividad.update({ titulo, descripcion, fecha_inicio, fecha_vencimiento, tipo, materia, estudiante_id });
      return actividad;
    } catch (error) {
      throw new Error('Error al actualizar actividad: ' + error.message);
    }
  }

  async delete(id) {
    try {
      const actividad = await Actividad.findByPk(id);
      if (!actividad) {
        throw new Error('Actividad no encontrada');
      }
      await actividad.destroy();
      return { message: 'Actividad eliminada' };
    } catch (error) {
      throw new Error('Error al eliminar actividad: ' + error.message);
    }
  }
}

module.exports = new ActividadService();
