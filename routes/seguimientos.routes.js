//routes/visitantes.routes.js
const express = require('express');
const router = express.Router();
const { addSeguimiento, getSeguimientos, updateSeguimiento, deleteSeguimiento } = require('../controllers/seguimientos.controller');

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

/**
 * @swagger
 * /api/seguimientos/{id}:
 *   put:
 *     summary: Actualizar un seguimiento
 *     tags: [Seguimientos]
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
 *               tipo:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               realizado_por:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Seguimiento actualizado correctamente
 */

/**
 * @swagger
 * /api/seguimientos/{id}:
 *   delete:
 *     summary: Eliminar un seguimiento
 *     tags: [Seguimientos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Seguimiento eliminado correctamente
 */

router.get('/:visitante_id', getSeguimientos);
router.post('/', addSeguimiento);
router.put('/', updateSeguimiento);
router.delete('/', deleteSeguimiento);

module.exports = router;
