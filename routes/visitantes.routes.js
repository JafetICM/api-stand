//routes/visitantes.routes.js
const express = require('express');
const router = express.Router();

const {
  obtenerVisitantes,
  crearVisitante,
  asignarProductosAVisitante,
  obtenerProductosDeVisitante,
  obtenerVisitantesPorProducto,
  actualizarVisitante,
  eliminarVisitante,
  exportarVisitantesExcel
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
 *             required:
 *               - nombre_completo
 *               - correo
 *               - telefono
 *             properties:
 *               nombre_completo:
 *                 type: string
 *                 example: Juan Pérez
 *               correo:
 *                 type: string
 *                 example: juan.perez@example.com
 *               telefono:
 *                 type: string
 *                 example: "5551234567"
 *               empresa:
 *                 type: string
 *                 example: Empresa XYZ
 *               cargo:
 *                 type: string
 *                 example: Gerente de ventas
 *               notas:
 *                 type: string
 *                 example: Interesado en productos tecnológicos
 *     responses:
 *       201:
 *         description: Visitante creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 message:
 *                   type: string
 *                   example: Visitante creado correctamente
 *       400:
 *         description: Datos inválidos o faltantes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: nombre_completo, correo y telefono son obligatorios.
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error al crear visitante
 */




/**
 * @swagger
 * /api/visitantes:
 *   get:
 *     summary: Obtener todos los visitantes
 *     tags: [Visitantes]
 *     responses:
 *       200:
 *         description: Lista de visitantes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   nombre_completo:
 *                     type: string
 *                   correo:
 *                     type: string
 *                   telefono:
 *                     type: string
 *                   empresa:
 *                     type: string
 *                   cargo:
 *                     type: string
 *                   fecha_registro:
 *                     type: string
 *                     format: date-time
 *                   estado:
 *                     type: string
 *                   notas:
 *                     type: string
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
 * /api/visitantes/{id}:
 *   put:
 *     summary: Actualizar los datos de un visitante
 *     tags: [Visitantes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
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
 *               estado:
 *                 type: string
 *     responses:
 *       200:
 *         description: Visitante actualizado correctamente
 */

/**
 * @swagger
 * /api/visitantes/{id}:
 *   delete:
 *     summary: Eliminar un visitante
 *     tags: [Visitantes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Visitante eliminado correctamente
 */

/**
 * @swagger
 * /api/visitantes/exportar:
 *   get:
 *     summary: Exportar la lista de visitantes a Excel
 *     tags: [Visitantes]
 *     responses:
 *       200:
 *         description: Archivo Excel con la lista de visitantes
 *         content:
 *           application/vnd.openxmlformats-officedocument.spreadsheetml.sheet:
 *             schema:
 *               type: string
 *               format: binary
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
router.put('/:id', actualizarVisitante);
router.delete('/:id', eliminarVisitante);
router.get('/exportar', exportarVisitantesExcel);

module.exports = router;
// Exportar el router para usarlo en app.js