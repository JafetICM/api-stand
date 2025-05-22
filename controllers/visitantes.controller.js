//controllers/visitantes.controller.js
const db = require('../db');

const obtenerVisitantes = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM visitantes ORDER BY fecha_registro DESC');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener visitantes' });
  }
};

const crearVisitante = async (req, res) => {
  const { nombre_completo, correo, telefono, empresa, cargo, notas } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO visitantes (nombre_completo, correo, telefono, empresa, cargo, notas) VALUES (?, ?, ?, ?, ?, ?)',
      [nombre_completo, correo, telefono, empresa, cargo, notas]
    );
    res.status(201).json({ id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear visitante' });
  }
};

module.exports = {
  obtenerVisitantes,
  crearVisitante
};
