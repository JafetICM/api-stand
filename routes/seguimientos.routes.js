// routes/seguimientos.routes.js
const express = require('express');
const router = express.Router();
const { addSeguimiento, getSeguimientos } = require('../controllers/seguimientos.controller');

router.get('/:visitante_id', getSeguimientos);
router.post('/', addSeguimiento);

module.exports = router;