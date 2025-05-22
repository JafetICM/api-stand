const express = require('express');
const router = express.Router();
const {
  obtenerVisitantes,
  crearVisitante
} = require('../controllers/visitantes.controller');

router.get('/', obtenerVisitantes);
router.post('/', crearVisitante);

module.exports = router;
