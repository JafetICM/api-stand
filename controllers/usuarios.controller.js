// controllers/usuarios.controller.js
const db = require('../db');

const getUsuarios = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM usuarios ORDER BY nombre');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
};

const addUsuario = async (req, res) => {
  const { nombre, correo, rol } = req.body;
  try {
    const [result] = await db.query('INSERT INTO usuarios (nombre, correo, rol) VALUES (?, ?, ?)', [nombre, correo, rol]);
    res.status(201).json({ id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar usuario' });
  }
};

const updateUsuario = async (req, res) => {
  const { id } = req.params;
  const { nombre, correo, rol } = req.body;
  try {
    await db.query('UPDATE usuarios SET nombre=?, correo=?, rol=? WHERE id=?', [nombre, correo, rol, id]);
    res.json({ message: 'Usuario actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar usuario' });
  }
};

const deleteUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM usuarios WHERE id=?', [id]);
    res.json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar usuario' });
  }
};

module.exports = { getUsuarios, addUsuario, updateUsuario, deleteUsuario };
