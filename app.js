// app.js
const express = require('express');
require('dotenv').config();
const app = express();

const visitantesRoutes = require('./routes/visitantes.routes');
const productosRoutes = require('./routes/productos.routes');
const seguimientosRoutes = require('./routes/seguimientos.routes');
const usuariosRoutes = require('./routes/usuarios.routes');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/visitantes', visitantesRoutes);
app.use('/api/productos', productosRoutes);
app.use('/api/seguimientos', seguimientosRoutes);
app.use('/api/usuarios', usuariosRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}/api-docs`);
});