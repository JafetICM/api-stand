const db = require('../db');

const getProductos = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM productos ORDER BY nombre');
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

const updateProducto = async (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;
  try {
    await db.query('UPDATE productos SET nombre = ? WHERE id = ?', [nombre, id]);
    res.json({ message: 'Producto actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar producto' });
  }
};

const deleteProducto = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM productos WHERE id = ?', [id]);
    res.json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar producto' });
  }
};

module.exports = { getProductos, addProducto, updateProducto, deleteProducto };
