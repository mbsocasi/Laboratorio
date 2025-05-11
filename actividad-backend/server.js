const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { sequelize } = require('./models'); // Importa los modelos y la instancia de Sequelize
const tareaRoutes = require('./routes/tareaRoutes'); // Rutas para manejar Tarea
const examenRoutes = require('./routes/examenRoutes'); // Rutas para manejar Examen
const claseRoutes = require('./routes/claseRoutes'); // Rutas para manejar Clase
const actividadRoutes = require('./routes/actividadRoutes'); // Rutas para manejar Actividad

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

// Crear una instancia de la aplicación Express
const app = express();

// Configuración de CORS para permitir solicitudes desde otros orígenes
app.use(cors());

// Middleware para analizar los cuerpos de las solicitudes como JSON
app.use(express.json());

// Rutas del backend
app.use('/api/tareas', tareaRoutes); // Rutas para Tareas
app.use('/api/examenes', examenRoutes); // Rutas para Examenes
app.use('/api/clases', claseRoutes); // Rutas para Clases
app.use('/api/actividades', actividadRoutes); // Rutas para Actividades

// Configuración del puerto (se puede configurar en el archivo .env o usar el puerto 3000 por defecto)
const PORT = process.env.PORT || 3000;

// Sincronización con la base de datos y arranque del servidor
sequelize.sync({ force: false }) // `force: false` asegura que no se eliminen las tablas existentes
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error al sincronizar la base de datos:', err);
  });
