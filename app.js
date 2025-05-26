//app.js
const express = require('express');
require('dotenv').config();
const cors = require('cors');

const app = express();

// Middleware para permitir CORS
app.use(cors());

// Middleware para parsear JSON
app.use(express.json());
app.get('/testdb', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT 1 + 1 AS resultado');
    res.json(rows);
  } catch (error) {
    console.error('🔥 Error en testdb:', error);
    res.status(500).json({ error: 'Error en conexión a base de datos' });
  }
});


// Importar rutas
const visitantesRoutes = require('./routes/visitantes.routes');
const productosRoutes = require('./routes/productos.routes');
const seguimientosRoutes = require('./routes/seguimientos.routes');
const usuariosRoutes = require('./routes/usuarios.routes');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

// Montaje de rutas
app.use('/api/visitantes', visitantesRoutes);
app.use('/api/productos', productosRoutes);
app.use('/api/seguimientos', seguimientosRoutes);
app.use('/api/usuarios', usuariosRoutes);

// Ruta para documentación Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Middleware global para manejo de errores (después de las rutas)
app.use((err, req, res, next) => {
  console.error('🔥 Error en el middleware:', err);
  res.status(500).json({ error: 'Error interno del servidor' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
  console.log(`Documentación Swagger disponible en http://localhost:${PORT}/api-docs`);
});
