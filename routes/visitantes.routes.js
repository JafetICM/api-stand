//routes/visitantes.routes.js
const express = require('express');
const router = express.Router();

const {
  obtenerVisitantes,
  crearVisitante,
  asignarProductosAVisitante,
  obtenerProductosDeVisitante,
  obtenerVisitantesPorProducto,
} = require('../controllers/visitantes.controller');

/**
 * @swagger
 * /api/visitantes:
 *   post:
 *     summary: Crear un nuevo visitante
 *     tags: [Visitantes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre_completo:
 *                 type: string
 *               correo:
 *                 type: string
 *               telefono:
 *                 type: string
 *               empresa:
 *                 type: string
 *               cargo:
 *                 type: string
 *               notas:
 *                 type: string
 *     responses:
 *       201:
 *         description: Visitante creado
 */


/**
 * @swagger
 * /api/visitantes/asignar-productos:
 *   post:
 *     summary: Asignar productos de interés a un visitante
 *     tags: [Visitantes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               visitante_id:
 *                 type: integer
 *               productos:
 *                 type: array
 *                 items:
 *                   type: integer
 *     responses:
 *       200:
 *         description: Productos asignados correctamente
 */

/**
 * @swagger
 * /api/visitantes/{visitante_id}/productos:
 *   get:
 *     summary: Obtener productos de interés de un visitante
 *     tags: [Visitantes]
 *     parameters:
 *       - in: path
 *         name: visitante_id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de productos
 */

/**
 * @swagger
 * /api/visitantes/producto/{producto_id}:
 *   get:
 *     summary: Obtener visitantes interesados en un producto
 *     tags: [Visitantes]
 *     parameters:
 *       - in: path
 *         name: producto_id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de visitantes interesados
 */

// Rutas de visitantes
router.get('/producto/:producto_id', obtenerVisitantesPorProducto);
router.get('/:visitante_id/productos', obtenerProductosDeVisitante);
router.get('/', obtenerVisitantes);
router.post('/', crearVisitante);
router.post('/asignar-productos', asignarProductosAVisitante);

module.exports = router;
// Exportar el router para usarlo en app.js