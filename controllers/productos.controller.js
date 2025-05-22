// controllers/productos.controller.js
const db = require('../db');

const getProductos = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM productos');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener productos' });
  }
};

const addProducto = async (req, res) => {
  const { nombre } = req.body;
  try {
    const [result] = await db.query('INSERT INTO productos (nombre) VALUES (?)', [nombre]);
    res.status(201).json({ id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar producto' });
  }
};

module.exports = { getProductos, addProducto };