const express = require('express');
const router = express.Router();
const {
  obtenerVisitantes,
  crearVisitante
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
 *     responses:
 *       201:
 *         description: Visitante creado
 */

router.get('/', obtenerVisitantes);
router.post('/', crearVisitante);


module.exports = router;
