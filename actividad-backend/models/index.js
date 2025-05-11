const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

// Crear la instancia de Sequelize para conectar con la base de datos PostgreSQL
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: process.env.DB_PORT,
});

// Definir el modelo de Actividad
const Actividad = sequelize.define('Actividad', {
    titulo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    fecha_inicio: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    fecha_vencimiento: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    tipo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    materia: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

// Definir el modelo de Estudiante
const Estudiante = sequelize.define('Estudiante', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

// Definir el modelo de Tarea
const Tarea = sequelize.define('Tarea', {
    prioridad: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    actividad_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Actividad,
            key: 'id'
        }
    }
});

// Definir el modelo de Examen
const Examen = sequelize.define('Examen', {
    duracion: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    tipo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    actividad_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Actividad,
            key: 'id'
        }
    }
});

// Definir el modelo de Clase
const Clase = sequelize.define('Clase', {
    profesor: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ubicacion: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    actividad_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Actividad,
            key: 'id'
        }
    }
});

// Relaciones (Asociaciones) entre los modelos
// Relación 1:N entre Actividad y Estudiante
Actividad.belongsTo(Estudiante, { foreignKey: 'estudiante_id' });
Estudiante.hasMany(Actividad);

// Relación 1:N entre Actividad y Tarea
Actividad.hasMany(Tarea);
Tarea.belongsTo(Actividad);

// Relación 1:N entre Actividad y Examen
Actividad.hasMany(Examen);
Examen.belongsTo(Actividad);

// Relación 1:N entre Actividad y Clase
Actividad.hasMany(Clase);
Clase.belongsTo(Actividad);

// Sincronizar la base de datos y crear las tablas si no existen
sequelize.sync({ force: false })  // `force: false` asegura que no eliminará las tablas existentes
  .then(() => {
    console.log("Tablas creadas o sincronizadas correctamente.");
  })
  .catch((err) => {
    console.error("Error al sincronizar las tablas:", err);
  });

module.exports = { sequelize, Actividad, Estudiante, Tarea, Examen, Clase };
