// controllers/usuarios.controller.js
const db = require('../db');

const getUsuarios = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM usuarios');
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

module.exports = { getUsuarios, addUsuario };