//routes/visitantes.routes.js
const express = require('express');
const router = express.Router();
const { addSeguimiento, getSeguimientos } = require('../controllers/seguimientos.controller');

/**
 * @swagger
 * tags:
 *   name: Seguimientos
 *   description: Registro de acciones de seguimiento
 */

/**
 * @swagger
 * /api/seguimientos/{visitante_id}:
 *   get:
 *     summary: Obtener seguimientos de un visitante
 *     tags: [Seguimientos]
 *     parameters:
 *       - in: path
 *         name: visitante_id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de seguimientos
 *
 * /api/seguimientos:
 *   post:
 *     summary: Registrar un nuevo seguimiento
 *     tags: [Seguimientos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               visitante_id:
 *                 type: integer
 *               tipo:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               realizado_por:
 *                 type: integer
 *             required:
 *               - visitante_id
 *               - tipo
 *               - realizado_por
 *     responses:
 *       201:
 *         description: Seguimiento registrado correctamente
 */

router.get('/:visitante_id', getSeguimientos);
router.post('/', addSeguimiento);

module.exports = router;
