// routes/productos.routes.js
const express = require('express');
const router = express.Router();
const { getProductos, addProducto } = require('../controllers/productos.controller');

router.get('/', getProductos);
router.post('/', addProducto);

module.exports = router;