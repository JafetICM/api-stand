// routes/usuarios.routes.js
const express = require('express');
const router = express.Router();
const { getUsuarios, addUsuario } = require('../controllers/usuarios.controller');

router.get('/', getUsuarios);
router.post('/', addUsuario);

module.exports = router;