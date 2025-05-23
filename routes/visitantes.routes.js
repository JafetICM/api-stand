const express = require('express');
const router = express.Router();
const {
  obtenerVisitantes,
  crearVisitante,
  obtenerVisitantesPorProducto, // nuevo controlador
} = require('../controllers/visitantes.controller');

/**
 * @swagger
 * /api/visitantes:
 *   get:
 *     summary: Obtener todos los visitantes
 *     tags: [Visitantes]
 *     responses:
 *       200:
 *         description: Lista de visitantes
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
 *               usuario_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Visitante creado
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
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Lista de visitantes interesados
 */

router.get('/', obtenerVisitantes);
router.post('/', crearVisitante);
router.get('/producto/:producto_id', obtenerVisitantesPorProducto);

module.exports = router;
