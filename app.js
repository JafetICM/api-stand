// app.js
const express = require('express');
require('dotenv').config();
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());



const visitantesRoutes = require('./routes/visitantes.routes');
const productosRoutes = require('./routes/productos.routes');
const seguimientosRoutes = require('./routes/seguimientos.routes');
const usuariosRoutes = require('./routes/usuarios.routes');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');



app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/visitantes', visitantesRoutes);
app.use('/api/productos', productosRoutes);
app.use('/api/seguimientos', seguimientosRoutes);
app.use('/api/usuarios', usuariosRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
    console.log(`Documentación Swagger disponible en http://localhost:${PORT}/api-docs`);
});